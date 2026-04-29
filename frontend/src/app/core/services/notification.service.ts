import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppNotification } from '../../shared/models/models';
import { AuthService } from './auth.service';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:8085/api/notifications';
  private stompClient: Client | null = null;
  private notificationSubject = new Subject<AppNotification>();
  private unreadCountSubject = new BehaviorSubject<number>(0);
  private toastSubject = new Subject<AppNotification>();

  unreadCount$ = this.unreadCountSubject.asObservable();
  notifications$ = this.notificationSubject.asObservable();
  toast$ = this.toastSubject.asObservable();

  private audioCtx: AudioContext | null = null;
  private audioReady = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Create & resume AudioContext ONLY inside a user-gesture handler.
    // Chrome blocks any AudioContext operation started without a prior gesture.
    const unlock = () => {
      if (this.audioReady) return;
      try {
        if (!this.audioCtx) this.audioCtx = new AudioContext();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume()
            .then(() => { this.audioReady = true; })
            .catch(() => {});
        } else {
          this.audioReady = true;
        }
      } catch {}
    };
    document.addEventListener('click',      unlock, { capture: true });
    document.addEventListener('keydown',    unlock, { capture: true });
    document.addEventListener('touchstart', unlock, { capture: true, passive: true });
  }

  connect(): void {
    const user = this.authService.currentUser;
    if (!user || this.stompClient?.active) return;

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      this.stompClient!.subscribe(
        `/topic/notifications/${user.id}`,
        (msg: IMessage) => {
          const notif: AppNotification = JSON.parse(msg.body);
          this.notificationSubject.next(notif);
          this.toastSubject.next(notif);
          this.unreadCountSubject.next(this.unreadCountSubject.value + 1);
          this.showBrowserNotification(notif);
          this.playNotificationSound(notif.type);
        }
      );
    };

    this.stompClient.activate();
    this.loadUnreadCount();
  }

  disconnect(): void {
    this.stompClient?.deactivate();
    this.stompClient = null;
  }

  getAll(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(this.apiUrl);
  }

  loadUnreadCount(): void {
    this.http.get<{ count: number }>(`${this.apiUrl}/unread-count`).subscribe({
      next: (r) => this.unreadCountSubject.next(r.count),
      error: () => {}
    });
  }

  markRead(id: number): Observable<void> {
    this.unreadCountSubject.next(Math.max(0, this.unreadCountSubject.value - 1));
    return this.http.put<void>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllRead(): Observable<void> {
    this.unreadCountSubject.next(0);
    return this.http.put<void>(`${this.apiUrl}/read-all`, {});
  }

  requestBrowserPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  private playNotificationSound(type: string): void {
    // Skip silently if the user hasn't interacted yet — never call resume() here
    if (!this.audioReady || !this.audioCtx || this.audioCtx.state !== 'running') return;
    try {
      const ctx = this.audioCtx;
      const play = (freq: number, startAt: number, duration = 0.18, vol = 0.25) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startAt);
        gain.gain.setValueAtTime(0, ctx.currentTime + startAt);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + startAt + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startAt + duration);
        osc.start(ctx.currentTime + startAt);
        osc.stop(ctx.currentTime + startAt + duration + 0.05);
      };
      switch (type) {
        case 'NEW_MESSAGE':       play(660, 0, 0.12, 0.2); break;
        case 'MENTION':           play(880, 0, 0.14); play(1100, 0.18, 0.18); break;
        case 'MEETING_STARTED':   play(660, 0, 0.12); play(880, 0.15, 0.12); play(1100, 0.30, 0.20); break;
        case 'MEETING_SCHEDULED': play(770, 0, 0.15); play(880, 0.18, 0.18); break;
        case 'MEETING_REMINDER':  play(1100, 0, 0.15); play(880, 0.18, 0.18); break;
        case 'PURCHASE_REQUEST':  play(750, 0, 0.15); play(750, 0.20, 0.10, 0.15); break;
        case 'PURCHASE_ACCEPTED': play(660, 0, 0.10); play(880, 0.13, 0.10); play(1100, 0.26, 0.22); break;
        case 'PURCHASE_REJECTED': play(880, 0, 0.15); play(660, 0.18, 0.15); play(440, 0.36, 0.25, 0.2); break;
        case 'SCHEDULED_SENT':    play(880, 0, 0.15); play(1100, 0.20, 0.20); break;
        case 'SCHEDULED_REMINDER':play(1100, 0, 0.20); break;
        case 'SCHEDULED_FAILED':  play(440, 0, 0.20, 0.3); play(440, 0.28, 0.20, 0.3); break;
        default:                  play(660, 0, 0.15);
      }
    } catch {}
  }

  private showBrowserNotification(notif: AppNotification): void {
    if ('Notification' in window && Notification.permission === 'granted' && document.hidden) {
      let title = '💬 Nouveau message';
      if (notif.type === 'MENTION') title = '🔔 Mention';
      else if (notif.type === 'MEETING_STARTED') title = '📹 Réunion démarrée';
      else if (notif.type === 'MEETING_SCHEDULED') title = '📅 Réunion planifiée';
      else if (notif.type === 'MEETING_REMINDER') title = '⏰ Rappel de réunion';
      const n = new Notification(title, {
        body: notif.content,
        icon: '/favicon.ico',
        tag: `notif-${notif.id}`
      });
      setTimeout(() => n.close(), 6000);
    }
  }
}

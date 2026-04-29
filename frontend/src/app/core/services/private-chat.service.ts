import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ConversationSummary, PrivateChatMessage } from '../../shared/models/models';
import { AuthService } from './auth.service';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

@Injectable({ providedIn: 'root' })
export class PrivateChatService implements OnDestroy {
  private apiUrl = 'http://localhost:8085/api/private-chat';
  private wsUrl  = 'http://localhost:8085/ws';

  private stompClient: Client | null = null;
  private roomSubjects = new Map<string, Subject<PrivateChatMessage>>();
  private notifSubject = new Subject<PrivateChatMessage>();
  private statusSubjects = new Map<number, Subject<{ userId: number; online: boolean }>>();
  private statusPingInterval: any = null;
  private currentUserId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ── REST ─────────────────────────────────────────────────────────────────

  getConversations(): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${this.apiUrl}/conversations`);
  }

  getMessages(roomKey: string): Observable<PrivateChatMessage[]> {
    return this.http.get<PrivateChatMessage[]>(`${this.apiUrl}/${encodeURIComponent(roomKey)}/messages`);
  }

  sendMessage(content: string, receiverId: number, projectId: number, roomKey: string): Observable<PrivateChatMessage> {
    return this.http.post<PrivateChatMessage>(`${this.apiUrl}/send`, {
      content, receiverId, projectId, roomKey
    });
  }

  markRead(roomKey: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${encodeURIComponent(roomKey)}/read`, {});
  }

  setOnline(online: boolean): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/status`, { online });
  }

  getUserStatus(userId: number): Observable<{ userId: number; online: boolean; lastSeen: string }> {
    return this.http.get<any>(`${this.apiUrl}/status/${userId}`);
  }

  buildRoomKey(clientId: number, freelancerId: number, projectId: number): string {
    return `c${clientId}_f${freelancerId}_p${projectId}`;
  }

  // ── WebSocket ────────────────────────────────────────────────────────────

  connect(userId: number): void {
    if (this.stompClient) return; // already connecting or connected
    this.currentUserId = userId;

    const token = this.authService.token;
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.wsUrl),
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      reconnectDelay: 5000,
      onConnect: () => {
        this.stompClient!.subscribe(`/topic/private-notif/${userId}`, (frame: IMessage) => {
          try {
            const msg: PrivateChatMessage = JSON.parse(frame.body);
            this.notifSubject.next(msg);
            const subj = this.roomSubjects.get(msg.roomKey);
            if (subj) subj.next(msg);
          } catch {}
        });
        this.setOnline(true).subscribe({ error: () => {} });
        this.startStatusPing();
      },
      onDisconnect: () => {
        this.setOnline(false).subscribe({ error: () => {} });
        this.stopStatusPing();
      }
    });
    this.stompClient.activate();
  }

  subscribeToRoom(roomKey: string): Observable<PrivateChatMessage> {
    if (!this.roomSubjects.has(roomKey)) {
      this.roomSubjects.set(roomKey, new Subject<PrivateChatMessage>());
    }
    return this.roomSubjects.get(roomKey)!.asObservable();
  }

  unsubscribeFromRoom(roomKey: string): void {
    this.roomSubjects.get(roomKey)?.complete();
    this.roomSubjects.delete(roomKey);
  }

  onNewMessage(): Observable<PrivateChatMessage> {
    return this.notifSubject.asObservable();
  }

  watchUserStatus(userId: number): Observable<{ userId: number; online: boolean }> {
    if (!this.statusSubjects.has(userId)) {
      const subj = new Subject<{ userId: number; online: boolean }>();
      this.statusSubjects.set(userId, subj);
      // subscribe to WebSocket status topic when connected
      if (this.stompClient?.connected) {
        this.stompClient.subscribe(`/topic/user-status/${userId}`, (frame: IMessage) => {
          try { subj.next(JSON.parse(frame.body)); } catch {}
        });
      }
    }
    return this.statusSubjects.get(userId)!.asObservable();
  }

  disconnect(): void {
    this.setOnline(false).subscribe({ error: () => {} });
    this.stopStatusPing();
    this.stompClient?.deactivate();
    this.stompClient = null;
    this.roomSubjects.forEach(s => s.complete());
    this.roomSubjects.clear();
    this.statusSubjects.forEach(s => s.complete());
    this.statusSubjects.clear();
  }

  private startStatusPing(): void {
    this.stopStatusPing();
    this.statusPingInterval = setInterval(() => {
      this.setOnline(true).subscribe({ error: () => {} });
    }, 30000);
  }

  private stopStatusPing(): void {
    if (this.statusPingInterval) {
      clearInterval(this.statusPingInterval);
      this.statusPingInterval = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}

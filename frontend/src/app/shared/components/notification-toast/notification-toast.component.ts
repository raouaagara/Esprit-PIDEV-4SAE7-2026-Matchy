import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppNotification } from '../../models/models';
import { NotificationService } from '../../../core/services/notification.service';

interface Toast {
  notif: AppNotification;
  id: number;
  removing: boolean;
}

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts"
           class="toast"
           [class.toast-mention]="toast.notif.type === 'MENTION'"
           [class.toast-meeting]="isMeetingType(toast.notif.type)"
           [class.toast-removing]="toast.removing"
           (click)="dismiss(toast)">
        <div class="toast-icon">{{ getIcon(toast.notif.type) }}</div>
        <div class="toast-body">
          <div class="toast-title">
            {{ getTitle(toast.notif.type) }}
            <span class="toast-project">— {{ toast.notif.projectTitle }}</span>
          </div>
          <div class="toast-content">{{ toast.notif.content }}</div>
        </div>
        <button class="toast-close" (click)="dismiss(toast); $event.stopPropagation()">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed; top: 20px; right: 20px;
      z-index: 9999; display: flex; flex-direction: column; gap: 10px;
      pointer-events: none;
    }
    .toast {
      display: flex; align-items: flex-start; gap: 12px;
      background: var(--surface, #1e1e2e); border: 1px solid var(--border, #333);
      border-radius: 12px; padding: 14px 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      min-width: 300px; max-width: 380px;
      animation: slideInRight 0.3s ease;
      pointer-events: all; cursor: pointer;
      transition: transform 0.2s, opacity 0.3s;
    }
    .toast:hover { transform: translateX(-4px); }
    .toast-removing { opacity: 0; transform: translateX(100%); }
    .toast-mention  { border-left: 3px solid #f59e0b; }
    .toast-meeting  { border-left: 3px solid #10b981; }
    .toast:not(.toast-mention):not(.toast-meeting) { border-left: 3px solid var(--primary, #6c63ff); }
    .toast-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .toast-body { flex: 1; min-width: 0; }
    .toast-title {
      font-weight: 700; font-size: 13px; color: var(--text, #e0e0e0);
      margin-bottom: 4px;
    }
    .toast-project { font-weight: 400; color: var(--text-muted, #888); font-size: 11px; }
    .toast-content {
      font-size: 13px; color: var(--text-muted, #888);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .toast-close {
      background: none; border: none; color: var(--text-muted, #888);
      cursor: pointer; font-size: 12px; padding: 0; flex-shrink: 0;
      opacity: 0.6; transition: opacity 0.2s;
    }
    .toast-close:hover { opacity: 1; }
    @keyframes slideInRight {
      from { transform: translateX(120%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub?: Subscription;
  private counter = 0;

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.sub = this.notifService.toast$.subscribe(notif => {
      this.addToast(notif);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private addToast(notif: AppNotification) {
    const toast: Toast = { notif, id: this.counter++, removing: false };
    this.toasts = [toast, ...this.toasts].slice(0, 4);
    setTimeout(() => this.dismiss(toast), 5000);
  }

  dismiss(toast: Toast) {
    toast.removing = true;
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== toast.id);
    }, 300);
  }

  isMeetingType(type: string) {
    return ['MEETING_STARTED', 'MEETING_SCHEDULED', 'MEETING_REMINDER'].includes(type);
  }

  getIcon(type: string): string {
    const map: Record<string, string> = {
      'MENTION': '🔔',
      'MEETING_STARTED': '📹',
      'MEETING_SCHEDULED': '📅',
      'MEETING_REMINDER': '⏰',
    };
    return map[type] ?? '💬';
  }

  getTitle(type: string): string {
    const map: Record<string, string> = {
      'MENTION': 'Vous avez été mentionné',
      'MEETING_STARTED': 'Réunion démarrée',
      'MEETING_SCHEDULED': 'Réunion planifiée',
      'MEETING_REMINDER': 'Rappel de réunion',
      'PURCHASE_REQUEST': 'Nouvelle demande d\'achat',
      'PURCHASE_ACCEPTED': 'Demande acceptée',
      'PURCHASE_REJECTED': 'Demande refusée',
    };
    return map[type] ?? 'Nouveau message';
  }
}

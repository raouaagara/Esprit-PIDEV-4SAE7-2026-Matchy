import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/models';

@Component({
  selector: 'app-notifications-page',
  template: `
    <div class="page">
      <div class="page-header">
        <div><h1 class="page-title">Notifications</h1><p class="page-sub">{{ unread }} unread messages</p></div>
        <button class="btn-outline" (click)="markAllRead()" *ngIf="unread > 0">Mark all as read</button>
      </div>

      <div class="loading-state" *ngIf="isLoading"><div class="spinner"></div><span>Loading...</span></div>

      <div class="notif-list" *ngIf="!isLoading">
        <div class="empty" *ngIf="notifications.length === 0">🎉 No notifications</div>
        <div class="notif-card" *ngFor="let n of notifications" [class.unread]="!n.read" (click)="markRead(n)">
          <div class="notif-left">
            <div class="notif-dot" [class.read]="n.read"></div>
            <div class="notif-icon">{{ getIcon(n.type) }}</div>
          </div>
          <div class="notif-body">
            <span class="notif-title">{{ n.title }}</span>
            <span class="notif-msg">{{ n.message }}</span>
            <span class="notif-time">{{ n.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          <div class="notif-actions">
            <button class="btn-delete" (click)="deleteNotif($event, n.id!)">🗑</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  isLoading = true;
  get unread() { return this.notifications.filter(n => !n.read).length; }

  constructor(public authService: AuthService, private notifService: NotificationService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    this.notifService.getForUser(userId).subscribe({
      next: n => { this.notifications = n.sort((a, b) => (b.createdAt || '') > (a.createdAt || '') ? 1 : -1); this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  markRead(n: Notification): void {
    if (!n.read && n.id) {
      this.notifService.markAsRead(n.id).subscribe(() => n.read = true);
    }
  }

  markAllRead(): void {
    const userId = this.authService.currentUser?.id;
    if (!userId) return;
    this.notifService.markAllAsRead(userId).subscribe(() => this.notifications.forEach(n => n.read = true));
  }

  deleteNotif(e: Event, id: number): void {
    e.stopPropagation();
    this.notifService.delete(id).subscribe(() => this.notifications = this.notifications.filter(n => n.id !== id));
  }

  getIcon(type: string): string {
    const icons: any = { PROPOSAL: '📝', PROJECT: '📁', MESSAGE: '💬', SYSTEM: '⚙️', PAYMENT: '💰', REVIEW: '⭐' };
    return icons[type] || '🔔';
  }
}

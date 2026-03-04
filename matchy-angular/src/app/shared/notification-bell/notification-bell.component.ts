import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../frontoffice/services/notification.service';
import { AuthService } from '../../frontoffice/services/auth.service';
import { Notification } from '../../frontoffice/models/models';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  isOpen = false;
  notifications: Notification[] = [];
  unreadCount = 0;
  loading = false;
  
  private pollingSubscription?: Subscription;
  private unreadCountSubscription?: Subscription;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadNotifications();
    this.startPolling();
    
    // Subscribe to unread count updates
    this.unreadCountSubscription = this.notificationService.unreadCount$.subscribe(
      count => this.unreadCount = count
    );
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
    if (this.unreadCountSubscription) {
      this.unreadCountSubscription.unsubscribe();
    }
  }

  loadNotifications() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) return;

    this.loading = true;
    this.notificationService.getUserNotifications(currentUser.id).subscribe({
      next: (notifications) => {
        this.notifications = notifications.slice(0, 10); // Show last 10
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.loading = false;
      }
    });

    // Load unread count
    this.notificationService.getUnreadCount(currentUser.id).subscribe();
  }

  startPolling() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) return;

    this.pollingSubscription = this.notificationService.startPolling(currentUser.id);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadNotifications();
    }
  }

  closeDropdown() {
    this.isOpen = false;
  }

  markAsRead(notificationId: number, event: Event) {
    event.stopPropagation();
    
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
      },
      error: (err) => console.error('Error marking as read:', err)
    });
  }

  markAllAsRead() {
    const currentUser = this.authService.currentUser;
    if (!currentUser || !currentUser.id) return;

    this.notificationService.markAllAsRead(currentUser.id).subscribe({
      next: () => {
        this.notifications.forEach(n => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err) => console.error('Error marking all as read:', err)
    });
  }

  handleNotificationClick(notification: Notification) {
    // Mark as read
    if (!notification.isRead) {
      this.markAsRead(notification.id, new Event('click'));
    }

    // Navigate based on notification type
    this.closeDropdown();
    this.navigateToReference(notification);
  }

  navigateToReference(notification: Notification) {
    if (!notification.referenceId) return;

    switch (notification.type) {
      case 'APPLICATION_RECEIVED':
      case 'APPLICATION_ACCEPTED':
      case 'APPLICATION_REJECTED':
        this.router.navigate(['/my-applications']);
        break;
      case 'INTERVIEW_SCHEDULED':
      case 'INTERVIEW_CONFIRMED':
        this.router.navigate(['/my-applications']);
        break;
      case 'SUBMISSION_RECEIVED':
      case 'SUBMISSION_REVIEWED':
        this.router.navigate(['/my-projects']);
        break;
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_PENDING':
        this.router.navigate(['/payments']);
        break;
      case 'MESSAGE_RECEIVED':
        this.router.navigate(['/messages']);
        break;
      default:
        break;
    }
  }

  getNotificationIcon(type: string): string {
    const iconMap: any = {
      'APPLICATION_RECEIVED': '📋',
      'APPLICATION_ACCEPTED': '✅',
      'APPLICATION_REJECTED': '❌',
      'INTERVIEW_SCHEDULED': '📅',
      'INTERVIEW_CONFIRMED': '✓',
      'SUBMISSION_RECEIVED': '📤',
      'SUBMISSION_REVIEWED': '⭐',
      'MILESTONE_ASSIGNED': '🎯',
      'PROJECT_UPDATE': '📁',
      'PAYMENT_RECEIVED': '💰',
      'PAYMENT_PENDING': '⏳',
      'CONTRACT_GENERATED': '📄',
      'REVISION_REQUESTED': '🔄',
      'MESSAGE_RECEIVED': '💬'
    };
    return iconMap[type] || '🔔';
  }

  getNotificationClass(type: string): string {
    if (type.includes('ACCEPTED') || type.includes('RECEIVED') || type.includes('CONFIRMED')) {
      return 'success';
    }
    if (type.includes('REJECTED') || type.includes('OVERDUE')) {
      return 'danger';
    }
    if (type.includes('PENDING') || type.includes('SCHEDULED')) {
      return 'warning';
    }
    return 'info';
  }
}

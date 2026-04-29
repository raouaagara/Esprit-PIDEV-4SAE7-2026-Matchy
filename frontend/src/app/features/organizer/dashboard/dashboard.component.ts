import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationToastComponent } from '../../../shared/components/notification-toast/notification-toast.component';
import { DashboardStats, Project, Purchase } from '../../../shared/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationToastComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats | null = null;
  recentProjects: Project[] = [];
  pendingPurchases: Purchase[] = [];
  loading = true;
  processingId: number | null = null;
  private notifSub?: Subscription;

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    private notifService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
    this.notifService.connect();
    this.notifService.requestBrowserPermission();

    this.notifSub = this.notifService.notifications$.subscribe(notif => {
      if (notif.type === 'PURCHASE_REQUEST') {
        this.loadPendingPurchases();
        this.refreshStats();
      }
    });
  }

  ngOnDestroy() {
    this.notifSub?.unsubscribe();
    this.notifService.disconnect();
  }

  loadData() {
    this.loading = true;
    this.refreshStats();
    this.projectService.getMy().subscribe({
      next: (projects) => { this.recentProjects = projects.slice(0, 5); this.loading = false; },
      error: () => { this.loading = false; }
    });
    this.loadPendingPurchases();
  }

  refreshStats() {
    this.projectService.getDashboard().subscribe({
      next: (stats) => { this.stats = stats; },
      error: () => {}
    });
  }

  loadPendingPurchases() {
    this.projectService.getPendingPurchases().subscribe({
      next: (purchases) => { this.pendingPurchases = purchases; },
      error: () => {}
    });
  }

  acceptPurchase(purchase: Purchase) {
    this.processingId = purchase.id;
    this.projectService.acceptPurchase(purchase.id).subscribe({
      next: () => {
        this.pendingPurchases = this.pendingPurchases.filter(p => p.id !== purchase.id);
        this.refreshStats();
        this.processingId = null;
      },
      error: () => { this.processingId = null; }
    });
  }

  rejectPurchase(purchase: Purchase) {
    this.processingId = purchase.id;
    this.projectService.rejectPurchase(purchase.id).subscribe({
      next: () => {
        this.pendingPurchases = this.pendingPurchases.filter(p => p.id !== purchase.id);
        this.refreshStats();
        this.processingId = null;
      },
      error: () => { this.processingId = null; }
    });
  }

  logout() { this.authService.logout(); this.router.navigate(['/auth/login']); }

  getInitials(name: string): string {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  }

  getBarWidth(count: number): string {
    if (!this.stats?.categoryStats?.length) return '0%';
    const max = Math.max(...this.stats.categoryStats.map(c => c.count));
    return max > 0 ? `${(count / max) * 100}%` : '0%';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
}

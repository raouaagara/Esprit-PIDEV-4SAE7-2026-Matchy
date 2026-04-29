import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ChatService } from '../../../core/services/chat.service';
import { PrivateChatService } from '../../../core/services/private-chat.service';
import { Project, Purchase } from '../../../shared/models/models';
import { ChatPanelComponent } from '../chat/chat-panel.component';
import { NotificationToastComponent } from '../../../shared/components/notification-toast/notification-toast.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatPanelComponent, NotificationToastComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  selectedCategory = 'all';
  searchQuery = '';
  activeChatProject: Project | null = null;
  totalUnread = 0;
  sortBy = 'recent';
  showUserMenu = false;
  showNotifications = false;

  // Purchase
  showBuyModal = false;
  buyingProject: Project | null = null;
  buyMessage = '';
  buying = false;
  buySuccess = false;
  buyError = '';

  private wsSub?: Subscription;
  private wsDelSub?: Subscription;
  private notifSub?: Subscription;

  categories = ['all', 'Web', 'Mobile', 'Design', 'Data', 'IA', 'Marketing', 'Autre'];

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    private wsService: WebSocketService,
    private notifService: NotificationService,
    private chatService: ChatService,
    private privateChatService: PrivateChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.wsService.connect();
    this.notifService.connect();
    this.notifService.requestBrowserPermission();

    this.wsSub = this.wsService.onNewProject().subscribe(project => {
      const idx = this.projects.findIndex(p => p.id === project.id);
      if (idx >= 0) this.projects[idx] = { ...this.projects[idx], ...project };
      else this.projects = [project, ...this.projects];
      this.applyFilter();
    });

    this.wsDelSub = this.wsService.onProjectDeleted().subscribe(id => {
      this.projects = this.projects.filter(p => p.id !== id);
      this.applyFilter();
    });

    this.notifSub = this.notifService.notifications$.subscribe(notif => {
      const project = this.projects.find(p => p.id === notif.projectId);
      if (project && this.activeChatProject?.id !== notif.projectId) {
        project.unreadCount = (project.unreadCount || 0) + 1;
        this.updateTotalUnread();
      }
    });

    this.notifService.unreadCount$.subscribe(c => this.totalUnread = c);

    // Connect private chat WS to maintain online status visibility for organizers
    const userId = this.authService.currentUser?.id;
    if (userId) {
      this.privateChatService.connect(userId);
    }
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.wsDelSub?.unsubscribe();
    this.notifSub?.unsubscribe();
    this.wsService.disconnect();
    this.notifService.disconnect();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.applyFilter();
        this.loading = false;
        this.loadUnreadCounts();
        this.loadMyPurchaseStatuses();
      },
      error: () => { this.loading = false; }
    });
  }

  loadUnreadCounts() {
    this.projects.forEach(project => {
      this.chatService.getUnreadCount(project.id).subscribe({
        next: (r) => { project.unreadCount = r.count; this.updateTotalUnread(); },
        error: () => {}
      });
    });
  }

  loadMyPurchaseStatuses() {
    this.projectService.getMyPurchases().subscribe({
      next: (purchases: Purchase[]) => {
        purchases.forEach((p: Purchase) => {
          const project = this.projects.find(proj => proj.id === p.projectId);
          if (project) project.purchaseStatus = p.status;
        });
      },
      error: () => {}
    });
  }

  updateTotalUnread() {
    this.totalUnread = this.projects.reduce((sum, p) => sum + (p.unreadCount || 0), 0);
  }

  applyFilter() {
    let result = [...this.projects];
    
    // Category filter
    if (this.selectedCategory !== 'all') {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    
    // Search filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.organizerName.toLowerCase().includes(q));
    }
    
    // Sort
    result = this.sortProjects(result);
    
    this.filteredProjects = result;
  }

  sortProjects(projects: Project[]): Project[] {
    switch (this.sortBy) {
      case 'price-asc':
        return [...projects].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...projects].sort((a, b) => b.price - a.price);
      case 'popular':
        return [...projects].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      case 'recent':
      default:
        return [...projects].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  filterCategory(cat: string) { 
    this.selectedCategory = cat; 
    this.applyFilter(); 
  }
  
  onSearch(e: Event) { 
    this.searchQuery = (e.target as HTMLInputElement).value; 
    this.applyFilter(); 
  }

  openChat(project: Project) {
    this.activeChatProject = project;
    project.unreadCount = 0;
    this.updateTotalUnread();
    this.chatService.markRead(project.id).subscribe();
  }

  closeChat() { 
    this.activeChatProject = null; 
  }

  // Toggle methods
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (this.showUserMenu) {
      this.showNotifications = false;
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showUserMenu = false;
    }
  }

  // ── Purchase ───────────────────────────────────────────
  openBuyModal(project: Project) {
    this.buyingProject = project;
    this.buyMessage = '';
    this.buyError = '';
    this.buySuccess = false;
    this.showBuyModal = true;
  }

  closeBuyModal() {
    this.showBuyModal = false;
    this.buyingProject = null;
    this.buying = false;
  }

  confirmBuy() {
    if (!this.buyingProject || this.buying) return;
    this.buying = true;
    this.buyError = '';

    this.projectService.buyProject(this.buyingProject.id, this.buyMessage).subscribe({
      next: (purchase: Purchase) => {
        this.buying = false;
        this.buySuccess = true;
        const project = this.projects.find(p => p.id === this.buyingProject!.id);
        if (project) project.purchaseStatus = 'PENDING';
        setTimeout(() => this.closeBuyModal(), 2500);
      },
      error: (err) => {
        this.buying = false;
        this.buyError = (typeof err.error === 'string' ? err.error : JSON.stringify(err.error))
            || err.message || 'Erreur lors de la demande d\'achat';
      }
    });
  }

  getPurchaseBtnLabel(project: Project): string {
    if (project.purchaseStatus === 'PENDING') return '⏳ En attente';
    if (project.purchaseStatus === 'ACCEPTED') return '✅ Acheté';
    if (project.purchaseStatus === 'REJECTED') return '❌ Refusé';
    return 'Acheter';
  }

  isPurchasable(project: Project): boolean {
    return !project.purchaseStatus && project.organizerId !== this.authService.currentUser?.id;
  }

  logout() { 
    this.authService.logout(); 
    this.router.navigate(['/auth/login']); 
  }

  getInitials(name: string): string {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  }

  // Nouvelles méthodes pour le design moderne
  getTotalFreelancers(): number {
    const uniqueOrganizers = new Set(this.projects.map(p => p.organizerId));
    return uniqueOrganizers.size;
  }

  getTotalTransactions(): number {
    return this.projects.reduce((sum, p) => sum + (p.soldCount || 0), 0);
  }

  getCategoryIcon(category: string): string {
    const icons: {[key: string]: string} = {
      'all': '✨',
      'Web': '🌐',
      'Mobile': '📱',
      'Design': '🎨',
      'Data': '📊',
      'IA': '🤖',
      'Marketing': '📈',
      'Autre': '💡'
    };
    return icons[category] || '📦';
  }

  getCategoryEmoji(category: string): string {
    return this.getCategoryIcon(category);
  }

  getCategoryCount(category: string): number {
    if (category === 'all') return this.projects.length;
    return this.projects.filter(p => p.category === category).length;
  }

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'recent';
    this.applyFilter();
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }

  openLastChat(): void {
    const projectWithUnread = this.projects.find(p => p.unreadCount && p.unreadCount > 0);
    if (projectWithUnread) {
      this.openChat(projectWithUnread);
    }
  }

  // Ajoutez cette méthode à la classe ProjectsComponent
getUserFirstName(): string {
  const name = this.authService.currentUser?.name;
  if (!name) return 'Client';
  return name.split(' ')[0] || 'Client';
}
}
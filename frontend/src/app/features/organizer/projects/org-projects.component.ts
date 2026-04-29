import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ChatService } from '../../../core/services/chat.service';
import { Project } from '../../../shared/models/models';
import { ChatPanelComponent } from '../../client/chat/chat-panel.component';
import { NotificationToastComponent } from '../../../shared/components/notification-toast/notification-toast.component';

@Component({
  selector: 'app-org-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ChatPanelComponent, NotificationToastComponent],
  templateUrl: './org-projects.component.html',
  styleUrls: ['./org-projects.component.css']
})
export class OrgProjectsComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  loading = true;
  showModal = false;
  editingProject: Project | null = null;
  saving = false;
  deleting: number | null = null;
  successMsg = '';
  errorMsg = '';
  activeChatProject: Project | null = null;
  totalUnread = 0;

  private notifSub?: Subscription;

  form = {
    title: '',
    description: '',
    price: 0,
    category: 'Web',
    imageUrl: ''
  };

  categories = ['Web', 'Mobile', 'Design', 'Data', 'IA', 'Marketing', 'Autre'];

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    private notifService: NotificationService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects();
    this.notifService.connect();
    this.notifService.requestBrowserPermission();
    this.notifService.unreadCount$.subscribe(c => this.totalUnread = c);
    this.notifSub = this.notifService.notifications$.subscribe(notif => {
      const project = this.projects.find(p => p.id === notif.projectId);
      if (project && this.activeChatProject?.id !== notif.projectId) {
        project.unreadCount = (project.unreadCount || 0) + 1;
      }
    });
  }

  ngOnDestroy() {
    this.notifSub?.unsubscribe();
    this.notifService.disconnect();
  }

  openChat(project: Project) {
    this.activeChatProject = project;
    project.unreadCount = 0;
    this.chatService.markRead(project.id).subscribe();
  }

  closeChat() { this.activeChatProject = null; }

  loadProjects() {
    this.loading = true;
    this.projectService.getMy().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() {
    this.editingProject = null;
    this.form = { title: '', description: '', price: 0, category: 'Web', imageUrl: '' };
    this.showModal = true;
  }

  openEdit(project: Project) {
    this.editingProject = project;
    this.form = {
      title: project.title,
      description: project.description,
      price: project.price,
      category: project.category,
      imageUrl: project.imageUrl || ''
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProject = null;
    this.errorMsg = '';
  }

  saveProject() {
    if (!this.form.title || !this.form.price) return;
    this.saving = true;
    this.errorMsg = '';

    const obs = this.editingProject
      ? this.projectService.update(this.editingProject.id, this.form)
      : this.projectService.create(this.form);

    obs.subscribe({
      next: (project) => {
        if (this.editingProject) {
          this.projects = this.projects.map(p => p.id === project.id ? project : p);
          this.successMsg = 'Projet mis à jour avec succès !';
        } else {
          this.projects = [project, ...this.projects];
          this.successMsg = 'Projet créé et publié avec succès !';
        }
        this.saving = false;
        this.closeModal();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Erreur lors de la sauvegarde';
        this.saving = false;
      }
    });
  }

  deleteProject(id: number) {
    if (!confirm('Supprimer ce projet ?')) return;
    this.deleting = id;
    this.projectService.delete(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== id);
        this.deleting = null;
        this.successMsg = 'Projet supprimé.';
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => { this.deleting = null; }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}

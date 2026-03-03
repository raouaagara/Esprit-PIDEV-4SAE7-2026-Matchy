import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-cl-profile',
  template: `
    <div class="page">
      <div class="page-header"><h1 class="page-title">My Profile</h1></div>
      <div class="profile-card" *ngIf="user">
        <div class="avatar-section">
          <div class="big-avatar">{{ getInitials(user.name) }}</div>
          <div><h2 class="user-name">{{ user.name }}</h2><span class="role-tag">{{ user.role }}</span></div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label>First Name</label><input class="form-input" [(ngModel)]="user.firstName"></div>
          <div class="form-group"><label>Last Name</label><input class="form-input" [(ngModel)]="user.lastName"></div>
          <div class="form-group"><label>Email</label><input class="form-input" [(ngModel)]="user.email" disabled></div>
          <div class="form-group"><label>Location</label><input class="form-input" [(ngModel)]="user.location"></div>
        </div>
        <div class="form-group full"><label>Bio</label><textarea class="form-input form-textarea" [(ngModel)]="user.bio"></textarea></div>
        <div class="form-actions">
          <button class="btn-primary" (click)="save()" [disabled]="isSaving">{{ isSaving ? 'Saving...' : 'Save Changes' }}</button>
          <span class="success" *ngIf="saved">✅ Saved!</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 20px; }
    .page-title { font-size: 22px; font-weight: 700; color: var(--bo-text-primary); }
    .profile-card { background: var(--bo-bg-secondary); border-radius: var(--radius-md); padding: 28px; box-shadow: var(--shadow-card); display: flex; flex-direction: column; gap: 20px; }
    .avatar-section { display: flex; align-items: center; gap: 16px; }
    .big-avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--info); color: white; font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .user-name { font-size: 20px; font-weight: 700; color: var(--bo-text-primary); }
    .role-tag { font-size: 12px; background: rgba(6,182,212,0.1); color: var(--info); padding: 3px 8px; border-radius: 20px; font-weight: 600; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; label { font-size: 13px; color: var(--bo-text-secondary); font-weight: 500; } }
    .full { display: flex; flex-direction: column; gap: 6px; label { font-size: 13px; color: var(--bo-text-secondary); font-weight: 500; } }
    .form-input { padding: 10px 14px; border: 1px solid var(--bo-border); border-radius: 8px; font-size: 14px; background: var(--bo-bg-primary); color: var(--bo-text-primary); outline: none; font-family: var(--font-body); width: 100%; &:focus { border-color: var(--primary); } &:disabled { opacity: 0.6; } }
    .form-textarea { min-height: 80px; resize: vertical; }
    .form-actions { display: flex; align-items: center; gap: 12px; }
    .btn-primary { padding: 10px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; &:disabled { opacity: 0.6; } }
    .success { color: #22c55e; font-size: 14px; }
  `]
})
export class ClProfileComponent implements OnInit {
  user: (User & { name: string }) | null = null;
  isSaving = false;
  saved = false;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void { this.user = this.authService.currentUser ? { ...this.authService.currentUser } : null; }

  save(): void {
    if (!this.user?.id) return;
    this.isSaving = true;
    this.user.name = `${this.user.firstName} ${this.user.lastName}`;
    this.userService.update(this.user.id, this.user).subscribe({
      next: () => { this.isSaving = false; this.saved = true; setTimeout(() => this.saved = false, 3000); },
      error: () => { this.isSaving = false; }
    });
  }

  getInitials(name: string): string { return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(); }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bo-header',
  template: `
    <header class="bo-header">
      <div class="header-left">
        <button class="toggle-view" [class.active]="showUsers" (click)="showUsers = true">
          👥 Users
        </button>
      </div>
      <div class="header-right">
        <button class="theme-toggle" (click)="toggleTheme()" [title]="isDark ? 'Switch to Light' : 'Switch to Dark'">
          <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
          <span class="theme-label">{{ isDark ? 'Light' : 'Dark' }}</span>
        </button>
        <button class="btn-back" (click)="goToFront()">← Front Office</button>
      </div>
    </header>
  `,
  styles: [`
    .bo-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 28px;
      background: var(--bo-bg-secondary);
      border-bottom: 1px solid var(--bo-border);
      gap: 16px;
    }
    .header-left { display: flex; gap: 8px; }
    .header-right { display: flex; align-items: center; gap: 10px; }

    .toggle-view {
      padding: 7px 16px;
      border-radius: 6px;
      font-size: 13px; font-weight: 500;
      cursor: pointer; border: 1px solid var(--bo-border);
      background: transparent; color: var(--bo-text-secondary);
      transition: all 0.2s; font-family: var(--font-body);
      &.active {
        background: var(--primary); color: white; border-color: var(--primary);
      }
      &:not(.active):hover { border-color: var(--primary); color: var(--primary); }
    }

    .theme-toggle {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 14px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 600;
      font-family: var(--font-body);
      cursor: pointer;
      border: 1px solid rgba(124, 106, 247, 0.3);
      background: rgba(124, 106, 247, 0.08);
      color: #9d8ff9;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(124, 106, 247, 0.16);
        border-color: rgba(124, 106, 247, 0.5);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(124, 106, 247, 0.2);
      }
      &:active { transform: translateY(0); }

      .theme-icon { font-size: 14px; line-height: 1; }
      .theme-label { letter-spacing: 0.02em; }
    }

    .btn-back {
      padding: 7px 14px; font-size: 13px; font-weight: 500;
      border: 1px solid var(--bo-border); border-radius: 6px;
      background: transparent; color: var(--bo-text-secondary);
      cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
      &:hover { border-color: var(--primary); color: var(--primary); }
    }
  `]
})
export class BoHeaderComponent {
  showUsers = true;
  isDark = true;

  constructor(private router: Router) {
    // Init depuis localStorage si déjà choisi
    const saved = localStorage.getItem('bo-theme');
    if (saved) {
      this.isDark = saved === 'dark';
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('bo-theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  goToFront(): void { this.router.navigate(['/']); }

private applyTheme(): void {
    // Applique la classe sur <html> ET <body> pour couvrir tous les cas
    const html = document.documentElement;
    const body = document.body;

    if (this.isDark) {
      html.classList.remove('bo-light');
      html.classList.add('bo-dark');
      body.classList.remove('bo-light');
      body.classList.add('bo-dark');
    } else {
      html.classList.remove('bo-dark');
      html.classList.add('bo-light');
      body.classList.remove('bo-dark');
      body.classList.add('bo-light');
    }
  }
}
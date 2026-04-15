import { Component } from '@angular/core';

@Component({
  selector: 'app-bo-header',
  template: `
    <header class="bo-header">
      <div class="header-right">
        <button class="theme-toggle" (click)="toggleTheme()">
          <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
          <span class="theme-label">{{ isDark ? 'Light' : 'Dark' }}</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .bo-header {
      display: flex; align-items: center; justify-content: flex-end;
      padding: 12px 28px;
      background: var(--bo-bg-secondary);
      border-bottom: 1px solid var(--bo-border);
    }
    .theme-toggle {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 7px 14px; border-radius: 100px; font-size: 12.5px; font-weight: 600;
      font-family: var(--font-body); cursor: pointer;
      border: 1px solid rgba(124,106,247,0.3);
      background: rgba(124,106,247,0.08); color: #9d8ff9;
      transition: all 0.2s ease;
      &:hover { background: rgba(124,106,247,0.16); border-color: rgba(124,106,247,0.5); }
      .theme-icon { font-size: 14px; }
    }
  `]
})
export class BoHeaderComponent {
  isDark = true;

  constructor() {
    const saved = localStorage.getItem('bo-theme');
    this.isDark = saved !== 'light';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('bo-theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const html = document.documentElement;
    const body = document.body;

    if (this.isDark) {
      html.classList.remove('bo-light');
      html.classList.add('bo-dark');
      body.classList.remove('bo-light');
      body.classList.add('bo-dark');
      // Sync avec le système de tokens du dashboard
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('bo-dark');
      html.classList.add('bo-light');
      body.classList.remove('bo-dark');
      body.classList.add('bo-light');
      html.setAttribute('data-theme', 'light');
    }
  }
}

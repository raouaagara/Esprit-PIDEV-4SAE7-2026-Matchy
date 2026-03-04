import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../frontoffice/services/dark-mode.service';

@Component({
  selector: 'app-bo-header',
  template: `
    <header class="bo-header">
      <div class="header-left">
        <button class="toggle-view" [class.active]="showUsers" (click)="showUsers = true">
          👥 Users
        </button>
        <button class="toggle-view" [class.active]="!showUsers" (click)="showUsers = false">
          📁 Projects
        </button>
      </div>
      <div class="header-right">
        <app-notification-bell></app-notification-bell>
        <button class="dark-mode-toggle" 
                (click)="toggleDarkMode()" 
                [class.active]="isDarkMode"
                title="Toggle dark mode">
          <span class="toggle-icon sun-icon" [class.visible]="isDarkMode">☀️</span>
          <span class="toggle-icon moon-icon" [class.visible]="!isDarkMode">🌙</span>
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
    .header-right { display: flex; gap: 12px; align-items: center; }
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
    .btn-back {
      padding: 7px 14px; font-size: 13px; font-weight: 500;
      border: 1px solid var(--bo-border); border-radius: 6px;
      background: transparent; color: var(--bo-text-secondary);
      cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
      &:hover { border-color: var(--primary); color: var(--primary); }
    }
    
    /* Dark Mode Toggle */
    .dark-mode-toggle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--bo-bg-primary);
      border: 1px solid var(--bo-border);
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        border-color: #667eea;
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    .toggle-icon {
      position: absolute;
      font-size: 1.25rem;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
      transform: scale(0) rotate(-180deg);
      
      &.visible {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }
  `]
})
export class BoHeaderComponent implements OnInit {
  showUsers = true;
  isDarkMode = false;
  
  constructor(
    private router: Router,
    public darkModeService: DarkModeService
  ) {}
  
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  
  goToFront(): void { 
    this.router.navigate(['/']); 
  }
}

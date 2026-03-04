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
        <button class="toggle-view" [class.active]="!showUsers" (click)="showUsers = false">
          📁 Projects
        </button>
      </div>
      <div class="header-right">
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
  `]
})
export class BoHeaderComponent {
  showUsers = true;
  constructor(private router: Router) {}
  goToFront(): void { this.router.navigate(['/']); }
}

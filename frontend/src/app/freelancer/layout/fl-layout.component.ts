import { Component } from '@angular/core';

@Component({
  selector: 'app-fl-layout',
  template: `
    <div class="fl-layout">
      <app-fl-navbar></app-fl-navbar>
      <main class="fl-content">
        <router-outlet></router-outlet>
      </main>
      <app-chatbot></app-chatbot>
    </div>
  `,
  styles: [`
    .fl-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--bo-bg-primary);
      font-family: var(--font-body);
    }
    .fl-content {
      flex: 1;
      padding: 28px 32px;
      overflow-y: auto;
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    }
    @media (max-width: 768px) {
      .fl-content { padding: 16px; }
    }
  `]
})
export class FlLayoutComponent {}
import { Component } from '@angular/core';

@Component({
  selector: 'app-cl-layout',
  template: `
    <div class="cl-layout">
      <app-cl-sidebar></app-cl-sidebar>
      <main class="cl-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .cl-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--bo-bg-primary);
      font-family: var(--font-body);
    }
    .cl-content {
      flex: 1;
      padding: 28px 32px;
      overflow-y: auto;
    }
  `]
})
export class ClLayoutComponent {}
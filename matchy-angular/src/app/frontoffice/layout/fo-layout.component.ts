import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-fo-layout',
  template: `
    <div class="fo-layout">
      <!-- Show navbar for non-authenticated users -->
      <app-fo-navbar *ngIf="!authService.isAuthenticated()"></app-fo-navbar>
      
      <!-- Show sidebar only for authenticated FREELANCERS -->
      <app-fo-sidebar *ngIf="isFreelancer()"></app-fo-sidebar>
      
      <main class="fo-main" [class.with-sidebar]="isFreelancer()">
        <router-outlet></router-outlet>
      </main>
      
      <app-fo-footer *ngIf="!authService.isAuthenticated()"></app-fo-footer>
    </div>
  `,
  styles: [`
    .fo-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--fo-bg-primary);
    }
    .fo-main {
      flex: 1;
      transition: margin-left 0.3s ease;
    }
    .fo-main.with-sidebar {
      margin-left: 280px;
    }
    @media (max-width: 768px) {
      .fo-main.with-sidebar {
        margin-left: 0;
      }
    }
  `]
})
export class FoLayoutComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect freelancers from home to dashboard
    if (this.isFreelancer() && this.router.url === '/') {
      this.router.navigate(['/dashboard']);
    }
  }

  isFreelancer(): boolean {
    return this.authService.isAuthenticated() && 
           this.authService.currentUser?.userType === 'FREELANCER';
  }
}

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-fo-navbar',
  templateUrl: './fo-navbar.component.html',
  styleUrls: ['./fo-navbar.component.scss']
})
export class FoNavbarComponent {
  isScrolled = false;
  isMenuOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 30;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToDashboard(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/backoffice/dashboard']);
    } else if (this.authService.isClient()) {
      this.router.navigate(['/client/dashboard']);
    } else if (this.authService.isFreelancer()) {
      this.router.navigate(['/freelancer/dashboard']);
    } else {
      this.router.navigate(['/backoffice/login']);
    }
  }
}

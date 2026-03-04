import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-fo-sidebar',
  templateUrl: './fo-sidebar.component.html',
  styleUrls: ['./fo-sidebar.component.scss']
})
export class FoSidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser: any;
  isDarkMode$ = this.darkModeService.darkMode$;

  menuItems = [
    { 
      icon: '🏠', 
      label: 'Dashboard', 
      route: '/dashboard',
      description: 'Overview & Stats'
    },
    { 
      icon: '🔍', 
      label: 'Browse Projects', 
      route: '/projects',
      description: 'Find new opportunities'
    },
    { 
      icon: '📋', 
      label: 'My Applications', 
      route: '/my-applications',
      description: 'Track your applications'
    },
    { 
      icon: '💼', 
      label: 'Active Projects', 
      route: '/my-projects',
      description: 'Projects you\'re working on'
    },
    { 
      icon: '💬', 
      label: 'Messages', 
      route: '/messages',
      description: 'Chat with companies'
    },
    { 
      icon: '📄', 
      label: 'My Contracts', 
      route: '/contracts',
      description: 'View and sign contracts'
    },
    { 
      icon: '📤', 
      label: 'Submit Work', 
      route: '/submit-work',
      description: 'Upload deliverables'
    },
    { 
      icon: '⚙️', 
      label: 'Settings', 
      route: '/profile-settings',
      description: 'Profile & preferences'
    }
  ];

  constructor(
    public authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      // Reload to ensure clean state
      window.location.reload();
    });
  }
}

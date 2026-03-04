import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "./frontoffice/services/auth.service";
import { DarkModeService } from "./frontoffice/services/dark-mode.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
  styles: [":host { display: block; height: 100%; }"],
})
export class AppComponent implements OnInit {
  title = "matchy-angular";

  constructor(
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.authService.checkAuth();
    this.applyBackgroundStyles();
    
    // Subscribe to dark mode changes
    this.darkModeService.darkMode$.subscribe(() => {
      this.applyBackgroundStyles();
    });
  }
  
  private applyBackgroundStyles(): void {
    const isDark = this.darkModeService.isDarkMode();
    
    // Apply background color
    this.renderer.setStyle(
      document.body,
      'background',
      isDark ? '#1a1d2e' : '#f8f9fc'
    );
    
    // Create gradient overlay if it doesn't exist
    if (!document.getElementById('gradient-overlay')) {
      const overlay = this.renderer.createElement('div');
      this.renderer.setAttribute(overlay, 'id', 'gradient-overlay');
      this.renderer.setStyle(overlay, 'position', 'fixed');
      this.renderer.setStyle(overlay, 'top', '0');
      this.renderer.setStyle(overlay, 'left', '0');
      this.renderer.setStyle(overlay, 'right', '0');
      this.renderer.setStyle(overlay, 'bottom', '0');
      this.renderer.setStyle(overlay, 'z-index', '0');
      this.renderer.setStyle(overlay, 'pointer-events', 'none');
      
      if (isDark) {
        this.renderer.setStyle(
          overlay,
          'background',
          'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
        );
      } else {
        this.renderer.setStyle(
          overlay,
          'background',
          'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
        );
      }
      
      this.renderer.appendChild(document.body, overlay);
    } else {
      // Update existing overlay
      const overlay = document.getElementById('gradient-overlay');
      if (overlay) {
        if (isDark) {
          this.renderer.setStyle(
            overlay,
            'background',
            'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
          );
        } else {
          this.renderer.setStyle(
            overlay,
            'background',
            'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
          );
        }
      }
    }
    
    // Ensure content is above overlay
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'position', 'relative');
      this.renderer.setStyle(appRoot, 'z-index', '1');
    }
  }
}

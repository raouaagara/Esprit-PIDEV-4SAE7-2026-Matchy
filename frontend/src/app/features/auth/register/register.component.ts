import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  name = '';
  email = '';
  password = '';
  role = 'CLIENT';
  loading = false;
  error = '';
  showPassword = false;
  agreeTerms = false;
  private subscription?: Subscription;

  passwordStrength = {
    percentage: 0,
    level: 'weak' as 'weak' | 'medium' | 'strong',
    message: ''
  };

  // TODO: restore when Google Client ID is configured
  // private readonly GOOGLE_CLIENT_ID = 'REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
  // private googleScriptLoaded = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addParticleEffect();
    // TODO: Add real Google Client ID from Google Cloud Console before re-enabling
    // this.loadGoogleScript().catch(() => {});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // Vérification de la force du mot de passe
  onPasswordChange(): void {
    const password = this.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    if (password.length === 0) {
      this.passwordStrength.percentage = 0;
      this.passwordStrength.message = '';
    } else if (strength <= 1) {
      this.passwordStrength.percentage = 33;
      this.passwordStrength.level = 'weak';
      this.passwordStrength.message = 'Mot de passe faible';
    } else if (strength === 2) {
      this.passwordStrength.percentage = 66;
      this.passwordStrength.level = 'medium';
      this.passwordStrength.message = 'Mot de passe moyen';
    } else {
      this.passwordStrength.percentage = 100;
      this.passwordStrength.level = 'strong';
      this.passwordStrength.message = 'Mot de passe fort ✓';
    }
  }

  onSubmit(): void {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    if (!this.agreeTerms) {
      this.error = 'Veuillez accepter les conditions d\'utilisation';
      return;
    }

    this.loading = true;
    this.error = '';

    this.subscription = this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.successAnimation();
        
        setTimeout(() => {
          if (res.role === 'ORGANIZER') {
            this.router.navigate(['/organizer/dashboard']);
          } else {
            this.router.navigate(['/client/projects']);
          }
        }, 500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de l\'inscription';
        this.loading = false;
        this.errorAnimation();
      }
    });
  }

  socialRegister(_provider: string): void {
    // TODO: Google OAuth disabled — add real Google Client ID first
    this.error = 'Connexion Google temporairement indisponible. Utilisez le formulaire ci-dessus.';
  }

  /* TODO: re-enable when Google Client ID is configured
  private async registerWithGoogle(): Promise<void> {
    if (this.googleLoading || this.loading) return;
    this.googleLoading = true;
    this.error = '';

    try {
      await this.loadGoogleScript();
      const google = (window as any).google;
      if (!google?.accounts?.id) throw new Error('GIS not available');

      google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (res: { credential: string }) => {
          this.ngZone.run(() => this.handleGoogleCredential(res.credential));
        },
        cancel_on_tap_outside: false,
        context: 'signup'
      });

      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          this.ngZone.run(() => {
            this.googleLoading = false;
            const reason = notification.getNotDisplayedReason?.() ?? notification.getSkippedReason?.() ?? '';
            this.error = (reason === 'suppressed_by_user' || reason === 'opt_out_or_no_session')
              ? 'Connexion Google annulée. Réessayez ou utilisez le formulaire.'
              : 'La fenêtre Google ne peut pas s\'ouvrir. Vérifiez que les pop-ups ne sont pas bloqués.';
          });
        }
      });
    } catch {
      this.ngZone.run(() => {
        this.googleLoading = false;
        this.error = 'Impossible de charger Google Sign-In. Vérifiez votre connexion.';
      });
    }
  }

  private handleGoogleCredential(credential: string): void {
    this.loading = true;
    this.googleLoading = false;
    this.authService.googleSignIn(credential, this.role).subscribe({
      next: (res) => {
        this.loading = false;
        this.successAnimation();
        setTimeout(() => {
          this.router.navigate([res.role === 'ORGANIZER' ? '/organizer/dashboard' : '/client/projects']);
        }, 500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors de la connexion avec Google.';
        this.errorAnimation();
      }
    });
  }

  private loadGoogleScript(): Promise<void> {
    if (this.googleScriptLoaded || (window as any).google?.accounts) {
      this.googleScriptLoaded = true;
      return Promise.resolve();
    }
    if (document.querySelector('script[src*="accounts.google.com/gsi"]')) {
      return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
          if ((window as any).google?.accounts) {
            clearInterval(timer); this.googleScriptLoaded = true; resolve();
          }
        }, 100);
        setTimeout(() => { clearInterval(timer); reject(new Error('Timeout')); }, 10_000);
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true; script.defer = true;
      script.onload = () => { this.googleScriptLoaded = true; resolve(); };
      script.onerror = () => reject(new Error('Failed to load Google Sign-In'));
      document.head.appendChild(script);
    });
  }
  */

  private addParticleEffect(): void {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(99, 102, 241, ${Math.random() * 0.3})`;
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
      particle.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(particle);
    }
  }

  private successAnimation(): void {
    const card = document.querySelector('.auth-card');
    if (card) {
      card.classList.add('success-pulse');
      setTimeout(() => card.classList.remove('success-pulse'), 500);
    }
  }

  private errorAnimation(): void {
    const form = document.querySelector('.auth-form');
    if (form) {
      form.classList.add('error-shake');
      setTimeout(() => form.classList.remove('error-shake'), 500);
    }
  }
}
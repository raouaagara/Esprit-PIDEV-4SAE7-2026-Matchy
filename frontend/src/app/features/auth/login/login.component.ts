import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) return;
    this.loading = true;
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.role === 'ORGANIZER') {
          this.router.navigate(['/organizer/dashboard']);
        } else {
          this.router.navigate(['/client/projects']);
        }
      },
      error: (err) => {
        this.error = err.error || 'Identifiants invalides';
        this.loading = false;
      }
    });
  }
}

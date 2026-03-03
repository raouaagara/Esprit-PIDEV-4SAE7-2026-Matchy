import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, of, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'matchy_token';
  private readonly USER_KEY  = 'matchy_user';

  // ✅ Direct backend URL for OAuth (bypasses Gateway)
  private readonly backendUrl = 'http://localhost:8081/api';

  currentUser: (User & { name: string }) | null = null;
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  checkAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user  = localStorage.getItem(this.USER_KEY);
    if (token && user) {
      this.currentUser = JSON.parse(user);
      this.isAuthenticated = true;
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password }).pipe(
      map(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        const user = { ...res.user, name: `${res.user.firstName} ${res.user.lastName}` };
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUser = user;
        this.isAuthenticated = true;
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin():      boolean { return this.currentUser?.role === 'ADMIN'; }
  isClient():     boolean { return this.currentUser?.role === 'CLIENT'; }
  isFreelancer(): boolean { return this.currentUser?.role === 'FREELANCER'; }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
  }

  // ✅ Calls port 8081 directly — bypasses Gateway
  loginWithGoogle(): void {
    this.http.get<{ url: string }>(`${this.backendUrl}/auth/google`).subscribe({
      next:  (res) => window.location.href = res.url,
      error: ()    => console.error('Google OAuth failed')
    });
  }

  handleGoogleCallback(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      id:        payload.sub,
      email:     payload.email,
      role:      payload.role,
      firstName: payload.firstName,
      lastName:  payload.lastName,
      name:      `${payload.firstName} ${payload.lastName}`
    };
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY,  JSON.stringify(user));
    this.currentUser    = user as any;
    this.isAuthenticated = true;
  }
}
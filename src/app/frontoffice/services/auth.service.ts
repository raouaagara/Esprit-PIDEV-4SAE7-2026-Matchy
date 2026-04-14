import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthState, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  authState$ = this.authState.asObservable();

  get currentUser(): User | null {
    return this.authState.value.user;
  }

  get isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  get isAdmin(): boolean {
    return this.authState.value.user?.role === 'admin';
  }

  login(email: string, password: string): Observable<boolean> {
    // Mock login — replace with real API call
    const mockAdmin: User = {
      id: 1,
      name: 'Admin Matchy',
      email: 'admin@matchy.tn',
      role: 'admin',
      status: 'active',
      verified: true,
      createdAt: new Date()
    };
    this.authState.next({
      isAuthenticated: true,
      user: mockAdmin,
      token: 'mock-jwt-token'
    });
    localStorage.setItem('matchy_token', 'mock-jwt-token');
    return of(true);
  }

  logout(): void {
    this.authState.next({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('matchy_token');
  }

  checkAuth(): void {
    const token = localStorage.getItem('matchy_token');
    if (token) {
      // TODO: validate token with API
      this.authState.next({
        isAuthenticated: true,
        user: {
          id: 1,
          name: 'Admin Matchy',
          email: 'admin@matchy.tn',
          role: 'admin',
          status: 'active',
          verified: true,
          createdAt: new Date()
        },
        token
      });
    }
  }
}

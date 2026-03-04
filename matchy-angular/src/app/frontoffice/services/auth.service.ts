import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthResponse, LoginRequest, RegisterRequest } from "../models/models";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Legacy property for compatibility
  public currentUser: any = null;

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("currentUser");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.currentUser = user;
      } catch (e) {
        this.logout();
      }
    }
  }

  checkAuth(): void {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.currentUser = response;
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.currentUser = response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}

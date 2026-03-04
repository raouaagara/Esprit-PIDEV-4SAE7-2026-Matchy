import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap, map } from "rxjs";
import { User } from "../models/models";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/User`;
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private normalizeUserRole(user: User): User {
    // Normalize role to lowercase for consistency
    if (user.role) {
      user.role = user.role.toLowerCase();
    }
    // Normalize status to lowercase for consistency
    if (user.status) {
      user.status = user.status.toLowerCase();
    }
    return user;
  }

  private loadUsers(): void {
    this.http.get<User[]>(`${this.apiUrl}/getAllUsers`).subscribe({
      next: (users) => {
        const normalized = users.map((u) => this.normalizeUserRole(u));
        this.usersSubject.next(normalized);
      },
      error: (error) => {
        console.error("Error loading users:", error);
        this.usersSubject.next([]);
      },
    });
  }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/getAllUsers`;
    console.log("Fetching users from:", url);
    return this.http.get<User[]>(url).pipe(
      tap((users) => {
        console.log("Users fetched successfully:", users);
        const normalized = users.map((u) => this.normalizeUserRole(u));
        this.usersSubject.next(normalized);
      }),
      map((users) => users.map((u) => this.normalizeUserRole(u))),
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${id}`)
      .pipe(map((u) => this.normalizeUserRole(u)));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user).pipe(
      map((u) => this.normalizeUserRole(u)),
      tap(() => this.loadUsers()),
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/modifierUser`, user).pipe(
      map((u) => this.normalizeUserRole(u)),
      tap(() => this.loadUsers()),
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteUser/${id}`)
      .pipe(tap(() => this.loadUsers()));
  }
}

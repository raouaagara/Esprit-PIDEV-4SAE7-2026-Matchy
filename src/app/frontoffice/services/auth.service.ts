import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _isAuthenticated = false;
  currentUser: any = null; // will hold user info after login

  checkAuth(): void {
    // placeholder logic, will be replaced by real implementation later
    this._isAuthenticated = !!localStorage.getItem("token");
  }

  /**
   * Call with either login(email,password) or login({username,password})
   */
  login(
    emailOrCredentials: string | { username: string; password: string },
    password?: string,
  ): Observable<boolean> {
    // normalize arguments
    let email: string;
    let pwd: string;
    if (typeof emailOrCredentials === "string") {
      email = emailOrCredentials;
      pwd = password || "";
    } else {
      email = emailOrCredentials.username;
      pwd = emailOrCredentials.password;
    }
    // fake login logic, set token and currentUser
    this._isAuthenticated = true;
    this.currentUser = { id: "1", name: email.split("@")[0], role: "admin" };
    localStorage.setItem("token", "dummy");
    return of(true);
  }

  logout(): void {
    this._isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}

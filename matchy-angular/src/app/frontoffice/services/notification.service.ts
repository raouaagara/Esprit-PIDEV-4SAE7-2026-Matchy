import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, interval } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Notification } from "../models/models";

@Injectable({ providedIn: "root" })
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`);
  }

  getUnreadNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}/unread`);
  }

  getUnreadCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/unread-count`).pipe(
      tap(count => this.unreadCountSubject.next(count))
    );
  }

  markAsRead(notificationId: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  markAllAsRead(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${userId}/read-all`, {});
  }

  // Poll for new notifications every 30 seconds
  startPolling(userId: number) {
    return interval(30000).pipe(
      switchMap(() => this.getUnreadCount(userId))
    ).subscribe();
  }
}

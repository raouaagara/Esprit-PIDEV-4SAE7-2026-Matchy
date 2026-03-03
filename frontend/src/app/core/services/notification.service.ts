import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification } from '../models/models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getForUser(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.api}/user/${userId}`);
  }

  getUnread(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.api}/user/${userId}/unread`);
  }

  countUnread(userId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.api}/user/${userId}/count`);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.patch(`${this.api}/${id}/read`, {});
  }

  markAllAsRead(userId: number): Observable<any> {
    return this.http.patch(`${this.api}/user/${userId}/read-all`, {});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

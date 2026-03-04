import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Message, CreateMessageRequest, ChatThread } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Send message
  sendMessage(data: CreateMessageRequest): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/send`, data);
  }

  // Get messages for a project
  getProjectMessages(projectId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Get chat thread
  getChatThread(projectId: number, userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/thread/${projectId}/${userId}`);
  }

  // Get all chat threads for user
  getUserChatThreads(userId: number): Observable<ChatThread[]> {
    return this.http.get<ChatThread[]>(`${this.apiUrl}/user/${userId}/threads`);
  }

  // Mark message as read
  markAsRead(messageId: number): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/${messageId}/read`, {});
  }

  // Mark all messages in thread as read
  markThreadAsRead(projectId: number, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/thread/${projectId}/${userId}/read-all`, {});
  }

  // Get unread count
  getUnreadCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/unread-count`).pipe(
      tap(count => this.unreadCountSubject.next(count))
    );
  }

  // Upload file attachment
  uploadAttachment(file: File): Observable<{ url: string; name: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string; name: string }>(`${this.apiUrl}/upload`, formData);
  }

  // Poll for new messages every 10 seconds
  startPolling(projectId: number) {
    return interval(10000).pipe(
      switchMap(() => this.getProjectMessages(projectId))
    );
  }
}

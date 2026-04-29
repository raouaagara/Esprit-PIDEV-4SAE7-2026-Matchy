import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChatMessage, ConversationSummary, FileUploadResponse, MessageReaction, ProjectParticipant, ScheduledMessage } from '../../shared/models/models';
import { AuthService } from './auth.service';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = 'http://localhost:8085/api/chat';
  private stompClient: Client | null = null;
  private messageSubjects: Map<number, Subject<ChatMessage>> = new Map();
  private userNotifSubject = new Subject<any>();
  private userNotifUserId: number | null = null;
  private typingSubjects: Map<number, Subject<any>> = new Map();
  private presenceSubjects: Map<number, Subject<any>> = new Map();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getConversations(): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${this.apiUrl}/conversations`);
  }

  getMessages(projectId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/${projectId}`);
  }

  getMessagesForClient(projectId: number, clientId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/${projectId}?clientId=${clientId}`);
  }

  sendMessageToClient(projectId: number, content: string, clientId: number): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
      projectId, content, messageType: 'TEXT', clientId
    });
  }

  sendFileMessageToClient(projectId: number, fileUrl: string, fileName: string, fileType: string, isImage: boolean, clientId: number): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
      projectId, content: '', messageType: isImage ? 'IMAGE' : 'FILE', fileUrl, fileName, fileType, clientId
    });
  }

  sendMessage(
    projectId: number,
    content: string,
    originalContent?: string,
    detectedLanguage?: string
  ): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
      projectId,
      content,
      messageType: 'TEXT',
      originalContent: originalContent ?? null,
      detectedLanguage: detectedLanguage ?? null,
    });
  }

  sendFileMessage(projectId: number, fileUrl: string, fileName: string, fileType: string, isImage: boolean): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
      projectId,
      content: '',
      messageType: isImage ? 'IMAGE' : 'FILE',
      fileUrl,
      fileName,
      fileType
    });
  }

  sendVoiceMessage(projectId: number, fileUrl: string, fileName: string, fileType: string, clientId?: number): Observable<ChatMessage> {
  return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
    projectId, content: '', messageType: 'VOICE', fileUrl, fileName, fileType, clientId
  });
}

sendVideoMessage(projectId: number, fileUrl: string, fileName: string, fileType: string, clientId?: number): Observable<ChatMessage> {
  return this.http.post<ChatMessage>(`${this.apiUrl}/send`, {
    projectId, content: '', messageType: 'VIDEO', fileUrl, fileName, fileType, clientId
  });
}

  createScheduledMessage(
    projectId: number, content: string, scheduledAt: string,
    recurrenceType: string, recurrenceDays: string[]
  ): Observable<ScheduledMessage> {
    return this.http.post<ScheduledMessage>(`${this.apiUrl}/${projectId}/scheduled`, {
      content, scheduledAt, recurrenceType, recurrenceDays
    });
  }

  getScheduledMessages(projectId: number): Observable<ScheduledMessage[]> {
    return this.http.get<ScheduledMessage[]>(`${this.apiUrl}/${projectId}/scheduled`);
  }

  editScheduledMessage(
    projectId: number, id: number, content: string, scheduledAt: string,
    recurrenceType: string, recurrenceDays: string[]
  ): Observable<ScheduledMessage> {
    return this.http.put<ScheduledMessage>(`${this.apiUrl}/${projectId}/scheduled/${id}`, {
      content, scheduledAt, recurrenceType, recurrenceDays
    });
  }

  cancelScheduledMessage(projectId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/scheduled/${id}`);
  }

  getMyScheduledMessages(): Observable<ScheduledMessage[]> {
    return this.http.get<ScheduledMessage[]>(`${this.apiUrl}/scheduled/mine`);
  }

  // ── Pin ──────────────────────────────────────────────────────────────────────

  getPinnedMessages(projectId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/${projectId}/pinned`);
  }

  pinMessage(projectId: number, messageId: number): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/${projectId}/messages/${messageId}/pin`, {});
  }

  unpinMessage(projectId: number, messageId: number): Observable<ChatMessage> {
    return this.http.delete<ChatMessage>(`${this.apiUrl}/${projectId}/messages/${messageId}/pin`);
  }

  // ── Shared content ───────────────────────────────────────────────────────────

  getSharedContent(projectId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/${projectId}/shared`);
  }

  // ── Edit / Delete ─────────────────────────────────────────────────────────────

  editMessage(projectId: number, messageId: number, content: string): Observable<ChatMessage> {
    return this.http.put<ChatMessage>(`${this.apiUrl}/${projectId}/messages/${messageId}`, { content });
  }

  deleteMessage(projectId: number, messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/messages/${messageId}`);
  }

  // ── Reactions ────────────────────────────────────────────────────────────────

  toggleReaction(projectId: number, messageId: number, emoji: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/${projectId}/messages/${messageId}/reactions`, { emoji });
  }

  getReactions(projectId: number, messageId: number): Observable<MessageReaction[]> {
    return this.http.get<MessageReaction[]>(`${this.apiUrl}/${projectId}/messages/${messageId}/reactions`);
  }

  uploadFile(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileUploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  getUnreadCount(projectId: number): Observable<{ projectId: number; count: number }> {
    return this.http.get<{ projectId: number; count: number }>(`${this.apiUrl}/${projectId}/unread`);
  }

  markRead(projectId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/mark-read`, {});
  }

  getParticipants(projectId: number): Observable<ProjectParticipant[]> {
    return this.http.get<ProjectParticipant[]>(`${this.apiUrl}/${projectId}/participants`);
  }

  connectToProject(projectId: number): Observable<ChatMessage> {
    if (!this.messageSubjects.has(projectId)) {
      this.messageSubjects.set(projectId, new Subject<ChatMessage>());
    }

    if (!this.stompClient || !this.stompClient.active) {
      this.stompClient = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
        reconnectDelay: 5000,
      });

      this.stompClient.onConnect = () => {
        this.messageSubjects.forEach((subject, pid) => {
          this.stompClient!.subscribe(`/topic/chat/${pid}`, (msg: IMessage) => {
            const parsed = JSON.parse(msg.body);
            const currentUser = this.authService.currentUser;
            if (currentUser?.role === 'CLIENT' && parsed.clientId != null && parsed.clientId !== currentUser.id) {
              return;
            }
            subject.next(parsed);
          });
        });
        if (this.userNotifUserId) {
          this.stompClient!.subscribe(`/topic/notifications/${this.userNotifUserId}`, (msg: IMessage) => {
            this.userNotifSubject.next(JSON.parse(msg.body));
          });
        }
        this.typingSubjects.forEach((subject, pid) => {
          this.stompClient!.subscribe(`/topic/typing/${pid}`, (msg: IMessage) => {
            subject.next(JSON.parse(msg.body));
          });
        });
        this.presenceSubjects.forEach((subject, pid) => {
          this.stompClient!.subscribe(`/topic/presence/${pid}`, (msg: IMessage) => {
            subject.next(JSON.parse(msg.body));
          });
        });
      };

      this.stompClient.activate();
    } else if (this.stompClient.connected) {
      this.stompClient.subscribe(`/topic/chat/${projectId}`, (msg: IMessage) => {
        const parsed = JSON.parse(msg.body);
        const currentUser = this.authService.currentUser;
        if (currentUser?.role === 'CLIENT' && parsed.clientId != null && parsed.clientId !== currentUser.id) {
          return;
        }
        this.messageSubjects.get(projectId)?.next(parsed);
      });
    }

    return this.messageSubjects.get(projectId)!.asObservable();
  }

  subscribeToUserNotifications(userId: number): Observable<any> {
    this.userNotifUserId = userId;
    if (this.stompClient?.connected) {
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (msg: IMessage) => {
        this.userNotifSubject.next(JSON.parse(msg.body));
      });
    }
    return this.userNotifSubject.asObservable();
  }

  sendTyping(projectId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/typing`, {});
  }

  sendPresence(projectId: number, online: boolean): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/presence`, { online });
  }

  subscribeToTyping(projectId: number): Observable<any> {
    if (!this.typingSubjects.has(projectId)) {
      this.typingSubjects.set(projectId, new Subject<any>());
    }
    if (this.stompClient?.connected) {
      this.stompClient.subscribe(`/topic/typing/${projectId}`, (msg: IMessage) => {
        this.typingSubjects.get(projectId)?.next(JSON.parse(msg.body));
      });
    }
    return this.typingSubjects.get(projectId)!.asObservable();
  }

  subscribeToPresence(projectId: number): Observable<any> {
    if (!this.presenceSubjects.has(projectId)) {
      this.presenceSubjects.set(projectId, new Subject<any>());
    }
    if (this.stompClient?.connected) {
      this.stompClient.subscribe(`/topic/presence/${projectId}`, (msg: IMessage) => {
        this.presenceSubjects.get(projectId)?.next(JSON.parse(msg.body));
      });
    }
    return this.presenceSubjects.get(projectId)!.asObservable();
  }

  disconnectFromProject(projectId: number): void {
    this.messageSubjects.delete(projectId);
    this.typingSubjects.delete(projectId);
    this.presenceSubjects.delete(projectId);
    if (this.messageSubjects.size === 0 && this.stompClient) {
      this.userNotifUserId = null;
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }
}

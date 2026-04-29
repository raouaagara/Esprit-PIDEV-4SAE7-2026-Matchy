import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Project } from '../../shared/models/models';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient: Client | null = null;
  private newProjectSubject = new Subject<Project>();
  private deletedProjectSubject = new Subject<number>();

  connect(): void {
    if (this.stompClient?.connected) return;

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        this.stompClient!.subscribe('/topic/projects', (msg: IMessage) => {
          this.newProjectSubject.next(JSON.parse(msg.body));
        });
        this.stompClient!.subscribe('/topic/project-deleted', (msg: IMessage) => {
          this.deletedProjectSubject.next(JSON.parse(msg.body));
        });
      }
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    this.stompClient?.deactivate();
    this.stompClient = null;
  }

  onNewProject(): Observable<Project> {
    return this.newProjectSubject.asObservable();
  }

  onProjectDeleted(): Observable<number> {
    return this.deletedProjectSubject.asObservable();
  }
}

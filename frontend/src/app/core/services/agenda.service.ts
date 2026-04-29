import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AgendaClient, AgendaMeeting, AgendaMeetingRequest } from 'src/app/shared/models/models';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private api = 'http://localhost:8085/api/agenda';
  private stompClient: Client | null = null;
  private agendaSubject = new Subject<AgendaMeeting>();

  constructor(private http: HttpClient) {}

  getMyMeetings(): Observable<AgendaMeeting[]> {
    return this.http.get<AgendaMeeting[]>(this.api);
  }

  getMyClients(): Observable<AgendaClient[]> {
    return this.http.get<AgendaClient[]>(`${this.api}/clients`);
  }

  create(req: AgendaMeetingRequest): Observable<AgendaMeeting> {
    return this.http.post<AgendaMeeting>(this.api, req);
  }

  update(id: number, req: AgendaMeetingRequest): Observable<AgendaMeeting> {
    return this.http.put<AgendaMeeting>(`${this.api}/${id}`, req);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getUpcoming(minutes = 15): Observable<AgendaMeeting[]> {
    return this.http.get<AgendaMeeting[]>(`${this.api}/upcoming?minutes=${minutes}`);
  }

  subscribeToNewMeetings(organizerId: number): Observable<AgendaMeeting> {
    if (!this.stompClient) {
      this.stompClient = new Client({
        webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
        reconnectDelay: 5000,
      });
      this.stompClient.onConnect = () => {
        this.stompClient!.subscribe(`/topic/agenda/${organizerId}`, (msg: IMessage) => {
          try { this.agendaSubject.next(JSON.parse(msg.body)); } catch {}
        });
      };
      this.stompClient.activate();
    }
    return this.agendaSubject.asObservable();
  }

  disconnectAgenda(): void {
    this.stompClient?.deactivate();
    this.stompClient = null;
    this.agendaSubject = new Subject<AgendaMeeting>();
  }
}

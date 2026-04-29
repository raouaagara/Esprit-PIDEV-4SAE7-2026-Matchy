import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting, MeetingJoinResponse } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private api = 'http://localhost:8085/api/meeting';

  constructor(private http: HttpClient) {}

  startInstant(projectId: number): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.api}/instant`, { projectId });
  }

  schedule(projectId: number, subject: string, scheduledAt: string, clientId?: number): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.api}/schedule`, { projectId, subject, scheduledAt, clientId });
  }

  createLink(projectId: number, subject?: string): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.api}/link`, { projectId, subject });
  }

  join(roomId: string): Observable<MeetingJoinResponse> {
    return this.http.post<MeetingJoinResponse>(`${this.api}/${roomId}/join`, {});
  }

  end(roomId: string): Observable<void> {
    return this.http.put<void>(`${this.api}/${roomId}/end`, {});
  }

  getMeetings(projectId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.api}/project/${projectId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, retry, timer } from 'rxjs';
import { MeetingAIResult, SubtitleBroadcast } from '../../shared/models/models';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class TranscriptionService {
  private api = 'http://localhost:8085/api/transcription';
  private stompClient: Client | null = null;

  // FIX #1 — Subject recréé à chaque connexion (évite fuites entre sessions)
  private subtitleSubject: Subject<SubtitleBroadcast> | null = null;

  constructor(private http: HttpClient) {}

  registerParticipant(roomId: string, userId: string, preferredLang: string): Observable<void> {
    return this.http.post<void>(`${this.api}/register`, { roomId, userId, preferredLang });
  }

  // FIX #4 — retry avec délai exponentiel en cas d'erreur réseau
  sendAudioChunk(
    blob: Blob,
    roomId: string,
    speakerName: string,
    speakerId: string,
    targetLang: string
  ): Observable<{ transcribedText: string; sourceLang: string }> {
    const form = new FormData();
    form.append('audio',       blob, 'chunk.webm');
    form.append('roomId',      roomId);
    form.append('speakerName', speakerName);
    form.append('speakerId',   speakerId);
    form.append('targetLang',  targetLang);

    return this.http
      .post<{ transcribedText: string; sourceLang: string }>(`${this.api}/chunk`, form)
      .pipe(
        retry({ count: 2, delay: (_, attempt) => timer(attempt * 1000) })
      );
  }

  connectSubtitles(roomId: string): Observable<SubtitleBroadcast> {
    this.disconnectSubtitles();

    // FIX #1 — nouveau Subject isolé pour cette session
    this.subtitleSubject = new Subject<SubtitleBroadcast>();
    const currentSubject = this.subtitleSubject;

    const token = localStorage.getItem('token') ?? '';

    this.stompClient = new Client({
      // FIX #2 — token retiré de l'URL → passé dans connectHeaders STOMP
      webSocketFactory: () => new SockJS('http://localhost:8085/ws'),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,

      onConnect: () => {
        this.stompClient!.subscribe(
          `/topic/subtitles/${roomId}`,
          (msg: IMessage) => {
            try {
              currentSubject.next(JSON.parse(msg.body) as SubtitleBroadcast);
            } catch { /* ignorer frames malformées */ }
          }
        );
      },

      onStompError: (frame) => {
        // Log only — don't close the Subject so STOMP reconnect keeps working
        console.warn('[STOMP subtitle error]', frame.headers?.['message'] ?? frame);
      }
    });

    this.stompClient.activate();
    return currentSubject.asObservable();
  }

  // FIX #3 — complete() signale la fin du flux → cleanup côté composant
  disconnectSubtitles(): void {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
    }
    this.stompClient = null;

    if (this.subtitleSubject && !this.subtitleSubject.closed) {
      this.subtitleSubject.complete();
    }
    this.subtitleSubject = null;
  }

  finalizeMeeting(
    roomId: string,
    projectId: number,
    transcript: string,
    speakers: string[]
  ): Observable<MeetingAIResult> {
    return this.http.post<MeetingAIResult>(`${this.api}/finalize`, {
      roomId,
      projectId,
      fullTranscript: transcript,
      speakers
    });
  }
}
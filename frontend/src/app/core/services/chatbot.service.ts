import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  text: string;
  success: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  // ✅ Clé API cachée côté backend — plus exposée dans le frontend
  private readonly API_URL = 'http://localhost:8081/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(history: ChatMessage[]): Observable<any> {
    return this.http.post<ChatResponse>(this.API_URL, { history }).pipe(
      map(res => {
        // On retourne le même format attendu par chatbot.component.ts
        return {
          content: [{ type: 'text', text: res.text }]
        };
      }),
      catchError(err => {
        console.error('Erreur ChatbotService:', err);
        return of({
          content: [{ type: 'text', text: '🔌 Erreur de connexion au serveur. Veuillez réessayer.' }]
        });
      })
    );
  }
}
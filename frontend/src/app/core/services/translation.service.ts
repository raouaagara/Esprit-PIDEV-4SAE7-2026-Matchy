import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TranslationResult {
  translatedText: string;
  detectedLanguage: string;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private apiUrl = 'http://localhost:8085/api/translate';

  private readonly langNames: Record<string, string> = {
    fr: 'français', en: 'anglais', es: 'espagnol',
    ar: 'arabe', de: 'allemand', it: 'italien',
    pt: 'portugais', zh: 'chinois', ja: 'japonais',
    ru: 'russe', nl: 'néerlandais', tr: 'turc',
    ko: 'coréen', pl: 'polonais', uk: 'ukrainien',
  };

  readonly availableLangs = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'Anglais' },
    { code: 'es', label: 'Espagnol' },
    { code: 'ar', label: 'Arabe' },
    { code: 'de', label: 'Allemand' },
    { code: 'it', label: 'Italien' },
    { code: 'pt', label: 'Portugais' },
    { code: 'ru', label: 'Russe' },
  ];

  constructor(private http: HttpClient) {}

  translate(text: string, sourceLang: string, targetLang: string): Observable<TranslationResult> {
    return this.http.post<TranslationResult>(this.apiUrl, { text, sourceLang, targetLang });
  }

  detect(text: string): Observable<{ language: string }> {
    return this.http.post<{ language: string }>(`${this.apiUrl}/detect`, { text });
  }

  getLangName(code: string): string {
    return this.langNames[code] ?? code;
  }
}

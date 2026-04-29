import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from '../../core/services/meeting.service';
import { AuthService } from '../../core/services/auth.service';
import { TranscriptionService } from '../../core/services/transcription.service';
import { MeetingAIResult, SubtitleMessage } from '../../shared/models/models';

@Component({
  selector: 'app-meet-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Conteneur vidéo ZegoCloud -->
    <div #videoContainer id="zego-container" class="video-container"></div>

    <!-- Chargement initial -->
    <div class="overlay" *ngIf="loading">
      <div class="spinner"></div>
      <p>Connexion à la réunion...</p>
    </div>

    <!-- Erreur -->
    <div class="overlay error-overlay" *ngIf="error && !loading && !isFinalizing">
      <p>⚠️ {{ error }}</p>
      <button (click)="goBack()">Retour</button>
    </div>

    <!-- Génération du compte-rendu -->
    <div class="overlay" *ngIf="isFinalizing">
      <div class="spinner"></div>
      <p>🧠 Génération du compte-rendu IA...</p>
      <p class="overlay-hint">Veuillez patienter, cela peut prendre quelques secondes.</p>
    </div>

    <!-- ─── LOBBY : sélection de la langue ──────────────────────────── -->
    <div class="lang-lobby" *ngIf="!loading && !error && showLangLobby">
      <div class="lobby-card">
        <div class="lobby-icon">🌐</div>
        <h2>Choisissez votre langue</h2>
        <p>
          Les sous-titres seront automatiquement traduits dans la langue sélectionnée.
          Chaque participant choisit sa propre langue.
        </p>
        <div class="lang-grid">
          <button
            *ngFor="let l of languages"
            [class.active]="lobbyLang === l.code"
            (click)="lobbyLang = l.code">
            <span class="lang-flag">{{ l.flag }}</span>
            <span class="lang-label">{{ l.label }}</span>
          </button>
        </div>
        <button class="join-btn" (click)="joinWithLanguage()">
          🚀 Rejoindre la réunion
        </button>
        <p class="lang-hint">
          Langue sélectionnée : <strong>{{ selectedLangLabel }}</strong>
        </p>
      </div>
    </div>

    <!-- ─── CONTRÔLES + SOUS-TITRES (pendant la réunion) ─────────────── -->
    <ng-container *ngIf="!loading && !error && !showLangLobby && !isFinalizing && !showReport">

      <!-- Bouton transcription -->
      <div class="transcription-bar">
        <button
          class="transcription-btn"
          [class.active]="isTranscribing"
          (click)="toggleTranscription()"
          [title]="isTranscribing ? 'Arrêter les sous-titres' : 'Activer les sous-titres'">
          {{ isTranscribing ? '🎙️ Sous-titres ON' : '🎙️ Sous-titres OFF' }}
        </button>
        <span class="lang-badge">{{ preferredLang.toUpperCase() }}</span>
      </div>

      <!-- Zone des sous-titres -->
      <div class="subtitles-overlay" *ngIf="lastSubtitles.length > 0">
        <div class="subtitle-line" *ngFor="let s of lastSubtitles; trackBy: trackSubtitle">

          <span class="speaker" [class.own-speaker]="s.isMine">
            {{ s.speakerName }}{{ s.isMine ? ' (vous)' : '' }}:
          </span>

          <!-- Message d'un AUTRE utilisateur → traduction automatique -->
          <ng-container *ngIf="!s.isMine">
            <span class="text translated">{{ s.translatedText || s.originalText }}</span>
            <span class="original-hint"
                  *ngIf="s.translatedText && s.translatedText !== s.originalText">
              ({{ s.originalText }})
            </span>
          </ng-container>

          <!-- Mes propres messages → texte original + bouton toggle traduction -->
          <ng-container *ngIf="s.isMine">
            <span class="text">{{ s.originalText }}</span>
            <button
              *ngIf="s.translatedText && s.translatedText !== s.originalText"
              class="toggle-translation"
              (click)="s.showTranslation = !s.showTranslation"
              title="Voir/masquer la traduction">
              🔤
            </button>
            <span class="translation-bubble" *ngIf="s.showTranslation">
              → {{ s.translatedText }}
            </span>
          </ng-container>

        </div>
      </div>

    </ng-container>

    <!-- ─── RAPPORT IA POST-RÉUNION ──────────────────────────────────── -->
    <div class="report-overlay" *ngIf="showReport && meetingReport">
      <div class="report-card">
        <div class="report-header">
          <h2>🧠 Compte-rendu IA</h2>
          <p class="report-sub">La réunion est terminée. Ce rapport a été sauvegardé dans le chat du projet.</p>
        </div>

        <div class="report-body">
          <section class="report-section">
            <h3>📋 Résumé</h3>
            <p>{{ meetingReport.summary }}</p>
          </section>

          <section class="report-section" *ngIf="meetingReport.tasks?.length">
            <h3>✅ Tâches détectées</h3>
            <ul>
              <li *ngFor="let task of meetingReport.tasks">{{ task }}</li>
            </ul>
          </section>

          <section class="report-section" *ngIf="meetingReport.deadlines?.length">
            <h3>⏰ Deadlines</h3>
            <ul>
              <li *ngFor="let d of meetingReport.deadlines">{{ d }}</li>
            </ul>
          </section>

          <section class="report-section" *ngIf="meetingReport.decisions?.length">
            <h3>🎯 Décisions</h3>
            <ul>
              <li *ngFor="let dec of meetingReport.decisions">{{ dec }}</li>
            </ul>
          </section>
        </div>

        <div class="report-footer">
          <button class="close-report-btn" (click)="goBack()">
            Fermer et aller au chat
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-container {
      position: fixed; inset: 0; background: #000; z-index: 1;
    }

    /* ── Overlay générique ── */
    .overlay {
      position: fixed; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 16px;
      background: #0a0a14; color: #e0e0e0; z-index: 100;
    }
    .overlay-hint { color: #6060a0; font-size: 0.82rem; }
    .error-overlay { color: #f87171; }
    .error-overlay button {
      padding: 8px 24px; border-radius: 20px;
      background: #6c63ff; border: none; color: #fff; cursor: pointer;
    }
    .spinner {
      width: 44px; height: 44px;
      border: 3px solid #2a2a3e; border-top-color: #6c63ff;
      border-radius: 50%; animation: spin 0.7s linear infinite;
    }

    /* ── Lobby ── */
    .lang-lobby {
      position: fixed; inset: 0; display: flex;
      align-items: center; justify-content: center;
      background: linear-gradient(135deg, #0a0a14 0%, #12122a 100%);
      z-index: 50;
    }
    .lobby-card {
      background: #14142a; border: 1px solid #2a2a4a;
      border-radius: 20px; padding: 40px 48px;
      max-width: 540px; width: 90%; text-align: center; color: #e0e0e0;
      box-shadow: 0 20px 60px rgba(108,99,255,0.15);
    }
    .lobby-icon { font-size: 2.5rem; margin-bottom: 12px; }
    .lobby-card h2 { margin: 0 0 10px; font-size: 1.5rem; color: #fff; }
    .lobby-card p  { color: #9090b0; font-size: 0.88rem; margin-bottom: 24px; line-height: 1.5; }
    .lang-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 28px;
    }
    .lang-grid button {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      padding: 12px 8px; border-radius: 12px;
      background: #1e1e38; border: 2px solid transparent;
      color: #c0c0d8; cursor: pointer; transition: all 0.2s;
    }
    .lang-flag { font-size: 1.3rem; }
    .lang-label { font-size: 0.78rem; font-weight: 500; }
    .lang-grid button.active {
      background: rgba(108,99,255,0.2); border-color: #6c63ff; color: #fff;
    }
    .lang-grid button:hover:not(.active) { background: #252545; border-color: #4a4a6a; }
    .join-btn {
      width: 100%; padding: 15px; border-radius: 14px;
      background: linear-gradient(135deg, #6c63ff, #8b5cf6);
      border: none; color: #fff;
      font-size: 1rem; font-weight: 700; cursor: pointer;
      transition: opacity 0.2s; margin-bottom: 12px;
    }
    .join-btn:hover { opacity: 0.9; }
    .lang-hint { color: #7070a0; font-size: 0.82rem; margin: 0; }
    .lang-hint strong { color: #a78bfa; }

    /* ── Barre de contrôles ── */
    .transcription-bar {
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 10px; z-index: 20;
    }
    .transcription-btn {
      padding: 9px 20px; border-radius: 22px; border: none;
      font-size: 0.85rem; font-weight: 600; cursor: pointer;
      background: rgba(20,20,50,0.9); color: #c0c0e0;
      backdrop-filter: blur(8px); transition: all 0.2s;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .transcription-btn.active { background: #6c63ff; color: #fff; border-color: transparent; }
    .lang-badge {
      background: rgba(108,99,255,0.3); color: #a78bfa;
      border: 1px solid #6c63ff; border-radius: 8px;
      padding: 4px 10px; font-size: 0.78rem; font-weight: 700;
    }

    /* ── Sous-titres ── */
    .subtitles-overlay {
      position: fixed; bottom: 130px; left: 0; right: 0;
      display: flex; flex-direction: column; align-items: center;
      gap: 6px; pointer-events: none; z-index: 15; padding: 0 20px;
    }
    .subtitle-line {
      background: rgba(0,0,0,0.82); padding: 7px 16px; border-radius: 22px;
      font-size: 0.9rem; color: #fff; max-width: 82%;
      backdrop-filter: blur(6px); display: flex; align-items: center;
      gap: 6px; pointer-events: auto; flex-wrap: wrap;
    }
    .speaker { color: #a78bfa; font-weight: 700; white-space: nowrap; }
    .own-speaker { color: #34d399; }
    .text { flex: 1; }
    .translated { color: #f0f0ff; }
    .original-hint { color: #7070a0; font-size: 0.76rem; font-style: italic; }
    .toggle-translation {
      background: none; border: 1px solid rgba(255,255,255,0.25);
      border-radius: 6px; cursor: pointer; font-size: 0.8rem;
      padding: 2px 6px; color: #fff; flex-shrink: 0;
    }
    .translation-bubble { color: #6ee7b7; font-style: italic; font-size: 0.84rem; width: 100%; }

    /* ── Rapport IA ── */
    .report-overlay {
      position: fixed; inset: 0; display: flex;
      align-items: center; justify-content: center;
      background: rgba(5,5,15,0.96); z-index: 200;
      padding: 20px;
    }
    .report-card {
      background: #12122a; border: 1px solid #2a2a4a;
      border-radius: 20px; max-width: 600px; width: 100%;
      max-height: 85vh; overflow-y: auto; color: #e0e0e0;
      box-shadow: 0 30px 80px rgba(108,99,255,0.2);
    }
    .report-header {
      padding: 28px 32px 16px; border-bottom: 1px solid #1e1e3a;
      position: sticky; top: 0; background: #12122a; z-index: 1;
    }
    .report-header h2 { margin: 0 0 6px; font-size: 1.4rem; color: #fff; }
    .report-sub { margin: 0; color: #7070a0; font-size: 0.84rem; }
    .report-body { padding: 20px 32px; }
    .report-section { margin-bottom: 20px; }
    .report-section h3 {
      font-size: 0.95rem; font-weight: 700; color: #a78bfa;
      margin: 0 0 10px; letter-spacing: 0.3px;
    }
    .report-section p { color: #c0c0d8; line-height: 1.6; margin: 0; font-size: 0.9rem; }
    .report-section ul {
      margin: 0; padding-left: 18px; color: #c0c0d8;
      font-size: 0.9rem; line-height: 1.8;
    }
    .report-footer {
      padding: 16px 32px 24px; border-top: 1px solid #1e1e3a;
      position: sticky; bottom: 0; background: #12122a;
    }
    .close-report-btn {
      width: 100%; padding: 14px; border-radius: 12px;
      background: linear-gradient(135deg, #6c63ff, #8b5cf6);
      border: none; color: #fff; font-size: 1rem;
      font-weight: 700; cursor: pointer; transition: opacity 0.2s;
    }
    .close-report-btn:hover { opacity: 0.88; }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class MeetRoomComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly ZEGO_APP_ID        = 856544200;
  private readonly ZEGO_SERVER_SECRET = 'e69581cf9e48b90cacc8efc0b0c93f02';

  @ViewChild('videoContainer') container!: ElementRef<HTMLDivElement>;

  roomId    = '';
  projectId?: number;

  loading      = true;
  error        = '';
  isFinalizing = false;
  showReport   = false;
  meetingReport: MeetingAIResult | null = null;

  currentUserId   = '';
  currentUserName = '';

  showLangLobby = true;
  lobbyLang     = 'fr';
  preferredLang = 'fr';

  readonly languages = [
    { code: 'fr', label: 'Français',   flag: '🇫🇷' },
    { code: 'en', label: 'English',    flag: '🇬🇧' },
    { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
    { code: 'es', label: 'Español',    flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
    { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
    { code: 'pt', label: 'Português',  flag: '🇵🇹' },
    { code: 'zh', label: '中文',        flag: '🇨🇳' },
    { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  ];

  get selectedLangLabel(): string {
    return this.languages.find(l => l.code === this.lobbyLang)?.label ?? this.lobbyLang;
  }

  isTranscribing = false;
  subtitles: SubtitleMessage[] = [];

  private fullTranscript = '';
  private speakers       = new Set<string>();
  private zp: any        = null;
  private zegoLeft       = false;

  private mediaRecorder: MediaRecorder | null = null;
  private audioStream:   MediaStream   | null = null;
  private audioChunks:   Blob[]              = [];
  private audioInterval: ReturnType<typeof setInterval> | null = null;

  private subtitleSub?: Subscription;
  private destroyed = false;

  constructor(
    private route:            ActivatedRoute,
    private router:           Router,
    private meetingSvc:       MeetingService,
    public  authService:      AuthService,
    private transcriptionSvc: TranscriptionService,
    private cdr:              ChangeDetectorRef
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (!user) { this.router.navigate(['/auth/login']); return; }
    this.currentUserId   = user.id.toString();
    this.currentUserName = user.name;
    this.roomId = this.route.snapshot.paramMap.get('roomId')!;

    this.meetingSvc.join(this.roomId).subscribe({
      next: (data) => {
        this.projectId = data.projectId;
        this.loading   = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.error   = e?.error || 'Impossible de rejoindre la réunion.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.destroyed = true;
    this.stopAudioCapture();
    this.subtitleSub?.unsubscribe();
    this.transcriptionSvc.disconnectSubtitles();
    // ZegoCloud : ne pas appeler destroy si onLeaveRoom a déjà nettoyé
    if (!this.zegoLeft) {
      try { this.zp?.destroy?.(); } catch {}
    }
    this.zp = null;
  }

  // ── Lobby ────────────────────────────────────────────────────────────────

  joinWithLanguage() {
    this.preferredLang = this.lobbyLang;
    this.showLangLobby = false;
    this.cdr.detectChanges();

    // 1. Enregistrer la langue préférée au backend AVANT de parler
    this.transcriptionSvc.registerParticipant(
      this.roomId, this.currentUserId, this.preferredLang
    ).subscribe({
      error: (e) => console.warn('[register participant]', e)
    });

    // 2. S'abonner aux sous-titres WebSocket
    this.subtitleSub = this.transcriptionSvc
      .connectSubtitles(this.roomId)
      .subscribe({
        next: broadcast => {
          const translatedText = broadcast.translations?.[this.currentUserId]
                                 ?? broadcast.originalText;
          const enriched: SubtitleMessage = {
            ...broadcast,
            translatedText,
            isMine: broadcast.speakerId === this.currentUserId,
            showTranslation: false
          };
          this.subtitles = [...this.subtitles, enriched].slice(-60);
          this.cdr.detectChanges();
        },
        error: (e) => console.warn('[subtitle WebSocket error]', e)
      });

    // 3. Lancer ZegoCloud
    setTimeout(() => this.initZegoCloud(), 500);
  }

  // ── ZegoCloud ────────────────────────────────────────────────────────────

  initZegoCloud() {
    const container = (document.getElementById('zego-container') as HTMLElement)
                      ?? this.container?.nativeElement;
    if (!container) {
      setTimeout(() => this.initZegoCloud(), 200);
      return;
    }

    import('@zegocloud/zego-uikit-prebuilt').then(({ ZegoUIKitPrebuilt }) => {
      try {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          this.ZEGO_APP_ID, this.ZEGO_SERVER_SECRET,
          this.roomId, this.currentUserId, this.currentUserName
        );
        this.zp = ZegoUIKitPrebuilt.create(kitToken);
        this.zp.joinRoom({
          container,
          sharedLinks: [{ name: 'Rejoindre la réunion', url: window.location.href }],
          scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
          showPreJoinView:          false,
          showLeavingView:          false,
          showScreenSharingButton:  true,
          showTextChat:             true,
          showUserList:             true,
          maxUsers:                 10,
          layout:                   'Auto',
          onLeaveRoom: () => this.onLeave(),
          onError: (code: number, msg: string) =>
            console.error('[Zego error]', code, msg)
        });
      } catch (e: any) {
        this.error = 'Impossible de démarrer la vidéo : ' + (e?.message ?? String(e));
        this.cdr.detectChanges();
      }
    }).catch((e: any) => {
      this.error = 'Erreur chargement ZegoCloud : ' + (e?.message ?? String(e));
      this.cdr.detectChanges();
    });
  }

  // ── Transcription audio ──────────────────────────────────────────────────

  toggleTranscription() {
    if (this.isTranscribing) {
      this.stopAudioCapture();
    } else {
      this.startAudioCapture(this.preferredLang);
    }
  }

  private async startAudioCapture(targetLang: string) {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const opts = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus' } : {};
      this.mediaRecorder  = new MediaRecorder(this.audioStream, opts);
      this.isTranscribing = true;

      this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };
      this.mediaRecorder.start(8000);

      this.audioInterval = setInterval(() => {
        if (this.mediaRecorder?.state === 'recording') {
          this.mediaRecorder.stop();

          const blob = new Blob(this.audioChunks, {
            type: this.mediaRecorder.mimeType || 'audio/webm'
          });
          this.audioChunks = [];

          if (blob.size > 1000 && !this.authService.isTokenExpired()) {
            this.transcriptionSvc.sendAudioChunk(
              blob, this.roomId, this.currentUserName,
              this.currentUserId, targetLang
            ).subscribe({
              next: (res) => {
                if (res?.transcribedText) {
                  this.fullTranscript += `[${this.currentUserName}]: ${res.transcribedText}\n`;
                  this.speakers.add(this.currentUserName);
                }
              },
              error: (err) => {
                if (err.status === 403) {
                  this.stopAudioCapture();
                  this.error = 'Session expirée — reconnectez-vous.';
                  this.cdr.detectChanges();
                }
              }
            });
          }

          if (this.audioStream && this.isTranscribing) {
            const o = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
              ? { mimeType: 'audio/webm;codecs=opus' } : {};
            this.mediaRecorder = new MediaRecorder(this.audioStream, o);
            this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
              if (e.data.size > 0) this.audioChunks.push(e.data);
            };
            this.mediaRecorder.start(8000);
          }
        }
      }, 8000);

    } catch {
      this.isTranscribing = false;
      this.error = 'Microphone inaccessible — vérifiez les permissions.';
      this.cdr.detectChanges();
    }
  }

  private stopAudioCapture() {
    if (this.audioInterval) { clearInterval(this.audioInterval); this.audioInterval = null; }
    try {
      if (this.mediaRecorder?.state !== 'inactive') this.mediaRecorder?.stop();
    } catch {}
    this.audioStream?.getTracks().forEach(t => t.stop());
    this.audioStream    = null;
    this.mediaRecorder  = null;
    this.isTranscribing = false;
  }

  // ── Fin de réunion ───────────────────────────────────────────────────────

  onLeave() {
    if (this.zegoLeft) return;
    this.zegoLeft = true;

    this.stopAudioCapture();
    this.subtitleSub?.unsubscribe();
    this.transcriptionSvc.disconnectSubtitles();

    // Nettoyer ZegoCloud proprement
    try { this.zp?.destroy?.(); } catch {}
    this.zp = null;

    // Si le composant est déjà détruit (navigation forcée), finaliser sans afficher le rapport
    if (this.destroyed) { return; }

    // Toujours finaliser la réunion si on a un projectId
    if (this.projectId) {
      this.isFinalizing = true;
      this.cdr.detectChanges();

      this.transcriptionSvc.finalizeMeeting(
        this.roomId,
        this.projectId,
        this.fullTranscript || '',
        Array.from(this.speakers)
      ).subscribe({
        next: (result) => {
          if (this.destroyed) return;
          this.isFinalizing = false;
          if (result?.summary && result.summary.length > 10) {
            this.meetingReport = result;
            this.showReport    = true;
          } else {
            this.goBack();
          }
          this.cdr.detectChanges();
        },
        error: () => {
          if (this.destroyed) return;
          this.isFinalizing = false;
          this.goBack();
        }
      });
    } else {
      this.goBack();
    }
  }

  goBack() {
    const user = this.authService.currentUser;
    if (user?.role === 'ORGANIZER') this.router.navigate(['/organizer/chat']);
    else if (user?.role === 'CLIENT') this.router.navigate(['/client/projects']);
    else this.router.navigate(['/']);
  }

  get lastSubtitles(): SubtitleMessage[] { return this.subtitles.slice(-3); }
  trackSubtitle(index: number, _: SubtitleMessage): number { return index; }
}

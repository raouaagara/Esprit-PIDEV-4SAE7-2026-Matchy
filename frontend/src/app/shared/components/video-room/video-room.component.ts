import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranscriptionService } from '../../../core/services/transcription.service';
import { AuthService } from '../../../core/services/auth.service';
import { SubtitleMessage, SubtitleBroadcast, MeetingAIResult } from '../../models/models';

@Component({
  selector: 'app-video-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-room.component.html',
  styleUrls: ['./video-room.component.css']
})
export class VideoRoomComponent implements AfterViewInit, OnDestroy {

  // ── Inputs ───────────────────────────────────────────────────────────────
  @Input() roomId!: string;
  @Input() token!: string;
  @Input() appId!: number;
  @Input() userId!: string;
  @Input() userName!: string;
  @Input() subject = 'Réunion';
  @Input() isOrganizer = false;
  @Input() projectId?: number;
  @Input() preferredLang = 'fr'; // ✅ langue choisie dans le lobby

  @Output() leave = new EventEmitter<void>();

  @ViewChild('videoContainer') container!: ElementRef<HTMLDivElement>;

  // ── State ────────────────────────────────────────────────────────────────
  private zp: any = null;
  error = '';
  subtitles: SubtitleMessage[] = [];
  isTranscribing = false;
  isFinalizing = false;
  showOriginalSubtitles = false;
  meetingReport: MeetingAIResult | null = null;
  showReportModal = false;

  // ── Language lobby ───────────────────────────────────────────────────────
  showLangLobby = true;
  lobbyLang = 'fr';
  readonly languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'zh', label: '中文' },
    { code: 'ru', label: 'Русский' },
  ];

  // ── Private ──────────────────────────────────────────────────────────────
  private mediaRecorder: MediaRecorder | null = null;
  private audioStream: MediaStream | null = null;
  private audioChunks: Blob[] = [];
  private audioInterval: any = null;
  private fullTranscript = '';
  private speakers = new Set<string>();
  private subtitleSub?: Subscription;
  private finalizingSub?: Subscription;

  // ── Helpers ──────────────────────────────────────────────────────────────
  trackSubtitle(index: number, _sub: SubtitleMessage): number { return index; }

  get lastSubtitles(): SubtitleMessage[] {
    return this.subtitles.slice(-3);
  }

  constructor(
    private transcriptionService: TranscriptionService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  // ── Lifecycle ────────────────────────────────────────────────────────────

  ngAfterViewInit() {
    // Wait for language lobby to be dismissed before initialising Zego
    if (!this.showLangLobby) {
      this.scheduleZegoInit();
    }
  }

 joinWithLanguage() {
    this.preferredLang = this.lobbyLang;
    this.showLangLobby = false;
    this.cdr.detectChanges();

    // Enregistrer la langue préférée au backend
    this.transcriptionService.registerParticipant(
      this.roomId, this.userId, this.preferredLang
    ).subscribe({ error: (e: any) => console.warn('[register]', e) });

    // Connexion WebSocket sous-titres dès le join (pas seulement au toggle)
    if (!this.subtitleSub) {
      this.subtitleSub = this.transcriptionService
        .connectSubtitles(this.roomId)
        .subscribe({
          next: (broadcast: SubtitleBroadcast) => {
            const translatedText = broadcast.translations?.[this.userId]
                                   ?? broadcast.originalText;
            const enriched: SubtitleMessage = {
              ...broadcast,
              translatedText,
              isMine: broadcast.speakerId === this.userId,
              showTranslation: false
            };
            this.subtitles = [...this.subtitles, enriched].slice(-60);
            this.cdr.detectChanges();
          },
          error: (e) => console.warn('[subtitle WebSocket error]', e)
        });
    }

    this.scheduleZegoInit();
  }

private scheduleZegoInit() {
  const checkAndInit = () => {
    const el = document.getElementById('zego-container');
    // ✅ vérifie que le conteneur est visible ET dans le DOM
    if (el && el.offsetParent !== null) {
      this.initZego();
    } else {
      setTimeout(checkAndInit, 200);
    }
  };
  setTimeout(checkAndInit, 1000);
}

  ngOnDestroy() {
    this.stopAudioCapture();
    this.subtitleSub?.unsubscribe();
    this.finalizingSub?.unsubscribe();
    this.transcriptionService.disconnectSubtitles();
    try { this.zp?.destroy?.(); } catch {}
  }

  // ── ZegoCloud ────────────────────────────────────────────────────────────

 private async initZego() {
  try {
    if (this.zp) {
      try { this.zp.destroy?.(); } catch {}
      this.zp = null;
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      this.appId,
      this.token,
      this.roomId,
      String(this.userId),
      this.userName
    );

    // ✅ Attend que le conteneur ait des dimensions réelles
    const container = await this.waitForContainer();
    if (!container) {
      this.error = 'Conteneur vidéo introuvable.';
      this.cdr.detectChanges();
      return;
    }

    this.zp = ZegoUIKitPrebuilt.create(kitToken);
    this.zp.joinRoom({
      container,
      sharedLinks: [{
        name: 'Rejoindre la réunion',
        url: `${window.location.origin}/meet/${this.roomId}`
      }],
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
      showScreenSharingButton: true,
      showInRoomMessageButton: true,
      showRoomDetailsButton: true,
      showLeavingView: false,
      showPreJoinView: false,
      maxUsers: 50,
      layout: 'Auto',
      onLeaveRoom: () => this.onLeave(),
      onJoinRoom: () => {
        this.error = '';
        this.cdr.detectChanges();
      },
      onError: (errorCode: number, message: string) => {
        console.error('[Zego error]', errorCode, message);
      }
    });

  } catch (e: any) {
    this.error = 'Impossible de démarrer la vidéo : ' + (e?.message || e);
    this.cdr.detectChanges();
  }
}

// ✅ Nouvelle méthode
private waitForContainer(maxAttempts = 20): Promise<HTMLElement | null> {
  return new Promise(resolve => {
    let attempts = 0;
    const check = () => {
      const el = document.getElementById('zego-container');
      if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
        resolve(el);
      } else if (attempts++ < maxAttempts) {
        setTimeout(check, 300);
      } else {
        resolve(null);
      }
    };
    check();
  });
}

  // ── Transcription ────────────────────────────────────────────────────────

  toggleTranscription() {
    if (this.isTranscribing) {
      this.stopAudioCapture();
    } else {
      this.startAudioCapture(this.preferredLang);
    }
  }

  private async startAudioCapture(targetLang: string = 'fr') {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true, video: false
      });

      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus' } : {};

      this.mediaRecorder = new MediaRecorder(this.audioStream, options);
      this.isTranscribing = true;

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start(8000);

      // ✅ Interval sauvegardé pour nettoyage dans stopAudioCapture
      this.audioInterval = setInterval(() => {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop();

          const completeBlob = new Blob(this.audioChunks, {
            type: this.mediaRecorder.mimeType || 'audio/webm'
          });
          this.audioChunks = [];

          // ✅ Vérifie token + taille blob avant envoi
          if (completeBlob.size > 2000 && !this.authService.isTokenExpired()) {
           this.transcriptionService.sendAudioChunk(
  completeBlob,
  this.roomId,
  this.userName,
  this.userId,    // ← ajouter speakerId
  targetLang
).subscribe({
              next: (res) => {
                if (res.transcribedText) {
                  this.fullTranscript += `[${this.userName}]: ${res.transcribedText}\n`;
                  this.speakers.add(this.userName);
                }
              },
              error: (err) => {
                // ✅ Stop propre si session expirée
                if (err.status === 403) {
                  this.stopAudioCapture();
                  this.error = 'Session expirée — reconnectez-vous.';
                }
              }
            });
          }

          // ✅ Redémarre un MediaRecorder frais (header WebM correct)
          if (this.audioStream && this.isTranscribing) {
            const opts = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
              ? { mimeType: 'audio/webm;codecs=opus' } : {};
            this.mediaRecorder = new MediaRecorder(this.audioStream, opts);
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
    // ✅ Nettoyage complet
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
    try {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
    } catch {}
    this.audioStream?.getTracks().forEach(t => t.stop());
    this.isTranscribing = false;
  }

  // ── Leave + Finalize ─────────────────────────────────────────────────────

  onLeave() {
    this.stopAudioCapture();
    this.subtitleSub?.unsubscribe();
    this.transcriptionService.disconnectSubtitles();

    // Toujours finaliser si on a un projectId (même transcript vide → résumé extractif)
    if (this.projectId) {
      this.isFinalizing = true;
      this.cdr.detectChanges();
      this.finalizingSub = this.transcriptionService.finalizeMeeting(
        this.roomId,
        this.projectId,
        this.fullTranscript || '',
        Array.from(this.speakers)
      ).subscribe({
        next: (aiResult: MeetingAIResult) => {
          this.isFinalizing = false;
          if (aiResult?.summary && aiResult.summary.length > 10) {
            this.meetingReport  = aiResult;
            this.showReportModal = true;
            this.cdr.detectChanges();
          } else {
            this.leave.emit();
          }
        },
        error: () => { this.isFinalizing = false; this.leave.emit(); }
      });
    } else {
      this.leave.emit();
    }
  }

  closeReport() {
    this.showReportModal = false;
    this.meetingReport = null;
    this.leave.emit();
  }
}
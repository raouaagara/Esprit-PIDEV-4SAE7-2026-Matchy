import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy,
  ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef, NgZone
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../core/services/chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { MeetingService } from '../../../core/services/meeting.service';
import { Project, ChatMessage, MessageReaction, ProjectParticipant, MeetingJoinResponse, ScheduledMessage, RecurrenceType } from '../../../shared/models/models';
import { VideoRoomComponent } from '../../../shared/components/video-room/video-room.component';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, NgStyle, FormsModule, VideoRoomComponent],
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() project!: Project;
  @Output() close = new EventEmitter<void>();
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;
  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('videoLiveEl') videoLiveEl?: ElementRef<HTMLVideoElement>;
  @ViewChild('videoReviewEl') videoReviewEl?: ElementRef<HTMLVideoElement>;

  messages: ChatMessage[] = [];
  newMessage = '';
  loading = false;
  sending = false;
  uploading = false;
  uploadProgress = 0;
  pendingFile: File | null = null;

  showEmojiPicker = false;
  showMentionDropdown = false;
  mentionSuggestions: ProjectParticipant[] = [];
  allParticipants: ProjectParticipant[] = [];
  mentionQuery = '';
  private shouldScroll = false;
  private wsSub?: Subscription;

  // Translate-before-send state
  translateBeforeSend = false;
  sendTargetLang = 'en';
  isTranslatingBeforeSend = false;

  // Voice recording state
  isRecording = false;
  recordingSeconds = 0;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingTimer: any = null;
  private recordingStream: MediaStream | null = null;
  private commitRecording = true;

  // Video recording state
  videoPhase: 'idle' | 'preview' | 'countdown' | 'recording' | 'review' = 'idle';
  videoFacingMode: 'user' | 'environment' = 'user';
  videoQuality: '480p' | '720p' | '1080p' = '720p';
  videoIsPaused = false;
  videoCountdown: number | string = 3;
  videoCaption = '';
  audioBars: number[] = new Array(16).fill(4);
  private videoStream: MediaStream | null = null;
  private videoRecorder: MediaRecorder | null = null;
  private videoChunks: Blob[] = [];
  videoPreviewUrl: string | null = null;
  videoRecordingSeconds = 0;
  private videoTimer: any = null;
  private audioCtx: AudioContext | null = null;
  private audioAnalyser: AnalyserNode | null = null;
  private audioAnimFrame: number | null = null;
  private videoCountdownTimers: any[] = [];

  // STT (Speech-to-Text during voice recording)
  sttTranscript = '';
  sttInterim = '';
  pendingAudioFile: File | null = null;
  showSttChoice = false;
  private sttRecognizer: any = null;
  get sttAvailable(): boolean {
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
  }

  // Shared panel tabs & lightbox
  activeSharedTab: 'IMAGES' | 'FILES' | 'LINKS' = 'IMAGES';
  lightboxItem: ChatMessage | null = null;

  get sharedImages(): ChatMessage[] { return this.sharedContent.filter(m => m.messageType === 'IMAGE' || (!!m.fileType && m.fileType.startsWith('image/'))); }
  get sharedFiles(): ChatMessage[] { return this.sharedContent.filter(m => m.messageType === 'FILE' || (m.fileUrl && !this.sharedImages.includes(m) && !this.sharedLinks.includes(m))); }
  get sharedLinks(): ChatMessage[] { return this.sharedContent.filter(m => !m.fileUrl && m.content?.match(/https?:\/\//)); }

  // Scheduled countdown
  scheduledNow = new Date();
  private scheduledNowInterval: any = null;

  // Message scheduling state
  showSchedulePanel = false;
  showScheduledMsgList = false;
  scheduleMsgDate = '';
  scheduleMsgTime = '';
  recurrenceType: RecurrenceType = 'ONCE';
  recurrenceDays: string[] = [];
  editingScheduledId: number | null = null;
  scheduledMessages: ScheduledMessage[] = [];

  // Voice message playback
  private audioMap = new Map<number, HTMLAudioElement>();
  playingAudioId: number | null = null;
  audioProgress = new Map<number, number>();
  audioCurrentTime = new Map<number, number>();
  audioDuration = new Map<number, number>();
  private audioProgressInterval: any = null;

  // Notification sound / TTS
  availableVoices: SpeechSynthesisVoice[] = [];
  pendingSound: (() => void) | null = null;
  notifToast: { message: string; type: 'success' | 'warning' | 'error' } | null = null;
  private notifSub?: Subscription;
  private ttsKeyHandler: ((e: KeyboardEvent) => void) | null = null;
  private ttsKeyTimeout: any = null;
  private docClickListener?: () => void;

  get notificationsMuted(): boolean {
    const id = this.authService.currentUser?.id;
    return id ? localStorage.getItem(`chat_notifications_muted_${id}`) === 'true' : false;
  }

  toggleMuteNotifications() {
    const id = this.authService.currentUser?.id;
    if (!id) return;
    const key = `chat_notifications_muted_${id}`;
    localStorage.setItem(key, String(localStorage.getItem(key) !== 'true'));
  }

  // Pin / Shared panels
  showPinnedPanel = false;
  showSharedPanel = false;
  pinnedMessages: ChatMessage[] = [];
  sharedContent: ChatMessage[] = [];

  // @mention keyboard nav
  mentionSelectedIndex = 0;

  // Per-message actions
  hoveredMessageId: number | null = null;
  reactionPickerMsgId: number | null = null;
  editingMessageId: number | null = null;
  editMessageContent = '';
  reactionEmojis = ['👍','❤️','😂','😮','😢','🔥','✅','🎉','🙏','💯'];

  // Dark / Light mode
  isDarkMode = localStorage.getItem('chat_dark_mode') !== 'false';
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('chat_dark_mode', String(this.isDarkMode));
  }

  // Typing indicator
  typingUsers = new Map<string, any>(); // userName → clearTimeout handle
  private typingSub?: Subscription;
  private typingDebounce: any = null;

  typingUserNames(): string[] { return Array.from(this.typingUsers.keys()); }

  get typingText(): string {
    const names = this.typingUserNames();
    if (names.length === 0) return '';
    if (names.length === 1) return `${names[0]} est en train d'écrire`;
    return `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]} écrivent`;
  }

  // Online users
  onlineUsers = new Set<string>(); // userNames online
  private presenceSub?: Subscription;

  // Meeting state
  showMeetingMenu = false;
  showScheduleForm = false;
  scheduleSubject = '';
  scheduleDate = '';
  scheduleTime = '';
  isCreatingMeeting = false;
  activeVideo: MeetingJoinResponse | null = null;
  activeVideoRoomId = '';  // used by organizer to call end()

  get availableLangs() { return this.translationService.availableLangs; }
  get isOrganizer() { return this.authService.currentUser?.id === this.project?.organizerId; }

  get inputPlaceholder(): string {
    if (!this.translateBeforeSend) return 'Votre message... (@nom pour mentionner)';
    return `Écrivez votre message... (sera traduit en ${this.translationService.getLangName(this.sendTargetLang)} avant envoi)`;
  }

  emojis = [
    '😊','😂','❤️','👍','🔥','✅','👋','🎉','😍','🤔',
    '😎','💯','🙏','💪','🚀','⭐','💡','📎','🎯','✨',
    '😅','🤝','👀','💬','📌','🔔','⚡','🎨','📁','🖼️'
  ];

  constructor(
    private chatService: ChatService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    public translationService: TranslationService,
    private meetingService: MeetingService
  ) {}

  ngOnInit() {
    this.loadMessages();
    this.loadParticipants();
    this.wsSub = this.chatService.connectToProject(this.project.id).subscribe(msg => {
      if (msg.deleted) {
        this.messages = this.messages.filter(m => m.id !== msg.id);
        this.pinnedMessages = this.pinnedMessages.filter(m => m.id !== msg.id);
        return;
      }
      const idx = this.messages.findIndex(m => m.id === msg.id);
      if (idx >= 0) {
        this.messages = [...this.messages.slice(0, idx), msg, ...this.messages.slice(idx + 1)];
        this.pinnedMessages = this.pinnedMessages.map(m => m.id === msg.id ? msg : m)
            .filter(m => m.pinned);
      } else {
        this.messages = [...this.messages, msg];
        this.shouldScroll = true;
      }
    });
    this.chatService.markRead(this.project.id).subscribe();

    // Load TTS voices (async in some browsers)
    if ('speechSynthesis' in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.availableVoices = window.speechSynthesis.getVoices();
      };
    }

    // Subscribe to personal WebSocket notifications (SCHEDULED_SENT / REMINDER / FAILED)
    const userId = this.authService.currentUser?.id;
    if (userId) {
      this.notifSub = this.chatService.subscribeToUserNotifications(userId)
        .subscribe(event => this.handleNotificationEvent(event));
    }

    // Typing indicator subscription
    this.typingSub = this.chatService.subscribeToTyping(this.project.id).subscribe(event => {
      const myName = this.authService.currentUser?.name || '';
      if (event.userName === myName) return; // ignore own typing
      const existing = this.typingUsers.get(event.userName);
      if (existing) clearTimeout(existing);
      const handle = setTimeout(() => { this.typingUsers.delete(event.userName); this.cdr.markForCheck(); }, 3000);
      this.typingUsers.set(event.userName, handle);
      this.cdr.markForCheck();
    });

    // Presence subscription
    this.presenceSub = this.chatService.subscribeToPresence(this.project.id).subscribe(event => {
      if (event.online) this.onlineUsers.add(event.userName);
      else this.onlineUsers.delete(event.userName);
      this.cdr.markForCheck();
    });

    // Announce own presence
    setTimeout(() => {
      this.chatService.sendPresence(this.project.id, true).subscribe({ error: () => {} });
    }, 1000);

    // Refresh countdown clock every 60 s
    this.scheduledNowInterval = setInterval(() => { this.scheduledNow = new Date(); this.cdr.markForCheck(); }, 60_000);

    // Unlock suspended AudioContext on first user click
    this.docClickListener = () => {
      if (this.pendingSound) { this.pendingSound(); this.pendingSound = null; }
    };
    document.addEventListener('click', this.docClickListener, { once: false });
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.notifSub?.unsubscribe();
    this.typingSub?.unsubscribe();
    this.presenceSub?.unsubscribe();
    this.typingUsers.forEach(h => clearTimeout(h));
    this.typingUsers.clear();
    this.chatService.sendPresence(this.project.id, false).subscribe({ error: () => {} });
    this.chatService.disconnectFromProject(this.project.id);
    if (this.isRecording) this.cancelVoiceRecording();
    if (this.docClickListener) document.removeEventListener('click', this.docClickListener);
    if (this.ttsKeyHandler) { document.removeEventListener('keydown', this.ttsKeyHandler); this.ttsKeyHandler = null; }
    if (this.ttsKeyTimeout) clearTimeout(this.ttsKeyTimeout);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    this.stopAudioProgress();
    this.audioMap.forEach(a => { a.pause(); a.src = ''; });
    this.audioMap.clear();
    this.closeVideoRecorder();
    this.stopSTT();
    if (this.scheduledNowInterval) clearInterval(this.scheduledNowInterval);
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) { this.scrollToBottom(); this.shouldScroll = false; }
  }

  loadMessages() {
    this.loading = true;
    this.chatService.getMessages(this.project.id).subscribe({
      next: (msgs) => { this.messages = msgs; this.loading = false; this.shouldScroll = true; },
      error: () => { this.loading = false; }
    });
  }

  loadParticipants() {
    this.chatService.getParticipants(this.project.id).subscribe({
      next: (p) => { this.allParticipants = p; },
      error: () => {}
    });
  }

  // ── Send with optional pre-translation ──────────────────────────────────────

  send() {
    const content = this.newMessage.trim();
    if ((!content && !this.pendingFile) || this.sending) return;
    this.showEmojiPicker = false;

    if (this.translateBeforeSend && content) {
      this.isTranslatingBeforeSend = true;
      this.translationService.translate(content, 'auto', this.sendTargetLang).subscribe({
        next: (res) => {
          this.isTranslatingBeforeSend = false;
          const sameLang = res.detectedLanguage === this.sendTargetLang;
          this.doSend(
            sameLang ? content : res.translatedText,
            sameLang ? undefined : content,
            sameLang ? undefined : res.detectedLanguage
          );
        },
        error: () => { this.isTranslatingBeforeSend = false; this.doSend(content); }
      });
    } else {
      this.doSend(content);
    }
  }

  doSend(content: string, originalContent?: string, detectedLanguage?: string) {
    this.sending = true;
    const backup = this.newMessage;
    this.newMessage = '';
    this.adjustTextarea();
    this.chatService.sendMessage(this.project.id, content, originalContent, detectedLanguage).subscribe({
      next: () => { this.sending = false; },
      error: () => { this.sending = false; this.newMessage = backup; }
    });
  }

  // ── On-demand translation of received messages ───────────────────────────────

  openLangPicker(msg: ChatMessage) {
    msg.showLangPicker = true;
  }

  translateMessage(msg: ChatMessage, targetLang: string) {
    if (msg.isTranslating) return;
    msg.showLangPicker = false;
    msg.isTranslating = true;
    msg.translatedContent = undefined;

    this.translationService.translate(msg.content, 'auto', targetLang).subscribe({
      next: (res) => {
        msg.translatedContent = res.translatedText;
        msg.translatedFromLang = res.detectedLanguage;
        msg.translatedToLang = targetLang;
        msg.showOriginal = false;
        msg.isTranslating = false;
        this.cdr.markForCheck();
      },
      error: () => { msg.isTranslating = false; msg.showLangPicker = true; }
    });
  }

  retranslate(msg: ChatMessage) {
    msg.translatedContent = undefined;
    msg.translatedFromLang = undefined;
    msg.translatedToLang = undefined;
    msg.showOriginal = false;
    msg.showLangPicker = true;
  }

  closeTranslation(msg: ChatMessage) {
    msg.translatedContent = undefined;
    msg.translatedFromLang = undefined;
    msg.translatedToLang = undefined;
    msg.showOriginal = false;
    msg.showLangPicker = false;
  }

  toggleShowOriginal(msg: ChatMessage) {
    msg.showOriginal = !msg.showOriginal;
  }

  // For sender's own pre-translated messages: toggle original ↔ translated
  getSenderDisplayContent(msg: ChatMessage): string {
    return (msg.showOriginal && msg.originalContent) ? msg.originalContent : msg.content;
  }

  // ── Meeting ──────────────────────────────────────────────────────────────────

  startInstantMeeting() {
    this.showMeetingMenu = false;
    this.isCreatingMeeting = true;
    this.meetingService.startInstant(this.project.id).subscribe({
      next: (m) => {
        this.isCreatingMeeting = false;
        this.activeVideoRoomId = m.roomId;
        this.activeVideo = { meetingId: m.id, roomId: m.roomId, subject: m.subject, token: m.token!, appId: m.appId };
      },
      error: (e) => { this.isCreatingMeeting = false; alert(e.error || 'Erreur lors du démarrage.'); }
    });
  }

  openScheduleForm() {
    this.showMeetingMenu = false;
    this.showScheduleForm = true;
    this.scheduleSubject = '';
    this.scheduleDate = '';
    this.scheduleTime = '';
  }

  submitSchedule() {
    if (!this.scheduleDate || !this.scheduleTime) return;
    this.isCreatingMeeting = true;
    const scheduledAt = `${this.scheduleDate}T${this.scheduleTime}:00`;
    this.meetingService.schedule(this.project.id, this.scheduleSubject || 'Réunion planifiée', scheduledAt).subscribe({
      next: () => { this.isCreatingMeeting = false; this.showScheduleForm = false; },
      error: (e) => { this.isCreatingMeeting = false; alert(e.error || 'Erreur lors de la planification.'); }
    });
  }

  createPermanentLink() {
    this.showMeetingMenu = false;
    this.isCreatingMeeting = true;
    this.meetingService.createLink(this.project.id).subscribe({
      next: (m) => {
        this.isCreatingMeeting = false;
        const url = `${window.location.origin}/meet/${m.roomId}`;
        navigator.clipboard.writeText(url).catch(() => {});
        alert(`Lien créé et copié :\n${url}`);
      },
      error: (e) => { this.isCreatingMeeting = false; alert(e.error || 'Erreur lors de la création.'); }
    });
  }

  joinMeeting(roomId: string) {
    this.meetingService.join(roomId).subscribe({
      next: (data) => {
        this.activeVideoRoomId = roomId;
        this.activeVideo = data;
      },
      error: (e) => { alert(e.error || 'Impossible de rejoindre la réunion.'); }
    });
  }

  onVideoLeave() {
    if (this.isOrganizer && this.activeVideoRoomId) {
      this.meetingService.end(this.activeVideoRoomId).subscribe({ error: () => {} });
    }
    this.activeVideo = null;
    this.activeVideoRoomId = '';
  }

  parseMeetingData(content: string): any {
    try { return JSON.parse(content); } catch { return {}; }
  }

  // ── File upload ──────────────────────────────────────────────────────────────

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploading = true;
    this.uploadProgress = 0;
    const interval = setInterval(() => { if (this.uploadProgress < 85) this.uploadProgress += 15; }, 200);
    this.chatService.uploadFile(file).subscribe({
      next: (res) => {
        clearInterval(interval);
        this.uploadProgress = 100;
        const isImage = res.resourceType === 'image' || file.type.startsWith('image/');
        this.chatService.sendFileMessage(this.project.id, res.url, res.originalName, file.type, isImage).subscribe({
          next: () => { this.uploading = false; this.uploadProgress = 0; },
          error: () => { this.uploading = false; }
        });
        input.value = '';
      },
      error: () => { clearInterval(interval); this.uploading = false; alert('Erreur upload.'); input.value = ''; }
    });
  }

  // ── Keyboard & input ─────────────────────────────────────────────────────────

  onKeydown(event: KeyboardEvent) {
    if (this.showMentionDropdown && this.mentionSuggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.mentionSelectedIndex = Math.min(this.mentionSelectedIndex + 1, this.mentionSuggestions.length - 1);
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.mentionSelectedIndex = Math.max(this.mentionSelectedIndex - 1, 0);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        this.insertMention(this.mentionSuggestions[this.mentionSelectedIndex].name);
        return;
      }
      if (event.key === 'Escape') { this.showMentionDropdown = false; return; }
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
    if (event.key === 'Escape') { this.showEmojiPicker = false; }
  }

  onInput(event: Event) {
    this.adjustTextarea();
    // Send typing event (debounced — at most once every 2s)
    if (!this.typingDebounce) {
      this.chatService.sendTyping(this.project.id).subscribe({ error: () => {} });
      this.typingDebounce = setTimeout(() => { this.typingDebounce = null; }, 2000);
    }
    const ta = event.target as HTMLTextAreaElement;
    const textBeforeCursor = ta.value.substring(0, ta.selectionStart);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      this.mentionQuery = mentionMatch[1].toLowerCase();
      this.mentionSuggestions = this.allParticipants.filter(p =>
        p.name.toLowerCase().includes(this.mentionQuery) && p.id !== this.authService.currentUser?.id);
      this.showMentionDropdown = this.mentionSuggestions.length > 0;
      this.mentionSelectedIndex = 0;
    } else { this.showMentionDropdown = false; }
  }

  insertMention(name: string) {
    const ta = this.textArea.nativeElement;
    const before = ta.value.substring(0, ta.selectionStart).replace(/@\w*$/, `@${name} `);
    const after = ta.value.substring(ta.selectionStart);
    this.newMessage = before + after;
    this.showMentionDropdown = false;
    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = before.length; });
  }

  insertEmoji(emoji: string) {
    const ta = this.textArea?.nativeElement;
    if (ta) {
      const s = ta.selectionStart, e = ta.selectionEnd;
      this.newMessage = this.newMessage.substring(0, s) + emoji + this.newMessage.substring(e);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + emoji.length; ta.focus(); });
    } else { this.newMessage += emoji; }
  }

  toggleEmojiPicker() { this.showEmojiPicker = !this.showEmojiPicker; this.showMentionDropdown = false; }

  // ── Voice recording ──────────────────────────────────────────────────────────

  async startVoiceRecording() {
    if (this.isRecording || this.uploading) return;
    try {
      this.recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
                     : MediaRecorder.isTypeSupported('audio/webm')             ? 'audio/webm'
                     : '';
      this.mediaRecorder = new MediaRecorder(this.recordingStream, mimeType ? { mimeType } : {});
      this.audioChunks = [];
      this.commitRecording = true;

      this.mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };
      this.mediaRecorder.onstop = () => {
        if (this.commitRecording) this.processRecording();
        else this.audioChunks = [];
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingSeconds = 0;
      this.sttTranscript = '';
      this.sttInterim = '';
      this.recordingTimer = setInterval(() => { this.recordingSeconds++; this.cdr.markForCheck(); }, 1000);
      if (this.sttAvailable) this.startSTT();
    } catch {
      alert('Accès au microphone refusé. Vérifiez les permissions du navigateur.');
    }
  }

  stopVoiceRecording() {
    this.commitRecording = true;
    this.stopSTT();
    this.endRecording();
  }

  cancelVoiceRecording() {
    this.commitRecording = false;
    this.stopSTT();
    this.sttTranscript = '';
    this.sttInterim = '';
    this.endRecording();
  }

  private endRecording() {
    clearInterval(this.recordingTimer);
    this.isRecording = false;
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') this.mediaRecorder.stop();
    this.recordingStream?.getTracks().forEach(t => t.stop());
    this.recordingStream = null;
  }

  private processRecording() {
    if (this.audioChunks.length === 0) return;
    const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
    const ext = mimeType.includes('ogg') ? 'ogg' : 'webm';
    const blob = new Blob(this.audioChunks, { type: mimeType });
    const file = new File([blob], `vocal_${Date.now()}.${ext}`, { type: mimeType });
    this.audioChunks = [];

    if (this.sttAvailable && this.sttTranscript.trim()) {
      this.pendingAudioFile = file;
      this.showSttChoice = true;
      this.cdr.markForCheck();
    } else {
      this._uploadVoiceFile(file);
    }
  }

  sendVoiceAsAudio() {
    const file = this.pendingAudioFile;
    this.showSttChoice = false;
    this.pendingAudioFile = null;
    this.sttTranscript = '';
    if (file) this._uploadVoiceFile(file);
  }

  sendVoiceAsText() {
    const text = this.sttTranscript.trim();
    this.showSttChoice = false;
    this.pendingAudioFile = null;
    this.sttTranscript = '';
    if (text) this.doSend(text);
  }

  dismissSttChoice() {
    this.showSttChoice = false;
    this.pendingAudioFile = null;
    this.sttTranscript = '';
  }

  private _uploadVoiceFile(file: File) {
    this.uploading = true;
    this.uploadProgress = 0;
    const iv = setInterval(() => { if (this.uploadProgress < 90) this.uploadProgress += 10; }, 200);
    this.chatService.uploadFile(file).subscribe({
      next: (res) => {
        clearInterval(iv);
        this.uploadProgress = 100;
        this.chatService.sendVoiceMessage(this.project.id, res.url, res.originalName, file.type).subscribe({
          next: () => { this.uploading = false; this.uploadProgress = 0; },
          error: () => { this.uploading = false; }
        });
      },
      error: () => { clearInterval(iv); this.uploading = false; alert('Erreur lors de l\'envoi audio.'); }
    });
  }

  formatRecordingTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  // ── Message scheduling ───────────────────────────────────────────────────────

  get today(): string { return new Date().toISOString().split('T')[0]; }

  toggleSchedulePanel() {
    this.showSchedulePanel = !this.showSchedulePanel;
    this.showEmojiPicker = false;
    this.showMeetingMenu = false;
    if (this.showSchedulePanel) {
      this.resetScheduleForm();
      this.loadScheduledMessages();
    }
  }

  closeSchedulePanel() {
    this.showSchedulePanel = false;
    this.showScheduledMsgList = false;
    this.editingScheduledId = null;
  }

  private resetScheduleForm() {
    if (!this.scheduleMsgDate) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      this.scheduleMsgDate = d.toISOString().split('T')[0];
      this.scheduleMsgTime = '09:00';
    }
    this.recurrenceType = 'ONCE';
    this.recurrenceDays = [];
  }

  loadScheduledMessages() {
    this.chatService.getScheduledMessages(this.project.id).subscribe({
      next: (msgs) => { this.scheduledMessages = msgs; },
      error: () => {}
    });
  }

  submitScheduledMessage() {
    const content = this.newMessage.trim();
    if (!content || !this.scheduleMsgDate || !this.scheduleMsgTime || this.sending) return;
    const scheduledAt = `${this.scheduleMsgDate}T${this.scheduleMsgTime}:00`;
    this.sending = true;

    const call$ = this.editingScheduledId
      ? this.chatService.editScheduledMessage(
          this.project.id, this.editingScheduledId, content,
          scheduledAt, this.recurrenceType, this.recurrenceDays)
      : this.chatService.createScheduledMessage(
          this.project.id, content, scheduledAt,
          this.recurrenceType, this.recurrenceDays);

    call$.subscribe({
      next: (sm) => {
        if (this.editingScheduledId) {
          this.scheduledMessages = this.scheduledMessages.map(m => m.id === sm.id ? sm : m);
        } else {
          this.scheduledMessages = [...this.scheduledMessages, sm];
        }
        this.newMessage = '';
        this.adjustTextarea();
        this.editingScheduledId = null;
        this.resetScheduleForm();
        this.sending = false;
      },
      error: () => { this.sending = false; }
    });
  }

  startEditScheduledMsg(sm: ScheduledMessage) {
    this.showScheduledMsgList = false;
    this.editingScheduledId = sm.id;
    this.newMessage = sm.content;
    const dt = new Date(sm.nextSendAt);
    this.scheduleMsgDate = dt.toISOString().split('T')[0];
    this.scheduleMsgTime = dt.toTimeString().slice(0, 5);
    this.recurrenceType = sm.recurrenceType;
    this.recurrenceDays = sm.recurrenceDays ? [...sm.recurrenceDays] : [];
  }

  cancelScheduledMsg(id: number) {
    this.chatService.cancelScheduledMessage(this.project.id, id).subscribe({
      next: () => { this.scheduledMessages = this.scheduledMessages.filter(m => m.id !== id); },
      error: () => {}
    });
  }

  toggleDay(day: string) {
    const idx = this.recurrenceDays.indexOf(day);
    if (idx >= 0) this.recurrenceDays = this.recurrenceDays.filter(d => d !== day);
    else this.recurrenceDays = [...this.recurrenceDays, day];
  }

  isRecurrenceDay(day: string): boolean {
    return this.recurrenceDays.includes(day);
  }

  getRecurrenceLabel(type: RecurrenceType): string {
    const labels: Record<RecurrenceType, string> = {
      ONCE: 'Une fois', DAILY: 'Quotidien', WEEKLY: 'Hebdomadaire',
      WEEKDAYS: 'Jours ouvrés', CUSTOM: 'Personnalisé'
    };
    return labels[type] ?? type;
  }

  getDayLabel(day: string): string {
    const labels: Record<string, string> = {
      MONDAY: 'Lun', TUESDAY: 'Mar', WEDNESDAY: 'Mer',
      THURSDAY: 'Jeu', FRIDAY: 'Ven', SATURDAY: 'Sam', SUNDAY: 'Dim'
    };
    return labels[day] ?? day;
  }

  formatScheduledAt(dateStr: string): string {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
           + ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  }

  // ── Notification sound / TTS ─────────────────────────────────────────────────

  private handleNotificationEvent(event: any): void {
    const typeMap: Record<string, { label: string; type: 'success'|'warning'|'error' }> = {
      SCHEDULED_SENT:     { label: `✅ Message envoyé — ${event.projectTitle || ''}`, type: 'success' },
      SCHEDULED_REMINDER: { label: `⏰ Envoi dans 15 min — ${event.projectTitle || ''}`, type: 'warning' },
      SCHEDULED_FAILED:   { label: `❌ Échec d'envoi — ${event.projectTitle || ''}`, type: 'error' },
      NEW_MESSAGE:        { label: `💬 Nouveau message — ${event.projectTitle || ''}`, type: 'success' },
      MENTION:            { label: `🔔 Vous avez été mentionné — ${event.projectTitle || ''}`, type: 'warning' },
      MEETING_STARTED:    { label: `📹 Réunion démarrée — ${event.projectTitle || ''}`, type: 'success' },
      MEETING_SCHEDULED:  { label: `📅 Réunion planifiée — ${event.projectTitle || ''}`, type: 'success' },
      MEETING_REMINDER:   { label: `⏰ Rappel réunion — ${event.projectTitle || ''}`, type: 'warning' },
      PURCHASE_REQUEST:   { label: `🛒 Nouvelle demande d'achat — ${event.projectTitle || ''}`, type: 'warning' },
      PURCHASE_ACCEPTED:  { label: `✅ Demande acceptée — ${event.projectTitle || ''}`, type: 'success' },
      PURCHASE_REJECTED:  { label: `❌ Demande refusée — ${event.projectTitle || ''}`, type: 'error' },
    };
    const info = typeMap[event.type];
    if (!info) return;
    this.showNotifToast(info.label, info.type);
    this.announceNotificationTTS(event);
  }

  private showNotifToast(message: string, type: 'success'|'warning'|'error') {
    this.notifToast = { message, type };
    setTimeout(() => { this.notifToast = null; this.cdr.markForCheck(); }, 5000);
    this.cdr.markForCheck();
  }

  private announceNotificationTTS(event: any): void {
    const id = this.authService.currentUser?.id;
    if (!id) return;
    if (localStorage.getItem(`chat_notifications_muted_${id}`) === 'true') return;

    if (!('speechSynthesis' in window)) {
      this.playFallbackBeep(event.type);
      return;
    }

    window.speechSynthesis.cancel();
    if (this.ttsKeyHandler) { document.removeEventListener('keydown', this.ttsKeyHandler); this.ttsKeyHandler = null; }
    if (this.ttsKeyTimeout) { clearTimeout(this.ttsKeyTimeout); this.ttsKeyTimeout = null; }

    const makeU = (text: string): SpeechSynthesisUtterance => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.1; u.pitch = 1.0; u.volume = 0.8; u.lang = 'fr-FR';
      const pref = this.availableVoices.find(v =>
        v.lang.startsWith('fr') || v.name.includes('Google') || v.name.includes('Samantha'));
      if (pref) u.voice = pref;
      return u;
    };

    const short = this.getTTSShortText(event.type, event.projectTitle || '', event.messagePreview || '');
    const full  = this.getTTSFullText(event.type, event.projectTitle || '', event.messagePreview || '');

    const ann = makeU(short);
    ann.onend = () => {
      const prompt = makeU('Appuyez sur R pour entendre la notification complète');
      prompt.onend = () => {
        this.ttsKeyHandler = (e: KeyboardEvent) => {
          if (e.key !== 'r' && e.key !== 'R') return;
          if (this.ttsKeyHandler) { document.removeEventListener('keydown', this.ttsKeyHandler); this.ttsKeyHandler = null; }
          if (this.ttsKeyTimeout) { clearTimeout(this.ttsKeyTimeout); this.ttsKeyTimeout = null; }
          window.speechSynthesis.speak(makeU(full));
        };
        document.addEventListener('keydown', this.ttsKeyHandler);
        this.ttsKeyTimeout = setTimeout(() => {
          if (this.ttsKeyHandler) { document.removeEventListener('keydown', this.ttsKeyHandler); this.ttsKeyHandler = null; }
          this.ttsKeyTimeout = null;
        }, 5000);
      };
      window.speechSynthesis.speak(prompt);
    };
    window.speechSynthesis.speak(ann);
  }

  private getTTSShortText(type: string, project: string, preview: string): string {
    const map: Record<string, string> = {
      SCHEDULED_SENT:     `Votre message programmé a été envoyé dans ${project}`,
      SCHEDULED_REMINDER: `Rappel : votre message sera envoyé dans 15 minutes dans ${project}`,
      SCHEDULED_FAILED:   `Erreur : votre message programmé a échoué dans ${project}`,
      NEW_MESSAGE:        `Nouveau message dans ${project}`,
      MENTION:            `Vous avez été mentionné dans ${project}`,
      MEETING_STARTED:    `Une réunion a démarré dans ${project}`,
      MEETING_SCHEDULED:  `Une réunion a été planifiée dans ${project}`,
      MEETING_REMINDER:   `Rappel : réunion bientôt dans ${project}`,
      PURCHASE_REQUEST:   `Nouvelle demande d'achat dans ${project}`,
      PURCHASE_ACCEPTED:  `Votre demande d'achat a été acceptée dans ${project}`,
      PURCHASE_REJECTED:  `Votre demande d'achat a été refusée dans ${project}`,
    };
    return map[type] ?? `Nouvelle notification dans ${project}`;
  }

  private getTTSFullText(type: string, project: string, preview: string): string {
    const p = preview.slice(0, 80);
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const map: Record<string, string> = {
      SCHEDULED_SENT:     `Votre message "${p}" a été envoyé dans ${project} à ${time}`,
      SCHEDULED_REMINDER: `Rappel : votre message "${p}" sera envoyé dans ${project} dans 15 minutes`,
      SCHEDULED_FAILED:   `Votre message programmé "${p}" dans ${project} n'a pas pu être envoyé`,
      NEW_MESSAGE:        `${p} — reçu dans ${project} à ${time}`,
      MENTION:            `Vous avez été mentionné dans ${project} : "${p}"`,
      MEETING_STARTED:    `Une réunion a démarré dans ${project}. Rejoignez maintenant.`,
      MEETING_SCHEDULED:  `Une réunion a été planifiée dans ${project} : "${p}"`,
      MEETING_REMINDER:   `Rappel : votre réunion "${p}" dans ${project} commence bientôt`,
      PURCHASE_REQUEST:   `Nouvelle demande d'achat dans ${project} : "${p}"`,
      PURCHASE_ACCEPTED:  `Bonne nouvelle ! Votre demande d'achat "${p}" dans ${project} a été acceptée`,
      PURCHASE_REJECTED:  `Votre demande d'achat "${p}" dans ${project} a été refusée`,
    };
    return map[type] ?? `Notification dans ${project} à ${time} : "${p}"`;
  }

  private playFallbackBeep(type: string): void {
    const playBeep = (freq: number) => {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } catch { /* ignore */ }
    };
    const freq = type === 'SCHEDULED_REMINDER' ? 1100 : 880;
    const doPlay = () => {
      playBeep(freq);
      if (type === 'SCHEDULED_FAILED') setTimeout(() => playBeep(freq), 300);
    };
    try {
      const testCtx = new AudioContext();
      const suspended = testCtx.state === 'suspended';
      testCtx.close();
      if (!suspended) { doPlay(); } else { this.pendingSound = doPlay; }
    } catch { doPlay(); }
  }

  // ── Pinned messages ──────────────────────────────────────────────────────────

  togglePinnedPanel() {
    this.showPinnedPanel = !this.showPinnedPanel;
    this.showSharedPanel = false;
    if (this.showPinnedPanel) this.loadPinnedMessages();
  }

  loadPinnedMessages() {
    this.chatService.getPinnedMessages(this.project.id).subscribe({
      next: (msgs) => { this.pinnedMessages = msgs; },
      error: () => {}
    });
  }

  pinMessage(msg: ChatMessage) {
    this.chatService.pinMessage(this.project.id, msg.id).subscribe({ error: () => {} });
  }

  unpinMessage(msg: ChatMessage) {
    this.chatService.unpinMessage(this.project.id, msg.id).subscribe({ error: () => {} });
  }

  // ── Shared content ───────────────────────────────────────────────────────────

  toggleSharedPanel() {
    this.showSharedPanel = !this.showSharedPanel;
    this.showPinnedPanel = false;
    if (this.showSharedPanel) {
      this.activeSharedTab = 'IMAGES';
      this.lightboxItem = null;
      this.chatService.getSharedContent(this.project.id).subscribe({
        next: (items) => { this.sharedContent = items; },
        error: () => {}
      });
    }
  }

  isSharedImage(msg: ChatMessage): boolean {
    return msg.messageType === 'IMAGE' || (!!msg.fileType && msg.fileType.startsWith('image/'));
  }

  sharedCategory(msg: ChatMessage): 'IMAGE' | 'FILE' | 'LINK' {
    if (msg.fileUrl) return this.isSharedImage(msg) ? 'IMAGE' : 'FILE';
    return 'LINK';
  }

  extractUrl(content: string): string {
    const match = content?.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : '';
  }

  // ── Edit message ─────────────────────────────────────────────────────────────

  startEditMessage(msg: ChatMessage) {
    this.editingMessageId = msg.id;
    this.editMessageContent = msg.content || '';
    this.hoveredMessageId = null;
    this.reactionPickerMsgId = null;
  }

  cancelEditMessage() {
    this.editingMessageId = null;
    this.editMessageContent = '';
  }

  saveEditMessage(msg: ChatMessage) {
    const content = this.editMessageContent.trim();
    if (!content) return;
    this.chatService.editMessage(this.project.id, msg.id, content).subscribe({
      next: () => { this.editingMessageId = null; this.editMessageContent = ''; },
      error: () => {}
    });
  }

  // ── Delete message ───────────────────────────────────────────────────────────

  deleteMessage(msg: ChatMessage) {
    if (!confirm('Supprimer ce message ?')) return;
    this.chatService.deleteMessage(this.project.id, msg.id).subscribe({ error: () => {} });
  }

  // ── Reactions ────────────────────────────────────────────────────────────────

  toggleReactionPicker(msgId: number) {
    this.reactionPickerMsgId = this.reactionPickerMsgId === msgId ? null : msgId;
    this.hoveredMessageId = msgId;
  }

  sendReaction(msg: ChatMessage, emoji: string) {
    this.reactionPickerMsgId = null;
    this.chatService.toggleReaction(this.project.id, msg.id, emoji).subscribe({ error: () => {} });
  }

  getGroupedReactions(msg: ChatMessage): { emoji: string; count: number; users: string[] }[] {
    const map = new Map<string, { count: number; users: string[] }>();
    (msg.reactions || []).forEach(r => {
      const entry = map.get(r.emoji) || { count: 0, users: [] };
      entry.count++;
      entry.users.push(r.userName);
      map.set(r.emoji, entry);
    });
    return Array.from(map.entries()).map(([emoji, v]) => ({ emoji, ...v }));
  }

  isMyReaction(emoji: string, msg: ChatMessage): boolean {
    return (msg.reactions || []).some(
      r => r.emoji === emoji && r.userId === this.authService.currentUser?.id
    );
  }

  // ── Voice playback ────────────────────────────────────────────────────────────

  private getAudio(msg: ChatMessage): HTMLAudioElement {
    if (!this.audioMap.has(msg.id)) {
      const audio = new Audio();
      // Use the same constraints model as getUserMedia: stream from URL
      audio.src = msg.fileUrl!;
      audio.preload = 'metadata';
      audio.onloadedmetadata = () => {
        this.audioDuration.set(msg.id, audio.duration);
        this.cdr.markForCheck();
      };
      audio.onended = () => {
        this.playingAudioId = null;
        this.audioProgress.set(msg.id, 0);
        this.audioCurrentTime.set(msg.id, 0);
        this.stopAudioProgress();
        this.cdr.markForCheck();
      };
      this.audioMap.set(msg.id, audio);
    }
    return this.audioMap.get(msg.id)!;
  }

  toggleAudio(msg: ChatMessage) {
    const audio = this.getAudio(msg);

    if (this.playingAudioId === msg.id) {
      audio.pause();
      this.playingAudioId = null;
      this.stopAudioProgress();
      return;
    }

    // Pause any currently playing audio
    if (this.playingAudioId !== null) {
      this.audioMap.get(this.playingAudioId)?.pause();
      this.stopAudioProgress();
    }

    this.playingAudioId = msg.id;
    audio.play().catch(() => { this.playingAudioId = null; });
    this.startAudioProgress(msg.id);
  }

  onAudioSeek(msgId: number, event: Event) {
    const pct = +(event.target as HTMLInputElement).value;
    const audio = this.audioMap.get(msgId);
    if (audio && isFinite(audio.duration)) {
      audio.currentTime = (pct / 100) * audio.duration;
      this.audioProgress.set(msgId, pct);
      this.audioCurrentTime.set(msgId, audio.currentTime);
      this.cdr.markForCheck();
    }
  }

  isAudioPlaying(msgId: number): boolean { return this.playingAudioId === msgId; }

  getAudioProgress(msgId: number): number { return this.audioProgress.get(msgId) ?? 0; }

  fmtAudioTime(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  getDisplayTime(msgId: number): string {
    const cur = this.audioCurrentTime.get(msgId) ?? 0;
    const dur = this.audioDuration.get(msgId) ?? 0;
    return cur > 0 ? this.fmtAudioTime(cur) : this.fmtAudioTime(dur);
  }

  private startAudioProgress(msgId: number) {
    this.stopAudioProgress();
    this.audioProgressInterval = setInterval(() => {
      const audio = this.audioMap.get(msgId);
      if (!audio || !isFinite(audio.duration) || audio.duration === 0) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      this.audioProgress.set(msgId, pct);
      this.audioCurrentTime.set(msgId, audio.currentTime);
      this.cdr.markForCheck();
    }, 100);
  }

  private stopAudioProgress() {
    if (this.audioProgressInterval) {
      clearInterval(this.audioProgressInterval);
      this.audioProgressInterval = null;
    }
  }

  // ── Video recording ──────────────────────────────────────────────────────────

  private get _videoConstraints(): MediaStreamConstraints {
    const dim = this.videoQuality === '1080p' ? { w: 1920, h: 1080 } : this.videoQuality === '720p' ? { w: 1280, h: 720 } : { w: 854, h: 480 };
    return { video: { facingMode: this.videoFacingMode, width: { ideal: dim.w }, height: { ideal: dim.h } }, audio: true };
  }

  async openVideoRecorder() {
    if (this.videoPhase !== 'idle' || this.uploading) return;
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this._videoConstraints);
      this.videoPhase = 'preview';
      this.videoCaption = '';
      this.cdr.markForCheck();
      setTimeout(() => { if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream; }, 80);
    } catch {
      alert('Accès à la caméra refusé. Vérifiez les permissions du navigateur.');
    }
  }

  async switchVideoCamera() {
    this.videoFacingMode = this.videoFacingMode === 'user' ? 'environment' : 'user';
    this.videoStream?.getTracks().forEach(t => t.stop());
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this._videoConstraints);
      setTimeout(() => { if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream; }, 80);
    } catch {}
  }

  startVideoCountdown() {
    if (!this.videoStream) return;
    this.videoPhase = 'countdown';
    this.videoCountdownTimers.forEach(t => clearTimeout(t));
    this.videoCountdownTimers = [];
    const steps: (number | string)[] = [3, 2, 1, 'GO'];
    steps.forEach((val, i) => {
      const t = setTimeout(() => {
        this.videoCountdown = val;
        this.cdr.markForCheck();
        if (i === steps.length - 1) {
          const t2 = setTimeout(() => this._startActualVideoRecording(), 600);
          this.videoCountdownTimers.push(t2);
        }
      }, i * 900);
      this.videoCountdownTimers.push(t);
    });
    this.videoCountdown = 3;
  }

  private _startActualVideoRecording() {
    if (!this.videoStream) return;
    this.videoChunks = [];
    this.videoRecordingSeconds = 0;
    this.videoIsPaused = false;
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus'
      : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '';
    this.videoRecorder = new MediaRecorder(this.videoStream, mimeType ? { mimeType } : {});
    this.videoRecorder.ondataavailable = (e: BlobEvent) => { if (e.data.size > 0) this.videoChunks.push(e.data); };
    this.videoRecorder.onstop = () => this._processVideoRecording();
    this.videoRecorder.start();
    this.videoPhase = 'recording';
    this.videoTimer = setInterval(() => {
      if (!this.videoIsPaused) {
        this.videoRecordingSeconds++;
        if (this.videoRecordingSeconds >= 120) this.stopVideoCapture();
      }
      this.cdr.markForCheck();
    }, 1000);
    this._setupAudioAnalyser(this.videoStream);
    this.cdr.markForCheck();
    setTimeout(() => { if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream; }, 80);
  }

  stopVideoCapture() {
    clearInterval(this.videoTimer);
    this._cleanupAudioAnalyser();
    if (this.videoRecorder?.state !== 'inactive') this.videoRecorder?.stop();
  }

  toggleVideoPause() {
    if (!this.videoRecorder) return;
    if (this.videoRecorder.state === 'recording') {
      this.videoRecorder.pause();
      this.videoIsPaused = true;
    } else if (this.videoRecorder.state === 'paused') {
      this.videoRecorder.resume();
      this.videoIsPaused = false;
      this._runAudioLoop();
    }
    this.cdr.markForCheck();
  }

  private _processVideoRecording() {
    const mimeType = this.videoRecorder?.mimeType || 'video/webm';
    const blob = new Blob(this.videoChunks, { type: mimeType });
    if (this.videoPreviewUrl) URL.revokeObjectURL(this.videoPreviewUrl);
    this.videoPreviewUrl = URL.createObjectURL(blob);
    this.videoStream?.getVideoTracks().forEach(t => t.stop());
    this.videoPhase = 'review';
    this.cdr.markForCheck();
    setTimeout(() => { if (this.videoReviewEl?.nativeElement) this.videoReviewEl.nativeElement.src = this.videoPreviewUrl!; }, 80);
  }

  async retakeVideo() {
    this._cleanupAudioAnalyser();
    if (this.videoPreviewUrl) { URL.revokeObjectURL(this.videoPreviewUrl); this.videoPreviewUrl = null; }
    this.videoChunks = [];
    this.videoRecordingSeconds = 0;
    this.videoIsPaused = false;
    this.videoPhase = 'idle';
    this.videoStream?.getTracks().forEach(t => t.stop());
    this.videoStream = null;
    await this.openVideoRecorder();
  }

  sendVideo() {
    if (!this.videoPreviewUrl || this.uploading) return;
    const mimeType = this.videoRecorder?.mimeType || 'video/webm';
    const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
    const blob = new Blob(this.videoChunks, { type: mimeType });
    const file = new File([blob], `video_${Date.now()}.${ext}`, { type: mimeType });
    const caption = this.videoCaption.trim();
    this.closeVideoRecorder();
    this.uploading = true;
    this.uploadProgress = 0;
    const iv = setInterval(() => { if (this.uploadProgress < 90) this.uploadProgress += 8; }, 300);
    this.chatService.uploadFile(file).subscribe({
      next: (res) => {
        clearInterval(iv);
        this.uploadProgress = 100;
        this.chatService.sendVideoMessage(this.project.id, res.url, res.originalName, file.type).subscribe({
          next: () => {
            this.uploading = false; this.uploadProgress = 0;
            if (caption) this.doSend(caption);
          },
          error: () => { this.uploading = false; }
        });
      },
      error: () => { clearInterval(iv); this.uploading = false; alert('Erreur lors de l\'envoi vidéo.'); }
    });
  }

  closeVideoRecorder() {
    clearInterval(this.videoTimer);
    this._cleanupAudioAnalyser();
    this.videoCountdownTimers.forEach(t => clearTimeout(t));
    this.videoCountdownTimers = [];
    this.videoStream?.getTracks().forEach(t => t.stop());
    this.videoStream = null;
    this.videoRecorder = null;
    if (this.videoPreviewUrl) { URL.revokeObjectURL(this.videoPreviewUrl); this.videoPreviewUrl = null; }
    this.videoChunks = [];
    this.videoPhase = 'idle';
    this.videoRecordingSeconds = 0;
    this.videoIsPaused = false;
    this.videoCaption = '';
    this.cdr.markForCheck();
  }

  private _setupAudioAnalyser(stream: MediaStream) {
    try {
      this.audioCtx = new AudioContext();
      const source = this.audioCtx.createMediaStreamSource(stream);
      this.audioAnalyser = this.audioCtx.createAnalyser();
      this.audioAnalyser.fftSize = 64;
      source.connect(this.audioAnalyser);
      this._runAudioLoop();
    } catch {}
  }

  private _runAudioLoop() {
    if (!this.audioAnalyser) return;
    const dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    const update = () => {
      this.audioAnalyser!.getByteFrequencyData(dataArray);
      this.audioBars = Array.from(dataArray.slice(0, 16));
      this.cdr.markForCheck();
      if (this.videoPhase === 'recording' && !this.videoIsPaused) {
        this.audioAnimFrame = requestAnimationFrame(update);
      }
    };
    update();
  }

  private _cleanupAudioAnalyser() {
    if (this.audioAnimFrame) { cancelAnimationFrame(this.audioAnimFrame); this.audioAnimFrame = null; }
    if (this.audioCtx) { this.audioCtx.close().catch(() => {}); this.audioCtx = null; }
    this.audioAnalyser = null;
    this.audioBars = new Array(16).fill(4);
  }

  // ── STT (Speech-to-Text) ──────────────────────────────────────────────────────

  private startSTT() {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;
    try {
      this.sttRecognizer = new SpeechRec();
      this.sttRecognizer.continuous = true;
      this.sttRecognizer.interimResults = true;
      this.sttRecognizer.lang = 'fr-FR';
      this.sttRecognizer.onresult = (event: any) => {
        this.ngZone.run(() => {
          let final = '';
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) final += event.results[i][0].transcript + ' ';
            else interim += event.results[i][0].transcript;
          }
          if (final) this.sttTranscript += final;
          this.sttInterim = interim;
          this.cdr.markForCheck();
        });
      };
      this.sttRecognizer.onerror = () => {};
      this.sttRecognizer.start();
    } catch {}
  }

  private stopSTT() {
    try { this.sttRecognizer?.stop(); } catch {}
    this.sttRecognizer = null;
    this.sttInterim = '';
    this.cdr.markForCheck();
  }

  useSttAsText() {
    const text = (this.sttTranscript + this.sttInterim).trim();
    if (text) this.newMessage = text;
    this.sttTranscript = '';
    this.sttInterim = '';
  }

  // ── Scheduled message helpers ─────────────────────────────────────────────────

  getScheduledCountdown(dateStr: string): string {
    const diff = Math.floor((new Date(dateStr).getTime() - this.scheduledNow.getTime()) / 1000);
    if (diff <= 0) return 'Envoi imminent...';
    if (diff < 60) return `Dans ${diff}s`;
    if (diff < 3600) return `Dans ${Math.floor(diff / 60)}min`;
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `Dans ${h}h ${m > 0 ? m + 'min' : ''}`;
  }

  getRecurrenceChipStyle(type: string): Record<string, string> {
    const colors: Record<string, string> = {
      ONCE: '#64748b', DAILY: '#1d4ed8', WEEKDAYS: '#0f766e', WEEKLY: '#6d28d9', CUSTOM: '#c2410c'
    };
    const bg = colors[type] ?? '#64748b';
    return { background: bg + '33', color: bg, border: `1px solid ${bg}66` };
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────────

  openLightbox(msg: ChatMessage) { this.lightboxItem = msg; }
  closeLightbox() { this.lightboxItem = null; }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  renderContent(content: string): SafeHtml {
    if (!content) return '';
    return this.sanitizer.bypassSecurityTrustHtml(
      content.replace(/@([\w\s]+?)(?=\s|$)/g, '<span class="mention">@$1</span>')
    );
  }

  openFile(url: string) { window.open(url, '_blank'); }
  scrollToBottom() { try { this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' }); } catch {} }
  isMe(msg: ChatMessage) { return msg.senderId === this.authService.currentUser?.id; }
  getInitials(name: string) { return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'; }
  formatTime(date: string) { return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }

  private adjustTextarea() {
    const ta = this.textArea?.nativeElement;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
  }
}

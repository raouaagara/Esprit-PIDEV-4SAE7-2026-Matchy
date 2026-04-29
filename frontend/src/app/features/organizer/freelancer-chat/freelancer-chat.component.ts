import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef,
  AfterViewChecked, ChangeDetectorRef, NgZone, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../core/services/chat.service';
import { PrivateChatService } from '../../../core/services/private-chat.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranscriptionService } from '../../../core/services/transcription.service';
import { MeetingService } from '../../../core/services/meeting.service';
import {
  ConversationSummary, ChatMessage, ProjectParticipant,
  MessageReaction, ScheduledMessage, MeetingJoinResponse, RecurrenceType
} from '../../../shared/models/models';

interface EditingMsg    { id: number; content: string; }
interface SharedContent { images: ChatMessage[]; files: ChatMessage[]; links: ChatMessage[]; }
interface RecordingState { isRecording: boolean; duration: number; chunks: Blob[]; }
interface VideoRecordingPhase { phase: 'idle' | 'preview' | 'countdown' | 'recording' | 'review'; }

@Component({
  selector: 'app-freelancer-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './freelancer-chat.component.html',
  styleUrls: ['./freelancer-chat.component.css']
})
export class FreelancerChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  // ── ViewChild refs ──────────────────────────────────────────────────────────
  @ViewChild('messagesEnd')        messagesEnd!:   ElementRef;
  @ViewChild('msgInput')           msgInput!:      ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileInput')          fileInput!:     ElementRef<HTMLInputElement>;
  @ViewChild('videoLiveEl')        videoLiveEl?:   ElementRef<HTMLVideoElement>;
  @ViewChild('videoReviewEl')      videoReviewEl?: ElementRef<HTMLVideoElement>;

  // ── Base state ──────────────────────────────────────────────────────────────
  conversations:   ConversationSummary[] = [];
  selectedConv:    ConversationSummary | null = null;
  messages:        ChatMessage[] = [];
  newMessage       = '';
  searchQuery      = '';
  filterMode:      'all' | 'unread' | 'favorites' = 'all';
  loading          = false;
  sending          = false;
  uploading        = false;
  uploadProgress   = 0;
  private shouldScroll = false;

  // Stable "now" snapshot — updated every 30 s outside Angular zone so formatTime()
  // returns the same value for both check-passes within a single change detection cycle.
  nowMs = Date.now();
  private nowRefreshTimer?: ReturnType<typeof setInterval>;

  // ── 1. Editing & Deletion ───────────────────────────────────────────────────
  editingMsg:    EditingMsg | null = null;
  deletingMsgId: number    | null = null;

  // ── 2. Emoji Reactions ──────────────────────────────────────────────────────
  emojis = ['😊','😂','❤️','👍','🔥','✅','👋','🎉','😍','🤔','😎','💯','🙏','💪','🚀','⭐'];
  showEmojiPicker           = false;
  showReactionPicker        = false;
  reactionPickerMsgId:      number | null = null;
  selectedMsgIdForReaction: number | null = null;
  hoveredMessageId:         number | null = null;

  // ── 3. Message Pinning ──────────────────────────────────────────────────────
  pinnedMessages: ChatMessage[] = [];
  showPinnedPanel = false;

  // ── 4. File Uploads ─────────────────────────────────────────────────────────
  uploadedFile: { url: string; name: string; type: string } | null = null;

  // ── 5. Voice Recording + STT ────────────────────────────────────────────────
  voiceRecording: RecordingState = { isRecording: false, duration: 0, chunks: [] };
  private voiceMediaRecorder: MediaRecorder | null = null;
  private voiceStream:        MediaStream  | null = null;
  private voiceTimer: any = null;
  private commitVoice = true;

  // STT
  sttTranscript  = '';
  sttInterim     = '';
  showSttChoice  = false;
  pendingAudioFile: File | null = null;
  private sttRecognizer: any = null;
  get sttAvailable(): boolean {
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
  }

  // ── 6. Video Recording ──────────────────────────────────────────────────────
  videoRecording: VideoRecordingPhase & RecordingState = {
    phase: 'idle', isRecording: false, duration: 0, chunks: []
  };
  private videoMediaRecorder: MediaRecorder | null = null;
  private videoStream:        MediaStream  | null = null;
  videoPreviewUrl:   string | null = null;
  private videoTimer: any  = null;
  videoCountdown:    number | string = 3;
  videoFacingMode:   'user' | 'environment' = 'user';
  videoQuality:      '480p' | '720p' | '1080p' = '720p';
  videoIsPaused      = false;
  videoCaption       = '';
  audioBars:         number[] = new Array(16).fill(4);
  private videoCountdownTimers: any[] = [];
  private audioCtx:       AudioContext | null = null;
  private audioAnalyser:  AnalyserNode | null = null;
  private audioAnimFrame: number       | null = null;

  // ── 6b. Screen Recording ────────────────────────────────────────────────────
  isScreenRecording      = signal<boolean>(false);
  screenRecordingDuration = signal<number>(0);
  screenPreviewUrl       = signal<string>('');
  screenCaption          = '';
  private screenMediaRecorder: MediaRecorder | null = null;
  private screenChunks:  Blob[]        = [];
  private screenRecordingInterval: ReturnType<typeof setInterval> | null = null;
  private screenStream:  MediaStream | null = null;

  // ── 7. Translation ──────────────────────────────────────────────────────────
  translatingMsgId: number | null = null;
  messageTranslations = new Map<number, { lang: string; text: string }>();
  translateBeforeSend  = false;
  sendTargetLang       = 'en';
  isTranslatingBeforeSend = false;
  autoTranslateIncoming = false;
  autoTranslateLang     = 'fr';

  // ── 8. Mentions (@) ─────────────────────────────────────────────────────────
  showMentionDropdown   = false;
  mentionQuery          = '';
  mentionSuggestions:   ProjectParticipant[] = [];
  allParticipants:      ProjectParticipant[] = [];
  mentionSelectedIndex  = 0;
  cursorPos             = 0;

  // ── 9. Scheduled Messages ───────────────────────────────────────────────────
  showSchedulePanel   = false;
  showScheduledList   = false;
  scheduledMessages:  ScheduledMessage[] = [];
  schedulingContent   = '';
  scheduleMsgDate     = '';
  scheduleMsgTime     = '';
  recurrenceType:     RecurrenceType = 'ONCE';
  recurrenceDays:     string[] = [];
  editingScheduledId: number | null = null;
  scheduledNow        = new Date();
  private scheduledNowInterval: any = null;

  // ── 10. Shared Content Panel ────────────────────────────────────────────────
  sharedContent: SharedContent = { images: [], files: [], links: [] };
  showSharedPanel       = false;
  selectedImagePreview: ChatMessage | null = null;
  currentSharedTab:     'images' | 'files' | 'links' = 'images';
  lightboxItem:         ChatMessage | null = null;

  // ── 11. Voice Notifications (TTS) ───────────────────────────────────────────
  speechSynthesis        = window.speechSynthesis;
  isSpeakingNotification = false;
  ttsEnabled             = false;
  availableVoices:       SpeechSynthesisVoice[] = [];

  // ── 12. Favorites ───────────────────────────────────────────────────────────
  favoriteConvs = new Set<string>();

  // ── 13. Meeting (ZegoCloud) ──────────────────────────────────────────────────
  showMeetingMenu   = false;
  showMeetingModal  = false;
  showScheduleForm  = false;
  meetingTitle      = '';
  meetingDuration   = 30;
  aiSummary:        any    = null;
  meetingLoading    = false;
  isCreatingMeeting = false;
  activeVideo:      MeetingJoinResponse | null = null;
  activeVideoRoomId = '';
  scheduleSubject   = '';
  scheduleDate      = '';
  scheduleTime      = '';

  // ── 14. Typing Indicator ────────────────────────────────────────────────────
  typingUsers = new Map<string, any>(); // userName → timeout handle
  isTyping    = false;
  private typingDebounce: any = null;
  private typingTimeout:  any;
  private typingSub?: Subscription;

  // ── 15. Online Presence ──────────────────────────────────────────────────────
  onlineUsers = new Set<string>();
  private presenceSub?: Subscription;

  // ── 16. Notification toast ──────────────────────────────────────────────────
  notifToast: { message: string; type: 'success' | 'warning' | 'error' } | null = null;
  private notifSub?: Subscription;
  private docClickListener?: () => void;
  pendingSound: (() => void) | null = null;

  // ── 17. Dark mode ──────────────────────────────────────────────────────────
  isDarkMode = localStorage.getItem('chat_dark_mode') !== 'false';

  // ── Internal subscriptions ──────────────────────────────────────────────────
  private projectSubs = new Map<number, Subscription>();
  private statusSubs  = new Map<number, Subscription>();

  // ── Members panel ───────────────────────────────────────────────────────────
  showMembersPanel = false;

  get availableLangs() { return this.translationService.availableLangs; }
  get isOrganizer() { return true; } // organizer view

  get today(): string { return new Date().toISOString().split('T')[0]; }

  get inputPlaceholder(): string {
    if (!this.translateBeforeSend) return 'Votre message... (@nom pour mentionner)';
    return `Écrivez votre message... (sera traduit en ${this.translationService.getLangName(this.sendTargetLang)} avant envoi)`;
  }

  get notificationsMuted(): boolean {
    const id = this.authService.currentUser?.id;
    return id ? localStorage.getItem(`chat_notifications_muted_${id}`) === 'true' : false;
  }

  get typingText(): string {
    const names = Array.from(this.typingUsers.keys());
    if (names.length === 0) return '';
    if (names.length === 1) return `${names[0]} est en train d'écrire`;
    return `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]} écrivent`;
  }

  constructor(
    public  authService:          AuthService,
    private chatService:          ChatService,
    private privateChatService:   PrivateChatService,
    public  translationService:   TranslationService,
    private notificationService:  NotificationService,
    private transcriptionService: TranscriptionService,
    private meetingService:       MeetingService,
    private sanitizer:            DomSanitizer,
    private cdr:                  ChangeDetectorRef,
    private ngZone:               NgZone,
    private router:               Router
  ) {}

  // ══════════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ══════════════════════════════════════════════════════════════════════════════

  ngOnInit(): void {
    const userId = this.authService.currentUser?.id;
    if (userId) {
      this.privateChatService.connect(userId);
      this.notificationService.connect();
      this.loadFavorites();
    }
    this.loadConversations();

    // TTS voices
    if ('speechSynthesis' in window) {
      this.availableVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.availableVoices = window.speechSynthesis.getVoices();
      };
    }

    // Notification events — use NotificationService's observable to avoid duplicate WS connection
    this.notifSub = this.notificationService.notifications$
      .subscribe(event => this.handleNotificationEvent(event));

    // Scheduled countdown clock
    this.scheduledNowInterval = setInterval(() => {
      this.scheduledNow = new Date();
      this.cdr.markForCheck();
    }, 60_000);

    // Keep nowMs stable between Angular check-passes (runs outside zone — no extra CD cycle)
    this.ngZone.runOutsideAngular(() => {
      this.nowRefreshTimer = setInterval(() => {
        this.nowMs = Date.now();
        this.cdr.detectChanges();
      }, 30_000);
    });

    // Unlock AudioContext on first click
    this.docClickListener = () => {
      if (this.pendingSound) { this.pendingSound(); this.pendingSound = null; }
    };
    document.addEventListener('click', this.docClickListener, { once: false });
  }

  ngOnDestroy(): void {
    this.projectSubs.forEach((sub, pid) => {
      sub.unsubscribe();
      this.chatService.disconnectFromProject(pid);
    });
    this.projectSubs.clear();
    this.statusSubs.forEach(s => s.unsubscribe());
    this.statusSubs.clear();
    this.typingSub?.unsubscribe();
    this.presenceSub?.unsubscribe();
    this.notifSub?.unsubscribe();
    this.privateChatService.disconnect();
    this.notificationService.disconnect();
    this.stopVoiceRecording();
    this.closeVideoRecorder();
    this.cancelScreenRecording();
    this.stopSTT();
    clearInterval(this.voiceTimer);
    clearInterval(this.videoTimer);
    clearTimeout(this.typingTimeout);
    clearTimeout(this.typingDebounce);
    clearInterval(this.scheduledNowInterval);
    clearInterval(this.nowRefreshTimer);
    this.speechSynthesis.cancel();
    if (this.docClickListener) document.removeEventListener('click', this.docClickListener);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // CONVERSATIONS & LOADING
  // ══════════════════════════════════════════════════════════════════════════════

  loadConversations(): void {
    this.chatService.getConversations().subscribe({
      next: convs => {
        this.conversations = convs;
        this.sortConversations();
        this.watchOnlineStatuses();

        const projectIds = [...new Set(convs.map(c => c.projectId))];
        projectIds.forEach(pid => {
          if (!this.projectSubs.has(pid)) {
            const sub = this.chatService.connectToProject(pid).subscribe(msg => {
              this.handleIncomingMsg(msg);
            });
            this.projectSubs.set(pid, sub);

            // Typing subscription per project
            if (!this.typingSub) {
              this.typingSub = this.chatService.subscribeToTyping(pid).subscribe(event => {
                const myName = this.authService.currentUser?.name || '';
                if (event.userName === myName) return;
                const existing = this.typingUsers.get(event.userName);
                if (existing) clearTimeout(existing);
                const handle = setTimeout(() => {
                  this.typingUsers.delete(event.userName);
                  this.cdr.detectChanges();
                }, 3000);
                this.typingUsers.set(event.userName, handle);
                this.cdr.detectChanges();
              });
            }

            // Presence subscription per project
            if (!this.presenceSub) {
              this.presenceSub = this.chatService.subscribeToPresence(pid).subscribe(event => {
                if (event.online) this.onlineUsers.add(event.userName);
                else this.onlineUsers.delete(event.userName);
                this.cdr.detectChanges();
              });
            }
          }
        });
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  selectConversation(conv: ConversationSummary): void {
    if (this.selectedConv?.roomKey === conv.roomKey) return;
    this.selectedConv   = conv;
    this.loading        = true;
    this.messages       = [];
    this.pinnedMessages = [];
    this.sharedContent  = { images: [], files: [], links: [] };
    this.editingMsg     = null;
    this.showEmojiPicker = false;
    this.showSchedulePanel = false;
    this.closeVideoRecorder();
    this.cancelVoiceRecording();

    const [projectId, clientId] = this.parseRoomKey(conv.roomKey);

    // Announce presence
    this.chatService.sendPresence(projectId, true).subscribe({ error: () => {} });

    this.chatService.getMessagesForClient(projectId, clientId).subscribe({
      next: msgs => {
        this.messages = msgs;
        this.loadPinnedMessages();
        this.loadSharedContent();
        this.loadParticipants();
        this.loadScheduledMessages();
        this.loading      = false;
        this.shouldScroll = true;
        conv.unreadCount  = 0;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  private handleIncomingMsg(msg: ChatMessage): void {
    if (msg.deleted) {
      this.messages       = this.messages.filter(m => m.id !== msg.id);
      this.pinnedMessages = this.pinnedMessages.filter(m => m.id !== msg.id);
      this.cdr.detectChanges();
      return;
    }

    if (!msg.clientId) return;
    const roomKey = `${msg.projectId}_${msg.clientId}`;
    const conv    = this.conversations.find(c => c.roomKey === roomKey);

    if (conv) {
      // Update existing message (edit / reaction / pin)
      const idx = this.messages.findIndex(m => m.id === msg.id);
      if (idx >= 0) {
        this.messages = [...this.messages.slice(0, idx), msg, ...this.messages.slice(idx + 1)];
        this.pinnedMessages = this.pinnedMessages.map(m => m.id === msg.id ? msg : m).filter(m => m.pinned);
        this.cdr.detectChanges();
        return;
      }

      conv.lastMessage     = msg.content;
      conv.lastMessageTime = msg.sentAt;

      if (this.selectedConv?.roomKey === roomKey) {
        if (msg.senderId !== this.authService.currentUser?.id) {
          this.messages     = [...this.messages, msg];
          this.shouldScroll = true;
          if (this.autoTranslateIncoming && msg.messageType === 'TEXT') {
            this.translateMessage(msg, this.autoTranslateLang);
          }
          if (this.ttsEnabled) {
            this.speakNotification(`Nouveau message de ${conv.otherUserName}`);
          }
          this.showNotifToast(`💬 ${conv.otherUserName}: ${msg.content.slice(0, 50)}`, 'success');
        }
      } else if (msg.senderId !== this.authService.currentUser?.id) {
        conv.unreadCount = (conv.unreadCount || 0) + 1;
        if (this.ttsEnabled) {
          this.speakNotification(`Nouveau message de ${conv.otherUserName}`);
        }
        this.showNotifToast(`💬 Nouveau message de ${conv.otherUserName}`, 'success');
      }
      this.sortConversations();
    }
    this.cdr.detectChanges();
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. MESSAGE SENDING, EDITING & DELETION
  // ══════════════════════════════════════════════════════════════════════════════

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!content || !this.selectedConv || this.sending) return;

    this.showEmojiPicker     = false;
    this.showMentionDropdown = false;

    if (this.translateBeforeSend) {
      this.isTranslatingBeforeSend = true;
      this.translationService.translate(content, 'auto', this.sendTargetLang).subscribe({
        next: res => {
          this.isTranslatingBeforeSend = false;
          const sameLang = res.detectedLanguage === this.sendTargetLang;
          this.doSendMessage(
            sameLang ? content : res.translatedText,
            sameLang ? undefined : content,
            sameLang ? undefined : res.detectedLanguage
          );
        },
        error: () => { this.isTranslatingBeforeSend = false; this.doSendMessage(content); }
      });
    } else {
      this.doSendMessage(content);
    }
  }

  private doSendMessage(content: string, originalContent?: string, detectedLanguage?: string): void {
    if (!this.selectedConv) return;
    this.sending = true;
    const backup = this.newMessage;
    this.newMessage = '';
    this.adjustTextarea();

    const [projectId, clientId] = this.parseRoomKey(this.selectedConv.roomKey);

    this.chatService.sendMessageToClient(projectId, content, clientId).subscribe({
      next: msg => {
        this.messages                      = [...this.messages, msg];
        this.selectedConv!.lastMessage     = content;
        this.selectedConv!.lastMessageTime = msg.sentAt;
        this.shouldScroll = true;
        this.sending      = false;
        this.isTyping     = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.sending    = false;
        this.newMessage = backup;
      }
    });
  }

  editMessage(msg: ChatMessage): void {
    this.editingMsg = { id: msg.id, content: msg.content };
    this.hoveredMessageId = null;
  }

  saveEdit(): void {
    if (!this.editingMsg || !this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);

    this.chatService.editMessage(projectId, this.editingMsg.id, this.editingMsg.content).subscribe({
      next: updated => {
        const idx = this.messages.findIndex(m => m.id === this.editingMsg!.id);
        if (idx >= 0) {
          this.messages[idx] = updated;
          this.messages = [...this.messages];
        }
        this.editingMsg = null;
        this.cdr.detectChanges();
      }
    });
  }

  cancelEdit(): void { this.editingMsg = null; }

  deleteMessage(msgId: number): void {
    if (!confirm('Supprimer ce message ?') || !this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.deletingMsgId = msgId;

    this.chatService.deleteMessage(projectId, msgId).subscribe({
      next: () => {
        this.messages      = this.messages.filter(m => m.id !== msgId);
        this.deletingMsgId = null;
        this.cdr.detectChanges();
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. EMOJI REACTIONS
  // ══════════════════════════════════════════════════════════════════════════════

  openEmojiPicker(msgId: number, event: MouseEvent): void {
    event.stopPropagation();
    if (this.reactionPickerMsgId === msgId && this.showReactionPicker) {
      this.showReactionPicker  = false;
      this.reactionPickerMsgId = null;
    } else {
      this.reactionPickerMsgId = msgId;
      this.showReactionPicker  = true;
      this.showEmojiPicker     = false;
    }
  }

  addReaction(msgId: number, emoji: string): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);

    this.chatService.toggleReaction(projectId, msgId, emoji).subscribe({
      next: updatedMsg => {
        const idx = this.messages.findIndex(m => m.id === msgId);
        if (idx >= 0) {
          this.messages[idx] = updatedMsg;
          this.messages = [...this.messages];
        }
        this.showReactionPicker  = false;
        this.reactionPickerMsgId = null;
        this.cdr.detectChanges();
      }
    });
  }

  closeEmojiPicker(): void {
    this.showEmojiPicker     = false;
    this.showReactionPicker  = false;
    this.reactionPickerMsgId = null;
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker     = !this.showEmojiPicker;
    this.showReactionPicker  = false;
    this.showMentionDropdown = false;
  }

  insertEmoji(emoji: string): void {
    const ta = this.msgInput?.nativeElement;
    if (ta) {
      const s = ta.selectionStart, e = ta.selectionEnd;
      this.newMessage = this.newMessage.substring(0, s) + emoji + this.newMessage.substring(e);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + emoji.length; ta.focus(); });
    } else {
      this.newMessage += emoji;
    }
    this.showEmojiPicker = false;
  }

  getReactionGroups(msg: ChatMessage): { emoji: string; count: number; users: string[] }[] {
    if (!msg.reactions?.length) return [];
    const map = new Map<string, { count: number; users: string[] }>();
    msg.reactions.forEach((r: MessageReaction) => {
      const entry = map.get(r.emoji) ?? { count: 0, users: [] };
      entry.count++;
      entry.users.push(r.userName ?? '');
      map.set(r.emoji, entry);
    });
    return Array.from(map.entries()).map(([emoji, v]) => ({ emoji, ...v }));
  }

  isMyReaction(emoji: string, msg: ChatMessage): boolean {
    return (msg.reactions || []).some(
      r => r.emoji === emoji && r.userId === this.authService.currentUser?.id
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 3. MESSAGE PINNING
  // ══════════════════════════════════════════════════════════════════════════════

  pinMessage(msg: ChatMessage): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.pinMessage(projectId, msg.id).subscribe({
      next: updated => {
        const idx = this.messages.findIndex(m => m.id === msg.id);
        if (idx >= 0) { this.messages[idx] = updated; this.messages = [...this.messages]; }
        if (!this.pinnedMessages.find(m => m.id === msg.id)) {
          this.pinnedMessages = [...this.pinnedMessages, updated];
        }
        this.cdr.detectChanges();
      }
    });
  }

  unpinMessage(msg: ChatMessage): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.unpinMessage(projectId, msg.id).subscribe({
      next: updated => {
        const idx = this.messages.findIndex(m => m.id === msg.id);
        if (idx >= 0) { this.messages[idx] = updated; this.messages = [...this.messages]; }
        this.pinnedMessages = this.pinnedMessages.filter(m => m.id !== msg.id);
        this.cdr.detectChanges();
      }
    });
  }

  loadPinnedMessages(): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.getPinnedMessages(projectId).subscribe({
      next: pinned => { this.pinnedMessages = pinned; this.cdr.detectChanges(); }
    });
  }

  togglePinnedPanel(): void {
    this.showPinnedPanel = !this.showPinnedPanel;
    this.showSharedPanel = false;
    if (this.showPinnedPanel) this.loadPinnedMessages();
  }

  scrollToPinnedMessage(msg: ChatMessage): void {
    this.showPinnedPanel = false;
    const el = document.getElementById(`msg-${msg.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.classList.add('highlighted');
    setTimeout(() => el?.classList.remove('highlighted'), 2000);
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 4. FILE UPLOADS
  // ══════════════════════════════════════════════════════════════════════════════

  triggerFileUpload(): void { this.fileInput?.nativeElement.click(); }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file || !this.selectedConv) return;

    this.uploading      = true;
    this.uploadProgress = 0;
    const [projectId, clientId] = this.parseRoomKey(this.selectedConv.roomKey);
    const iv = setInterval(() => { if (this.uploadProgress < 85) this.uploadProgress += 10; }, 200);

    this.chatService.uploadFile(file).subscribe({
      next: response => {
        clearInterval(iv);
        this.uploadProgress = 100;
        const isImage = file.type.startsWith('image/');
        const isAudio = file.type.startsWith('audio/');
        const isVideo = file.type.startsWith('video/');

        let sendObs;
        if (isAudio) {
          sendObs = this.chatService.sendVoiceMessage(projectId, response.url, response.originalName, file.type, clientId);
        } else if (isVideo) {
          sendObs = this.chatService.sendVideoMessage(projectId, response.url, response.originalName, file.type, clientId);
        } else {
          sendObs = this.chatService.sendFileMessageToClient(projectId, response.url, response.originalName, file.type, isImage, clientId);
        }

        sendObs.subscribe({
          next: msg => {
            this.messages     = [...this.messages, msg];
            this.shouldScroll = true;
            this.uploading    = false;
            this.uploadProgress = 0;
            this.loadSharedContent();
            this.cdr.detectChanges();
          },
          error: () => { this.uploading = false; }
        });
      },
      error: () => { clearInterval(iv); this.uploading = false; }
    });
    event.target.value = '';
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 5. VOICE RECORDING + Speech-to-Text
  // ══════════════════════════════════════════════════════════════════════════════

  async startVoiceRecording(): Promise<void> {
    if (this.voiceRecording.isRecording || this.uploading) return;
    try {
      this.voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
                     : MediaRecorder.isTypeSupported('audio/webm')             ? 'audio/webm' : '';
      this.voiceMediaRecorder = new MediaRecorder(this.voiceStream, mimeType ? { mimeType } : {});
      this.voiceRecording = { isRecording: true, duration: 0, chunks: [] };
      this.commitVoice    = true;
      this.sttTranscript  = '';
      this.sttInterim     = '';

      this.voiceMediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) this.voiceRecording.chunks.push(e.data);
      };
      this.voiceMediaRecorder.onstop = () => {
        if (this.commitVoice) this.processVoiceRecording();
        else { this.voiceRecording.chunks = []; this.sttTranscript = ''; }
      };
      this.voiceMediaRecorder.start();

      this.voiceTimer = setInterval(() => {
        this.voiceRecording.duration++;
        if (this.voiceRecording.duration >= 300) this.stopVoiceRecording();
        this.cdr.detectChanges();
      }, 1000);

      if (this.sttAvailable) this.startSTT();
      this.cdr.detectChanges();
    } catch (err) {
      alert('Accès au microphone refusé. Veuillez autoriser l\'accès dans les paramètres du navigateur.');
    }
  }

  stopVoiceRecording(): void {
    if (!this.voiceMediaRecorder || !this.voiceRecording.isRecording) return;
    this.commitVoice = true;
    this.stopSTT();
    this.endVoiceCapture();
  }

  cancelVoiceRecording(): void {
    if (!this.voiceMediaRecorder && !this.voiceRecording.isRecording) return;
    this.commitVoice   = false;
    this.sttTranscript = '';
    this.sttInterim    = '';
    this.stopSTT();
    this.endVoiceCapture();
  }

  private endVoiceCapture(): void {
    clearInterval(this.voiceTimer);
    this.voiceRecording.isRecording = false;
    if (this.voiceMediaRecorder && this.voiceMediaRecorder.state !== 'inactive') {
      this.voiceMediaRecorder.stop();
    }
    this.voiceStream?.getTracks().forEach(t => t.stop());
    this.voiceStream = null;
    this.cdr.detectChanges();
  }

  private processVoiceRecording(): void {
    if (this.voiceRecording.chunks.length === 0) return;
    const mimeType = this.voiceMediaRecorder?.mimeType || 'audio/webm';
    const ext  = mimeType.includes('ogg') ? 'ogg' : 'webm';
    const blob = new Blob(this.voiceRecording.chunks, { type: mimeType });
    const file = new File([blob], `vocal_${Date.now()}.${ext}`, { type: mimeType });
    this.voiceRecording = { isRecording: false, duration: 0, chunks: [] };
    this.voiceMediaRecorder = null;

    if (this.sttAvailable && this.sttTranscript.trim()) {
      this.pendingAudioFile = file;
      this.showSttChoice    = true;
      this.cdr.detectChanges();
    } else {
      this._uploadVoiceFile(file);
    }
  }

  sendVoiceAsAudio(): void {
    const file = this.pendingAudioFile;
    this.showSttChoice    = false;
    this.pendingAudioFile = null;
    this.sttTranscript    = '';
    if (file) this._uploadVoiceFile(file);
  }

  sendVoiceAsText(): void {
    const text = this.sttTranscript.trim();
    this.showSttChoice    = false;
    this.pendingAudioFile = null;
    this.sttTranscript    = '';
    if (text) this.doSendMessage(text);
  }

  dismissSttChoice(): void {
    this.showSttChoice    = false;
    this.pendingAudioFile = null;
    this.sttTranscript    = '';
  }

  private _uploadVoiceFile(file: File): void {
    if (!this.selectedConv) return;
    const [projectId, clientId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.uploading      = true;
    this.uploadProgress = 0;
    const iv = setInterval(() => { if (this.uploadProgress < 90) this.uploadProgress += 10; }, 200);

    this.chatService.uploadFile(file).subscribe({
      next: response => {
        clearInterval(iv);
        this.uploadProgress = 100;
        this.chatService.sendVoiceMessage(projectId, response.url, response.originalName, file.type, clientId).subscribe({
          next: msg => {
            this.messages     = [...this.messages, msg];
            this.shouldScroll = true;
            this.uploading    = false;
            this.uploadProgress = 0;
            this.cdr.detectChanges();
          },
          error: () => { this.uploading = false; }
        });
      },
      error: () => { clearInterval(iv); this.uploading = false; }
    });
  }

  // ── STT ─────────────────────────────────────────────────────────────────────

  private startSTT(): void {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;
    try {
      this.sttRecognizer = new SpeechRec();
      this.sttRecognizer.continuous      = true;
      this.sttRecognizer.interimResults  = true;
      this.sttRecognizer.lang            = 'fr-FR';
      this.sttRecognizer.onresult = (event: any) => {
        this.ngZone.run(() => {
          let final = '', interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) final  += event.results[i][0].transcript + ' ';
            else                          interim += event.results[i][0].transcript;
          }
          if (final) this.sttTranscript += final;
          this.sttInterim = interim;
          this.cdr.detectChanges();
        });
      };
      this.sttRecognizer.onerror = () => {};
      this.sttRecognizer.start();
    } catch {}
  }

  private stopSTT(): void {
    try { this.sttRecognizer?.stop(); } catch {}
    this.sttRecognizer = null;
    this.sttInterim    = '';
    this.cdr.detectChanges();
  }

  useSttAsText(): void {
    const text = (this.sttTranscript + this.sttInterim).trim();
    if (text) this.newMessage = text;
    this.sttTranscript = '';
    this.sttInterim    = '';
  }

  formatRecordingTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 6. VIDEO RECORDING
  // ══════════════════════════════════════════════════════════════════════════════

  private get _videoConstraints(): MediaStreamConstraints {
    const dim = this.videoQuality === '1080p' ? { w: 1920, h: 1080 }
              : this.videoQuality === '720p'  ? { w: 1280, h: 720 }
              :                                 { w: 854,  h: 480 };
    return {
      video: { facingMode: this.videoFacingMode, width: { ideal: dim.w }, height: { ideal: dim.h } },
      audio: true
    };
  }

  async openVideoRecorder(): Promise<void> {
    if (this.videoRecording.phase !== 'idle' || this.uploading) return;
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this._videoConstraints);
      this.videoRecording = { ...this.videoRecording, phase: 'preview' };
      this.videoCaption   = '';
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream;
      }, 80);
    } catch {
      alert('Accès à la caméra refusé. Vérifiez les permissions du navigateur.');
    }
  }

  async switchVideoCamera(): Promise<void> {
    this.videoFacingMode = this.videoFacingMode === 'user' ? 'environment' : 'user';
    this.videoStream?.getTracks().forEach(t => t.stop());
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia(this._videoConstraints);
      setTimeout(() => {
        if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream;
      }, 80);
    } catch {}
  }

  startVideoCountdown(): void {
    if (!this.videoStream) return;
    this.videoRecording = { ...this.videoRecording, phase: 'countdown' };
    this.videoCountdownTimers.forEach(t => clearTimeout(t));
    this.videoCountdownTimers = [];
    const steps: (number | string)[] = [3, 2, 1, 'GO'];
    steps.forEach((val, i) => {
      const t = setTimeout(() => {
        this.videoCountdown = val;
        this.cdr.detectChanges();
        if (i === steps.length - 1) {
          const t2 = setTimeout(() => this._startActualVideoRecording(), 600);
          this.videoCountdownTimers.push(t2);
        }
      }, i * 900);
      this.videoCountdownTimers.push(t);
    });
    this.videoCountdown = 3;
  }

  private _startActualVideoRecording(): void {
    if (!this.videoStream) return;
    this.videoRecording = { phase: 'recording', isRecording: true, duration: 0, chunks: [] };
    this.videoIsPaused  = false;

    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus'
                   : MediaRecorder.isTypeSupported('video/webm')                 ? 'video/webm' : '';
    this.videoMediaRecorder = new MediaRecorder(this.videoStream, mimeType ? { mimeType } : {});
    this.videoMediaRecorder.ondataavailable = e => { if (e.data.size > 0) this.videoRecording.chunks.push(e.data); };
    this.videoMediaRecorder.onstop = () => this._processVideoRecording();
    this.videoMediaRecorder.start();

    this.videoTimer = setInterval(() => {
      if (!this.videoIsPaused) {
        this.videoRecording.duration++;
        if (this.videoRecording.duration >= 120) this.stopVideoCapture();
      }
      this.cdr.detectChanges();
    }, 1000);

    this._setupAudioAnalyser(this.videoStream);
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.videoLiveEl?.nativeElement) this.videoLiveEl.nativeElement.srcObject = this.videoStream;
    }, 80);
  }

  stopVideoCapture(): void {
    clearInterval(this.videoTimer);
    this._cleanupAudioAnalyser();
    if (this.videoMediaRecorder?.state !== 'inactive') this.videoMediaRecorder?.stop();
  }

  toggleVideoPause(): void {
    if (!this.videoMediaRecorder) return;
    if (this.videoMediaRecorder.state === 'recording') {
      this.videoMediaRecorder.pause();
      this.videoIsPaused = true;
    } else if (this.videoMediaRecorder.state === 'paused') {
      this.videoMediaRecorder.resume();
      this.videoIsPaused = false;
      this._runAudioLoop();
    }
    this.cdr.detectChanges();
  }

  private _processVideoRecording(): void {
    const mimeType = this.videoMediaRecorder?.mimeType || 'video/webm';
    const blob     = new Blob(this.videoRecording.chunks, { type: mimeType });
    if (this.videoPreviewUrl) URL.revokeObjectURL(this.videoPreviewUrl);
    this.videoPreviewUrl = URL.createObjectURL(blob);
    this.videoStream?.getVideoTracks().forEach(t => t.stop());
    this.videoRecording = { ...this.videoRecording, phase: 'review', isRecording: false };
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.videoReviewEl?.nativeElement) this.videoReviewEl.nativeElement.src = this.videoPreviewUrl!;
    }, 80);
  }

  async retakeVideo(): Promise<void> {
    this._cleanupAudioAnalyser();
    if (this.videoPreviewUrl) { URL.revokeObjectURL(this.videoPreviewUrl); this.videoPreviewUrl = null; }
    this.videoRecording = { phase: 'idle', isRecording: false, duration: 0, chunks: [] };
    this.videoStream?.getTracks().forEach(t => t.stop());
    this.videoStream    = null;
    this.videoIsPaused  = false;
    this.videoMediaRecorder = null;
    await this.openVideoRecorder();
  }

  sendVideoMessage(): void {
    if (!this.videoPreviewUrl || !this.selectedConv || this.uploading) return;
    const [projectId, clientId] = this.parseRoomKey(this.selectedConv.roomKey);
    const mimeType = this.videoMediaRecorder?.mimeType || 'video/webm';
    const ext  = mimeType.includes('mp4') ? 'mp4' : 'webm';
    const blob = new Blob(this.videoRecording.chunks, { type: mimeType });
    const file = new File([blob], `video_${Date.now()}.${ext}`, { type: mimeType });
    const caption = this.videoCaption.trim();
    this.closeVideoRecorder();
    this.uploading      = true;
    this.uploadProgress = 0;
    const iv = setInterval(() => { if (this.uploadProgress < 90) this.uploadProgress += 8; }, 300);

    this.chatService.uploadFile(file).subscribe({
      next: response => {
        clearInterval(iv);
        this.uploadProgress = 100;
        this.chatService.sendVideoMessage(projectId, response.url, response.originalName, file.type, clientId).subscribe({
          next: msg => {
            this.messages     = [...this.messages, msg];
            this.shouldScroll = true;
            this.uploading    = false;
            this.uploadProgress = 0;
            if (caption) this.doSendMessage(caption);
            this.loadSharedContent();
            this.cdr.detectChanges();
          },
          error: () => { this.uploading = false; }
        });
      },
      error: () => { clearInterval(iv); this.uploading = false; }
    });
  }

  closeVideoRecorder(): void {
    clearInterval(this.videoTimer);
    this._cleanupAudioAnalyser();
    this.videoCountdownTimers.forEach(t => clearTimeout(t));
    this.videoCountdownTimers = [];
    this.videoStream?.getTracks().forEach(t => t.stop());
    this.videoStream = null;
    this.videoMediaRecorder = null;
    if (this.videoPreviewUrl) { URL.revokeObjectURL(this.videoPreviewUrl); this.videoPreviewUrl = null; }
    this.videoRecording = { phase: 'idle', isRecording: false, duration: 0, chunks: [] };
    this.videoIsPaused  = false;
    this.videoCaption   = '';
    this.cdr.detectChanges();
  }

  private _setupAudioAnalyser(stream: MediaStream): void {
    try {
      this.audioCtx     = new AudioContext();
      const source      = this.audioCtx.createMediaStreamSource(stream);
      this.audioAnalyser = this.audioCtx.createAnalyser();
      this.audioAnalyser.fftSize = 64;
      source.connect(this.audioAnalyser);
      this._runAudioLoop();
    } catch {}
  }

  private _runAudioLoop(): void {
    if (!this.audioAnalyser) return;
    const dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    const update = () => {
      this.audioAnalyser!.getByteFrequencyData(dataArray);
      this.audioBars = Array.from(dataArray.slice(0, 16));
      this.cdr.detectChanges();
      if (this.videoRecording.phase === 'recording' && !this.videoIsPaused) {
        this.audioAnimFrame = requestAnimationFrame(update);
      }
    };
    update();
  }

  private _cleanupAudioAnalyser(): void {
    if (this.audioAnimFrame) { cancelAnimationFrame(this.audioAnimFrame); this.audioAnimFrame = null; }
    if (this.audioCtx) { this.audioCtx.close().catch(() => {}); this.audioCtx = null; }
    this.audioAnalyser = null;
    this.audioBars     = new Array(16).fill(4);
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 6b. SCREEN RECORDING
  // ══════════════════════════════════════════════════════════════════════════════

  async startScreenRecording(): Promise<void> {
    if (this.isScreenRecording() || this.uploading) return;
    try {
      const stream: MediaStream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: true,
        audio: true
      });
      this.screenStream = stream;

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '';

      this.screenMediaRecorder = new MediaRecorder(
        stream, mimeType ? { mimeType } : {}
      );
      this.screenChunks = [];
      this.isScreenRecording.set(true);
      this.screenRecordingDuration.set(0);

      this.screenMediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) this.screenChunks.push(e.data);
      };
      this.screenMediaRecorder.onstop = () => this._processScreenRecording();
      this.screenMediaRecorder.start();

      this.screenRecordingInterval = setInterval(() => {
        this.screenRecordingDuration.update(v => v + 1);
        if (this.screenRecordingDuration() >= 300) this.stopScreenRecording();
        this.cdr.detectChanges();
      }, 1000);

      // If user clicks "Stop sharing" in browser native UI
      stream.getVideoTracks()[0]?.addEventListener('ended', () => {
        if (this.isScreenRecording()) this.stopScreenRecording();
      });

      this.cdr.detectChanges();
    } catch {
      // User cancelled or permission denied — silent
      this.isScreenRecording.set(false);
    }
  }

  stopScreenRecording(): void {
    if (!this.screenMediaRecorder || !this.isScreenRecording()) return;
    if (this.screenRecordingInterval) {
      clearInterval(this.screenRecordingInterval);
      this.screenRecordingInterval = null;
    }
    if (this.screenMediaRecorder.state !== 'inactive') {
      this.screenMediaRecorder.stop();
    }
    this.screenStream?.getTracks().forEach(t => t.stop());
    this.isScreenRecording.set(false);
  }

  private _processScreenRecording(): void {
    const mimeType = this.screenMediaRecorder?.mimeType || 'video/webm';
    const blob = new Blob(this.screenChunks, { type: mimeType });
    const url  = URL.createObjectURL(blob);
    this.screenPreviewUrl.set(url);
    this.cdr.detectChanges();
  }

  sendScreenRecording(): void {
    const previewUrl = this.screenPreviewUrl();
    if (!previewUrl || !this.selectedConv || this.uploading) return;
    const [projectId, clientId] = this.parseRoomKey(this.selectedConv.roomKey);
    const caption = this.screenCaption.trim();

    fetch(previewUrl)
      .then(r => r.blob())
      .then(blob => {
        const ext  = blob.type.includes('mp4') ? 'mp4' : 'webm';
        const file = new File([blob], `screen-recording-${Date.now()}.${ext}`, { type: blob.type });
        const savedUrl = previewUrl;
        this.cancelScreenRecording();
        this.uploading      = true;
        this.uploadProgress = 0;
        const iv = setInterval(() => { if (this.uploadProgress < 90) this.uploadProgress += 8; }, 300);

        this.chatService.uploadFile(file).subscribe({
          next: response => {
            clearInterval(iv);
            this.uploadProgress = 100;
            this.chatService.sendFileMessageToClient(
              projectId, response.url, response.originalName, file.type, false, clientId
            ).subscribe({
              next: msg => {
                this.messages     = [...this.messages, msg];
                this.shouldScroll = true;
                this.uploading    = false;
                this.uploadProgress = 0;
                if (caption) this.doSendMessage(caption);
                this.loadSharedContent();
                this.cdr.detectChanges();
              },
              error: () => { this.uploading = false; }
            });
          },
          error: () => { clearInterval(iv); this.uploading = false; }
        });
      });
  }

  cancelScreenRecording(): void {
    if (this.screenRecordingInterval) {
      clearInterval(this.screenRecordingInterval);
      this.screenRecordingInterval = null;
    }
    try {
      if (this.screenMediaRecorder?.state !== 'inactive') {
        this.screenMediaRecorder?.stop();
      }
    } catch {}
    this.screenStream?.getTracks().forEach(t => t.stop());
    this.screenStream = null;
    this.screenMediaRecorder = null;
    this.screenChunks = [];
    const url = this.screenPreviewUrl();
    if (url) URL.revokeObjectURL(url);
    this.screenPreviewUrl.set('');
    this.isScreenRecording.set(false);
    this.screenRecordingDuration.set(0);
    this.screenCaption = '';
    this.cdr.detectChanges();
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 7. TRANSLATION
  // ══════════════════════════════════════════════════════════════════════════════

  translateMessage(msg: ChatMessage, targetLang = 'en'): void {
    if (this.messageTranslations.has(msg.id)) {
      this.messageTranslations.delete(msg.id);
      this.cdr.detectChanges();
      return;
    }
    this.translatingMsgId = msg.id;
    this.translationService.translate(msg.content, 'auto', targetLang).subscribe({
      next: result => {
        this.messageTranslations.set(msg.id, { lang: targetLang, text: result.translatedText });
        this.translatingMsgId = null;
        this.cdr.detectChanges();
      },
      error: () => { this.translatingMsgId = null; }
    });
  }

  getTranslation(msgId: number): string | null {
    return this.messageTranslations.get(msgId)?.text ?? null;
  }

  isTranslating(msgId: number): boolean { return this.translatingMsgId === msgId; }

  toggleMuteNotifications(): void {
    const id = this.authService.currentUser?.id;
    if (!id) return;
    const key = `chat_notifications_muted_${id}`;
    localStorage.setItem(key, String(localStorage.getItem(key) !== 'true'));
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 8. @MENTIONS
  // ══════════════════════════════════════════════════════════════════════════════

  onMessageInput(event: Event): void {
    this.adjustTextarea();

    // Typing indicator (debounced)
    if (!this.typingDebounce && this.selectedConv) {
      const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
      this.chatService.sendTyping(projectId).subscribe({ error: () => {} });
      this.isTyping      = true;
      this.typingDebounce = setTimeout(() => {
        this.typingDebounce = null;
        this.isTyping       = false;
      }, 3000);
    }

    const ta  = event.target as HTMLTextAreaElement;
    const beforeCursor = ta.value.substring(0, ta.selectionStart);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      this.mentionQuery         = mentionMatch[1].toLowerCase();
      this.mentionSuggestions   = this.allParticipants.filter(p =>
        p.name.toLowerCase().includes(this.mentionQuery) && p.id !== this.authService.currentUser?.id
      );
      this.showMentionDropdown  = this.mentionSuggestions.length > 0;
      this.mentionSelectedIndex = 0;
    } else {
      this.showMentionDropdown = false;
    }
  }

  selectMention(participant: ProjectParticipant): void {
    const ta      = this.msgInput?.nativeElement;
    const before  = (ta?.value ?? this.newMessage).substring(0, ta?.selectionStart ?? this.newMessage.length)
                      .replace(/@\w*$/, `@${participant.name} `);
    const after   = (ta?.value ?? '').substring(ta?.selectionStart ?? 0);
    this.newMessage          = before + after;
    this.showMentionDropdown = false;
    this.mentionSuggestions  = [];
    setTimeout(() => { ta?.focus(); if (ta) ta.selectionStart = ta.selectionEnd = before.length; }, 0);
  }

  loadParticipants(): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.getParticipants(projectId).subscribe({
      next: p => { this.allParticipants = p; this.cdr.detectChanges(); }
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 9. SCHEDULED MESSAGES
  // ══════════════════════════════════════════════════════════════════════════════

  toggleSchedulePanel(): void {
    this.showSchedulePanel = !this.showSchedulePanel;
    this.showEmojiPicker   = false;
    this.showMeetingMenu   = false;
    if (this.showSchedulePanel) {
      this.resetScheduleForm();
      this.loadScheduledMessages();
    }
  }

  closeSchedulePanel(): void {
    this.showSchedulePanel = false;
    this.showScheduledList = false;
    this.editingScheduledId = null;
    this.resetScheduleForm();
  }

  private resetScheduleForm(): void {
    if (!this.scheduleMsgDate) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      this.scheduleMsgDate = d.toISOString().split('T')[0];
      this.scheduleMsgTime = '09:00';
    }
    this.recurrenceType = 'ONCE';
    this.recurrenceDays = [];
  }

  loadScheduledMessages(): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.getScheduledMessages(projectId).subscribe({
      next: msgs => { this.scheduledMessages = msgs; this.cdr.detectChanges(); }
    });
  }

  scheduleMessage(): void {
    const content = (this.schedulingContent || this.newMessage).trim();
    if (!content || !this.scheduleMsgDate || !this.scheduleMsgTime || !this.selectedConv || this.sending) return;
    const scheduledAt = `${this.scheduleMsgDate}T${this.scheduleMsgTime}:00`;
    this.sending = true;

    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);

    const call$ = this.editingScheduledId
      ? this.chatService.editScheduledMessage(
          projectId, this.editingScheduledId, content,
          scheduledAt, this.recurrenceType, this.recurrenceDays)
      : this.chatService.createScheduledMessage(
          projectId, content, scheduledAt, this.recurrenceType, this.recurrenceDays);

    call$.subscribe({
      next: sm => {
        if (this.editingScheduledId) {
          this.scheduledMessages = this.scheduledMessages.map(m => m.id === sm.id ? sm : m);
        } else {
          this.scheduledMessages = [...this.scheduledMessages, sm];
        }
        this.newMessage         = '';
        this.schedulingContent  = '';
        this.editingScheduledId = null;
        this.sending            = false;
        this.resetScheduleForm();
        this.showNotifToast('✅ Message programmé avec succès', 'success');
        this.cdr.detectChanges();
      },
      error: () => { this.sending = false; alert('Erreur lors de la planification du message.'); }
    });
  }

  startEditScheduledMsg(sm: ScheduledMessage): void {
    this.showScheduledList  = false;
    this.editingScheduledId = sm.id;
    this.schedulingContent  = sm.content;
    const dt = new Date(sm.nextSendAt);
    this.scheduleMsgDate = dt.toISOString().split('T')[0];
    this.scheduleMsgTime = dt.toTimeString().slice(0, 5);
    this.recurrenceType  = sm.recurrenceType;
    this.recurrenceDays  = sm.recurrenceDays ? [...sm.recurrenceDays] : [];
  }

  cancelScheduledMessage(id: number): void {
    if (!this.selectedConv || !confirm('Annuler ce message programmé ?')) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.chatService.cancelScheduledMessage(projectId, id).subscribe({
      next: () => {
        this.scheduledMessages = this.scheduledMessages.filter(m => m.id !== id);
        this.cdr.detectChanges();
      }
    });
  }

  toggleRecurrenceDay(day: string): void {
    const idx = this.recurrenceDays.indexOf(day);
    if (idx >= 0) this.recurrenceDays = this.recurrenceDays.filter(d => d !== day);
    else          this.recurrenceDays = [...this.recurrenceDays, day];
  }

  isRecurrenceDay(day: string): boolean { return this.recurrenceDays.includes(day); }

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

  getScheduledCountdown(dateStr: string): string {
    const diff = Math.floor((new Date(dateStr).getTime() - this.scheduledNow.getTime()) / 1000);
    if (diff <= 0) return 'Envoi imminent...';
    if (diff < 60) return `Dans ${diff}s`;
    if (diff < 3600) return `Dans ${Math.floor(diff / 60)}min`;
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `Dans ${h}h${m > 0 ? ` ${m}min` : ''}`;
  }

  formatScheduledAt(dateStr: string): string {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
           + ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  }

  getRecurrenceChipStyle(type: string): Record<string, string> {
    const colors: Record<string, string> = {
      ONCE: '#64748b', DAILY: '#1d4ed8', WEEKDAYS: '#0f766e', WEEKLY: '#6d28d9', CUSTOM: '#c2410c'
    };
    const bg = colors[type] ?? '#64748b';
    return { background: bg + '33', color: bg, border: `1px solid ${bg}66` };
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 10. SHARED CONTENT PANEL
  // ══════════════════════════════════════════════════════════════════════════════

  loadSharedContent(): void {
    if (!this.selectedConv) return;
    this.sharedContent = {
      images: this.messages.filter(m => m.messageType === 'IMAGE'),
      files:  this.messages.filter(m => m.messageType === 'FILE'),
      links:  this.messages.filter(m => m.messageType === 'TEXT' && m.content?.match(/https?:\/\/\S+/))
    };
  }

  toggleSharedPanel(): void {
    this.showSharedPanel = !this.showSharedPanel;
    this.showPinnedPanel = false;
    if (this.showSharedPanel) this.loadSharedContent();
  }

  openImagePreview(msg: ChatMessage): void  { this.lightboxItem = msg; }
  closeImagePreview(): void               { this.lightboxItem = null; }

  extractLinks(content: string): string[] {
    return content.match(/https?:\/\/\S+/g) ?? [];
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 11. TTS / VOICE NOTIFICATIONS
  // ══════════════════════════════════════════════════════════════════════════════

  speakNotification(text: string): void {
    if (this.isSpeakingNotification || !this.ttsEnabled) return;
    this.isSpeakingNotification = true;
    const u    = new SpeechSynthesisUtterance(text);
    u.lang     = 'fr-FR';
    u.rate     = 1.0;
    u.volume   = 0.8;
    const pref = this.availableVoices.find(v => v.lang.startsWith('fr'));
    if (pref) u.voice = pref;
    u.onend = () => { this.isSpeakingNotification = false; };
    this.speechSynthesis.speak(u);
  }

  toggleTTS(): void {
    this.ttsEnabled = !this.ttsEnabled;
    if (this.ttsEnabled) this.speakNotification('Notifications vocales activées');
    else                 this.speechSynthesis.cancel();
  }

  speakMessage(msg: ChatMessage): void {
    const u  = new SpeechSynthesisUtterance(msg.content);
    u.lang   = 'fr-FR';
    this.speechSynthesis.speak(u);
  }

  private handleNotificationEvent(event: any): void {
    const typeMap: Record<string, { label: string; type: 'success' | 'warning' | 'error' }> = {
      SCHEDULED_SENT:     { label: `✅ Message envoyé — ${event.projectTitle || ''}`,          type: 'success' },
      SCHEDULED_REMINDER: { label: `⏰ Envoi dans 15 min — ${event.projectTitle || ''}`,       type: 'warning' },
      SCHEDULED_FAILED:   { label: `❌ Échec d'envoi — ${event.projectTitle || ''}`,           type: 'error'   },
      NEW_MESSAGE:        { label: `💬 Nouveau message — ${event.projectTitle || ''}`,          type: 'success' },
      MENTION:            { label: `🔔 Vous avez été mentionné — ${event.projectTitle || ''}`, type: 'warning' },
      MEETING_STARTED:    { label: `📹 Réunion démarrée — ${event.projectTitle || ''}`,        type: 'success' },
      MEETING_SCHEDULED:  { label: `📅 Réunion planifiée — ${event.projectTitle || ''}`,       type: 'success' },
      MEETING_REMINDER:   { label: `⏰ Rappel réunion — ${event.projectTitle || ''}`,          type: 'warning' },
      PURCHASE_REQUEST:   { label: `🛒 Demande d'achat — ${event.projectTitle || ''}`,         type: 'warning' },
      PURCHASE_ACCEPTED:  { label: `✅ Demande acceptée — ${event.projectTitle || ''}`,        type: 'success' },
      PURCHASE_REJECTED:  { label: `❌ Demande refusée — ${event.projectTitle || ''}`,         type: 'error'   },
    };
    const info = typeMap[event.type];
    if (!info) return;
    this.showNotifToast(info.label, info.type);
    if (this.ttsEnabled) this.speakNotification(info.label.replace(/[✅❌⏰💬🔔📹📅🛒]/g, ''));
  }

  private showNotifToast(message: string, type: 'success' | 'warning' | 'error'): void {
    this.notifToast = { message, type };
    setTimeout(() => { this.notifToast = null; this.cdr.detectChanges(); }, 5000);
    this.cdr.detectChanges();
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 12. FAVORITES
  // ══════════════════════════════════════════════════════════════════════════════

  toggleFavorite(conv: ConversationSummary, event: MouseEvent): void {
    event.stopPropagation();
    if (this.favoriteConvs.has(conv.roomKey)) this.favoriteConvs.delete(conv.roomKey);
    else                                      this.favoriteConvs.add(conv.roomKey);
    localStorage.setItem('favoriteConvs', JSON.stringify([...this.favoriteConvs]));
    this.cdr.detectChanges();
  }

  loadFavorites(): void {
    const saved = localStorage.getItem('favoriteConvs');
    if (saved) { try { this.favoriteConvs = new Set(JSON.parse(saved)); } catch {} }
  }

  isFavorite(conv: ConversationSummary): boolean { return this.favoriteConvs.has(conv.roomKey); }

  // ══════════════════════════════════════════════════════════════════════════════
  // 13. MEETING (ZegoCloud)
  // ══════════════════════════════════════════════════════════════════════════════

  openMeetingModal(): void {
    this.meetingTitle     = '';
    this.aiSummary        = null;
    this.showMeetingModal = true;
    this.showMeetingMenu  = false;
  }

  openScheduleMeetingForm(): void {
    this.showMeetingMenu  = false;
    this.showScheduleForm = true;
    this.scheduleSubject  = '';
    this.scheduleDate     = '';
    this.scheduleTime     = '';
  }

  submitScheduleMeeting(): void {
    if (!this.scheduleDate || !this.scheduleTime || !this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.isCreatingMeeting = true;
    const scheduledAt = `${this.scheduleDate}T${this.scheduleTime}:00`;
    const clientId = this.selectedConv.otherUserId;

    this.meetingService.schedule(projectId, this.scheduleSubject || 'Réunion planifiée', scheduledAt, clientId).subscribe({
      next: () => {
        this.isCreatingMeeting = false;
        this.showScheduleForm  = false;
        this.showNotifToast('📅 Réunion planifiée avec succès', 'success');
      },
      error: (e) => { this.isCreatingMeeting = false; alert(e.error || 'Erreur lors de la planification.'); }
    });
  }

  createMeeting(): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.meetingLoading    = true;
    this.isCreatingMeeting = true;

    this.meetingService.startInstant(projectId).subscribe({
      next: meeting => {
        this.meetingLoading    = false;
        this.isCreatingMeeting = false;
        this.showMeetingModal  = false;
        // Navigate to the meeting room (opens meet-room component with ZegoCloud)
        this.router.navigate(['/meet', meeting.roomId]);
      },
      error: () => { this.meetingLoading = false; this.isCreatingMeeting = false; }
    });
  }

  /** Called from the "Rejoindre" button on a MEETING_INVITE / MEETING_LINK card */
  joinMeetingFromChat(roomId: string): void {
    if (roomId) {
      this.router.navigate(['/meet', roomId]);
    }
  }

  /** Legacy — kept for backward compat, delegates to navigate */
  joinMeeting(roomId: string): void {
    this.joinMeetingFromChat(roomId);
  }

  createPermanentLink(): void {
    if (!this.selectedConv) return;
    const [projectId] = this.parseRoomKey(this.selectedConv.roomKey);
    this.showMeetingMenu   = false;
    this.isCreatingMeeting = true;
    this.meetingService.createLink(projectId).subscribe({
      next: m => {
        this.isCreatingMeeting = false;
        const url = `${window.location.origin}/meet/${m.roomId}`;
        navigator.clipboard.writeText(url).catch(() => {});
        this.showNotifToast('🔗 Lien réunion copié dans le presse-papiers', 'success');
      },
      error: e => { this.isCreatingMeeting = false; alert(e.error || 'Erreur lors de la création.'); }
    });
  }

  onVideoLeave(): void {
    if (this.isOrganizer && this.activeVideoRoomId) {
      this.meetingService.end(this.activeVideoRoomId).subscribe({ error: () => {} });
    }
    this.activeVideo       = null;
    this.activeVideoRoomId = '';
  }

  parseMeetingData(content: string): any {
    if (!content) return {};
    try {
      const i = content.indexOf('{');
      if (i < 0) return {};
      const obj = JSON.parse(content.slice(i));
      // Normalize: MEETING_INVITE/LINK use roomId; MEETING_SUMMARY uses meetingId + summary
      return obj;
    } catch { return {}; }
  }

  dismissSummary(): void { this.aiSummary = null; }

  // ══════════════════════════════════════════════════════════════════════════════
  // SEARCH & FILTER
  // ══════════════════════════════════════════════════════════════════════════════

  get filteredConversations(): ConversationSummary[] {
    let list = [...this.conversations];

    if (this.filterMode === 'unread') {
      list = list.filter(c => (c.unreadCount ?? 0) > 0);
    } else if (this.filterMode === 'favorites') {
      list = list.filter(c => this.favoriteConvs.has(c.roomKey));
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(c =>
        c.otherUserName?.toLowerCase().includes(q) ||
        c.projectTitle?.toLowerCase().includes(q)  ||
        c.lastMessage?.toLowerCase().includes(q)
      );
    }
    return list;
  }

  setFilter(mode: 'all' | 'unread' | 'favorites'): void { this.filterMode = mode; }

  // ══════════════════════════════════════════════════════════════════════════════
  // KEYBOARD & INPUT
  // ══════════════════════════════════════════════════════════════════════════════

  onKeydown(e: KeyboardEvent): void {
    if (this.showMentionDropdown && this.mentionSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.mentionSelectedIndex = Math.min(this.mentionSelectedIndex + 1, this.mentionSuggestions.length - 1);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.mentionSelectedIndex = Math.max(this.mentionSelectedIndex - 1, 0);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectMention(this.mentionSuggestions[this.mentionSelectedIndex]);
        return;
      }
      if (e.key === 'Escape') { this.showMentionDropdown = false; return; }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
    if (e.key === 'Escape') {
      this.showMentionDropdown = false;
      this.closeEmojiPicker();
    }
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // UTILITIES
  // ══════════════════════════════════════════════════════════════════════════════

  private parseRoomKey(roomKey: string): [number, number] {
    const parts = roomKey.split('_');
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
  }

  private sortConversations(): void {
    this.conversations.sort((a, b) => {
      const ta = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
      const tb = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
      return tb - ta;
    });
  }

  private watchOnlineStatuses(): void {
    this.conversations.forEach(conv => {
      if (!this.statusSubs.has(conv.otherUserId)) {
        this.privateChatService.getUserStatus(conv.otherUserId).subscribe({
          next: s => { conv.otherUserOnline = s.online; this.cdr.detectChanges(); },
          error: () => {}
        });
        const sub = this.privateChatService.watchUserStatus(conv.otherUserId).subscribe(status => {
          conv.otherUserOnline = status.online;
          this.cdr.detectChanges();
        });
        this.statusSubs.set(conv.otherUserId, sub);
      }
    });
  }

  private scrollToBottom(): void {
    try { this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' }); } catch {}
  }

  private adjustTextarea(): void {
    const ta = this.msgInput?.nativeElement;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
  }

  renderContent(content: string): SafeHtml {
    if (!content) return '';
    return this.sanitizer.bypassSecurityTrustHtml(
      content.replace(/@([\w\s]+?)(?=\s|$)/g, '<span class="mention">@$1</span>')
    );
  }

  isMe(msg: ChatMessage): boolean   { return msg.senderId === this.authService.currentUser?.id; }
  canEdit(msg: ChatMessage): boolean { return this.isMe(msg) && msg.messageType === 'TEXT'; }
  canDelete(msg: ChatMessage): boolean { return this.isMe(msg); }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatTime(date: string | null): string {
    if (!date) return '';
    const d    = new Date(date);
    const diff = this.nowMs - d.getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins  <  1) return 'À l\'instant';
    if (mins  < 60) return `${mins}min`;
    if (hours < 24) return `${hours}h`;
    if (days  === 1) return 'Hier';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  formatMsgTime(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  getTotalUnread(): number {
    return this.conversations.reduce((sum, c) => sum + (c.unreadCount ?? 0), 0);
  }

  isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
  }

  openFile(url: string): void { window.open(url, '_blank'); }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('chat_dark_mode', String(this.isDarkMode));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // ── Members panel ────────────────────────────────────────────────────────────

  openMembersPanel(): void {
    this.showMembersPanel = !this.showMembersPanel;
    if (this.showMembersPanel) this.loadParticipants();
  }

  getMemberRole(participant: ProjectParticipant): string {
    return participant.role ?? 'Membre';
  }

  isOnline(name: string): boolean {
    return this.onlineUsers.has(name);
  }
}
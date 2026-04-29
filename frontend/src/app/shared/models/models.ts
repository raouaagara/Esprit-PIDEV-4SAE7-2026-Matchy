export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CLIENT' | 'ORGANIZER';
}

export interface AuthResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  role: 'CLIENT' | 'ORGANIZER';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  status: 'AVAILABLE' | 'SOLD_OUT';
  soldCount: number;
  organizerId: number;
  organizerName: string;
  organizerAvatar?: string;
  createdAt: string;
  unreadCount?: number;
  purchaseStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | null;
}

export interface MessageReaction {
  id: number;
  userId: number;
  userName: string;
  emoji: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  senderRole: 'CLIENT' | 'ORGANIZER';
  projectId: number;
  clientId?: number;
  sentAt: string;
  read?: boolean;
  readBy?: number[];
  messageType: 'TEXT' | 'FILE' | 'IMAGE' | 'VOICE' | 'VIDEO' | 'MEETING_INVITE' | 'MEETING_SUMMARY' | 'MEETING_LINK';
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  originalContent?: string;
  detectedLanguage?: string;
  scheduledAt?: string;
  scheduleSent?: boolean;
  pinned?: boolean;
  pinnedAt?: string;
  pinnedByName?: string;
  edited?: boolean;
  editedAt?: string;
  reactions?: MessageReaction[];
  deleted?: boolean;
  // UI-only state
  translatedContent?: string;
  translatedFromLang?: string;
  translatedToLang?: string;
  showOriginal?: boolean;
  isTranslating?: boolean;
  showLangPicker?: boolean;
}

export interface Meeting {
  id: number;
  roomId: string;
  subject: string;
  type: 'INSTANT' | 'SCHEDULED' | 'LINK';
  status: 'WAITING' | 'ACTIVE' | 'ENDED';
  meetingUrl?: string;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  organizerId: number;
  organizerName: string;
  projectId: number;
  token?: string;
  appId: number;
}

export interface MeetingJoinResponse {
  meetingUrl?: string;
  meetingId: number;
  roomId: string;
  subject: string;
  token: string;
  appId: number;
  projectId?: number;
}

export interface AppNotification {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  projectId: number;
  projectTitle: string;
  messageId: number;
  type: 'NEW_MESSAGE' | 'MENTION' | 'PURCHASE_REQUEST' | 'PURCHASE_ACCEPTED' | 'PURCHASE_REJECTED'
      | 'MEETING_STARTED' | 'MEETING_SCHEDULED' | 'MEETING_REMINDER'|'MEETING_CANCELLED' | 'MEETING_UPDATED';
  read: boolean;
  createdAt: string;
}
export interface AgendaMeeting {
  id: number;
  title: string;
  notes?: string;
  scheduledAt: string;
  durationMinutes: number;
  clientId: number;
  clientName: string;
  organizerId: number;
  organizerName: string;
  projectId?: number;
  projectTitle?: string;
  status: 'SCHEDULED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface AgendaMeetingRequest {
  title: string;
  notes?: string;
  scheduledAt: string;
  durationMinutes: number;
  clientId: number;
  projectId?: number;
}

export interface AgendaClient {
  id: number;
  name: string;
  email: string;
}
export interface Purchase {
  id: number;
  clientId: number;
  clientName: string;
  clientEmail: string;
  projectId: number;
  projectTitle: string;
  projectPrice: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  message: string;
  requestedAt: string;
  acceptedAt?: string;
}

export interface ProjectParticipant {
  id: number;
  name: string;
  role: string;
}

// ── Transcription / IA Réunion ────────────────────────────────────────────

// Reçu depuis le backend via /topic/subtitles/{roomId}
export interface SubtitleBroadcast {
  speakerName:  string;
  speakerId:    string;
  originalText: string;
  sourceLang:   string;
  translations: { [userId: string]: string }; // userId → texte traduit
  timestamp:    number;
}

// Version enrichie côté UI (avec les champs calculés par le composant)
export interface SubtitleMessage extends SubtitleBroadcast {
  translatedText:  string;   // extrait de translations[currentUserId]
  isMine:          boolean;
  showTranslation: boolean;
}

export interface AudioChunkResponse {
  transcribedText: string;
  sourceLang: string;
}

export interface MeetingAIResult {
  summary: string;
  tasks: string[];
  deadlines: string[];
  decisions: string[];
}

export type RecurrenceType = 'ONCE' | 'DAILY' | 'WEEKLY' | 'WEEKDAYS' | 'CUSTOM';
export type ScheduledMessageStatus = 'PENDING' | 'SENT' | 'CANCELLED' | 'FAILED';

export interface ScheduledMessage {
  id: number;
  projectId: number;
  projectTitle: string;
  senderId: number;
  senderName: string;
  content: string;
  scheduledAt: string;
  nextSendAt: string;
  recurrenceType: RecurrenceType;
  recurrenceDays?: string[];
  status: ScheduledMessageStatus;
  createdAt: string;
}

export interface FileUploadResponse {
  url: string;
  publicId: string;
  resourceType: string;
  originalName: string;
}

export interface PrivateChatMessage {
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  projectId: number;
  roomKey: string;
  sentAt: string;
  read?: boolean;
  readBy?: number[];
}

export interface ConversationSummary {
  projectId: number;
  projectTitle: string;
  roomKey: string;
  otherUserId: number;
  otherUserName: string;
  otherUserOnline: boolean;
    otherUserAvatar?: string | null;  // ← ajouter cette ligne
  lastMessage: string | null;
  lastMessageTime: string | null;
  unreadCount: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalSold: number;
  totalRevenue: number;
  pendingPurchases: number;
  categoryStats: CategoryStat[];
}

export interface CategoryStat {
  category: string;
  count: number;
}

///

package com.marketplace.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class Dtos {

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class GoogleAuthRequest {
        private String credential;  // Google ID token
        private String role;        // CLIENT or ORGANIZER (for new users only)
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class AuthResponse {
        private String token;
        private Long id;
        private String name;
        private String email;
        private String role;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ProjectRequest {
        private String title;
        private String description;
        private BigDecimal price;
        private String category;
        private String imageUrl;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ProjectResponse {
        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private String category;
        private String imageUrl;
        private String status;
        private Integer soldCount;
        private Long organizerId;
        private String organizerName;
        private String organizerAvatar;
        private LocalDateTime createdAt;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ChatMessageRequest {
        private String content;
        private Long projectId;
        private String messageType;
        private String fileUrl;
        private String fileName;
        private String fileType;
        private String originalContent;
        private String detectedLanguage;
        private Long clientId;
    }

    @Data @NoArgsConstructor
    public static class ChatMessageResponse {
        private Long id;
        private String content;
        private Long senderId;
        private String senderName;
        private String senderRole;
        private Long projectId;
        private LocalDateTime sentAt;
        private String messageType;
        private String fileUrl;
        private String fileName;
        private String fileType;
        private String originalContent;
        private String detectedLanguage;
        private LocalDateTime scheduledAt;
        private boolean scheduleSent;
        private boolean pinned;
        private LocalDateTime pinnedAt;
        private String pinnedByName;
        private boolean edited;
        private LocalDateTime editedAt;
        private List<MessageReactionDto> reactions = new java.util.ArrayList<>();
        private boolean deleted;
        private Long clientId;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MessageReactionDto {
        private Long id;
        private Long userId;
        private String userName;
        private String emoji;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class TranslationRequestDto {
        private String text;
        private String sourceLang;
        private String targetLang;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class TranslationResponseDto {
        private String translatedText;
        private String detectedLanguage;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class DetectionRequestDto {
        private String text;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class NotificationResponse {
        private Long id;
        private Long senderId;
        private String senderName;
        private String content;
        private Long projectId;
        private String projectTitle;
        private Long messageId;
        private String type;
        private boolean read;
        private LocalDateTime createdAt;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class UnreadCountResponse {
        private Long projectId;
        private long count;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ProjectParticipant {
        private Long id;
        private String name;
        private String role;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class FileUploadResponse {
        private String url;
        private String publicId;
        private String resourceType;
        private String originalName;
    }

    // ── Purchase DTOs ─────────────────────────────────────
    @Data @AllArgsConstructor @NoArgsConstructor
    public static class PurchaseRequestDto {
        private Long projectId;
        private String message;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class PurchaseResponse {
        private Long id;
        private Long clientId;
        private String clientName;
        private String clientEmail;
        private Long projectId;
        private String projectTitle;
        private BigDecimal projectPrice;
        private String status;
        private String message;
        private LocalDateTime requestedAt;
        private LocalDateTime acceptedAt;
    }

    // ── Dashboard ─────────────────────────────────────────
    @Data @AllArgsConstructor @NoArgsConstructor
    public static class DashboardStats {
        private Long totalProjects;
        private Integer totalSold;
        private BigDecimal totalRevenue;
        private Long pendingPurchases;
        private List<CategoryStat> categoryStats;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class CategoryStat {
        private String category;
        private Long count;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ScheduledMessageRequest {
        private Long projectId;
        private String content;
        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime scheduledAt;
        private String recurrenceType;
        private List<String> recurrenceDays;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ScheduledMessageDTO {
        private Long id;
        private Long projectId;
        private String projectTitle;
        private Long senderId;
        private String senderName;
        private String content;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime scheduledAt;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime nextSendAt;
        private String recurrenceType;
        private List<String> recurrenceDays;
        private String status;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
    }

    // ── Transcription / IA Réunion ────────────────────────

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class AudioChunkResponse {
        private String transcribedText;
        private String translatedText;
        private String error;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class TranscriptFinalizeRequest {
        private String roomId;
        private Long projectId;
        private String fullTranscript;
        private List<String> speakers;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingAIResult {
        private String summary;
        private List<String> tasks;
        private List<String> deadlines;
        private List<String> decisions;
    }

    // ── Private Chat DTOs ─────────────────────────────────

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class PrivateChatMessageRequest {
        private String content;
        private Long receiverId;
        private Long projectId;
        private String roomKey;
    }

    @Data @NoArgsConstructor
    public static class PrivateChatMessageResponse {
        private Long id;
        private String content;
        private Long senderId;
        private String senderName;
        private Long receiverId;
        private String receiverName;
        private Long projectId;
        private String roomKey;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime sentAt;
        private boolean read;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ConversationSummary {
        private String roomKey;
        private Long otherUserId;
        private String otherUserName;
        private Long projectId;
        private String projectTitle;
        private String lastMessage;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime lastMessageTime;
        private long unreadCount;
        private boolean otherUserOnline;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class UserStatusRequest {
        private boolean online;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class UserStatusResponse {
        private Long userId;
        private boolean online;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime lastSeen;
    }

    // ── Meeting DTOs ──────────────────────────────────────
    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingInstantRequest {
        private Long projectId;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingScheduleRequest {
        private Long projectId;
        private String subject;
        @JsonDeserialize(using = LocalDateTimeDeserializer.class)
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime scheduledAt;
        private Long clientId; // optional: if set, creates AgendaMeeting entry
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingLinkRequest {
        private Long projectId;
        private String subject;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingResponse {
        private Long id;
        private String roomId;
        private String subject;
        private String type;
        private String status;
        private String meetingUrl;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime scheduledAt;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime startedAt;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime endedAt;
        private Long organizerId;
        private String organizerName;
        private Long projectId;
        private String token;
        private int appId;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class MeetingJoinResponse {
        private Long meetingId;
        private String roomId;
        private String subject;
        private String token;
        private int appId;
        private Long projectId;
    }


    // ── Agenda DTOs ───────────────────────────────────────
    @Data @AllArgsConstructor @NoArgsConstructor
    public static class AgendaMeetingRequest {
        private String title;
        private String notes;
        private String scheduledAt; // ISO-8601 e.g. "2026-04-24T14:00:00"
        private int durationMinutes;
        private Long clientId;
        private Long projectId;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class AgendaMeetingResponse {
        private Long id;
        private String title;
        private String notes;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime scheduledAt;
        private int durationMinutes;
        private Long clientId;
        private String clientName;
        private Long organizerId;
        private String organizerName;
        private Long projectId;
        private String projectTitle;
        private String status;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
        @JsonSerialize(using = LocalDateTimeSerializer.class)
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime updatedAt;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class AgendaClientDto {
        private Long id;
        private String name;
        private String email;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TranscriptionChunkResponse {
        private String transcribedText;
        private String sourceLang;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SubtitleBroadcast {
        private String speakerName;
        private String speakerId;
        private String originalText;
        private String sourceLang;
        private Map<String, String> translations; // userId -> translatedText
        private long timestamp;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class ParticipantRegisterRequest {
        private String roomId;
        private String userId;
        private String preferredLang;
    }
}

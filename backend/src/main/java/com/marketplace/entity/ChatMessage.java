package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "sent_at")
    private LocalDateTime sentAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "message_type", length = 20)
    private MessageType messageType = MessageType.TEXT;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "original_content", columnDefinition = "TEXT")
    private String originalContent;

    @Column(name = "detected_language", length = 10)
    private String detectedLanguage;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "schedule_sent", nullable = false, columnDefinition = "TINYINT(1) NOT NULL DEFAULT 0")
    private boolean scheduleSent = false;

    @Column(nullable = false, columnDefinition = "TINYINT(1) NOT NULL DEFAULT 0")
    private boolean pinned = false;

    @Column(name = "pinned_at")
    private LocalDateTime pinnedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pinned_by_id")
    private User pinnedBy;

    @Column(nullable = false, columnDefinition = "TINYINT(1) NOT NULL DEFAULT 0")
    private boolean edited = false;

    @Column(name = "edited_at")
    private LocalDateTime editedAt;

    // Isolates this message to a specific client's conversation
    // Set automatically when sender is CLIENT; passed by ORGANIZER when replying
    @Column(name = "client_id")
    private Long clientId;

    public enum MessageType {
        TEXT, FILE, IMAGE, VOICE, VIDEO,
        MEETING_INVITE, MEETING_SUMMARY, MEETING_LINK
    }
}

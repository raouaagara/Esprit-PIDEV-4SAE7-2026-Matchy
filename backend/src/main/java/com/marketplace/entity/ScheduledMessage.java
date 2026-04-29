package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "scheduled_messages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ScheduledMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Column(nullable = false)
    private LocalDateTime nextSendAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecurrenceType recurrenceType;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "scheduled_message_days",
            joinColumns = @JoinColumn(name = "scheduled_message_id"))
    @Column(name = "day_of_week")
    private List<String> recurrenceDays;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduledMessageStatus status;

    @Column(nullable = false)
    private boolean reminderSent;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = ScheduledMessageStatus.PENDING;
        if (recurrenceType == null) recurrenceType = RecurrenceType.ONCE;
    }
}

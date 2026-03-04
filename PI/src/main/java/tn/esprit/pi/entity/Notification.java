package tn.esprit.pi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Column(name = "reference_id")
    private Long referenceId; // ID of related entity (application, submission, etc.)

    @Column(name = "is_read")
    private Boolean isRead = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum NotificationType {
        APPLICATION_RECEIVED,
        APPLICATION_ACCEPTED,
        APPLICATION_REJECTED,
        INTERVIEW_SCHEDULED,
        INTERVIEW_CONFIRMED,
        SUBMISSION_RECEIVED,
        SUBMISSION_REVIEWED,
        MILESTONE_ASSIGNED,
        PROJECT_UPDATE,
        MESSAGE_RECEIVED,
        CONTRACT_RECEIVED,
        CONTRACT_SIGNED,
        CONTRACT_TERMINATED
    }
}

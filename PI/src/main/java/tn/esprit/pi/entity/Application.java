// src/main/java/tn/esprit/pi/entity/Application.java
package tn.esprit.pi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "freelancer_id", nullable = false)
    private User freelancer;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    private Double proposedBudget;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


    // src/main/java/tn/esprit/pi/entity/Application.java
// Add these fields to existing Application class

    @Column(name = "interview_date")
    private LocalDateTime interviewDate;

    @Column(name = "meet_link")
    private String meetLink;

    @Column(name = "company_feedback")
    private String companyFeedback;

    @Column(name = "freelancer_confirmed")
    private Boolean freelancerConfirmed = false;



    // In Application.java, keep only this enum (remove the old one)
    public enum ApplicationStatus {
        PENDING,
        INTERVIEW_SCHEDULED,
        INTERVIEW_CONFIRMED,
        ACCEPTED,
        REJECTED
    }
}
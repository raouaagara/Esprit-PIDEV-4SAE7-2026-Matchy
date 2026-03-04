package org.example.contentservice.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString(exclude = "assessment")
@AllArgsConstructor
@NoArgsConstructor
public class Content implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contentId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ContentType type;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Integer authorId;

    @OneToOne(mappedBy = "content", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Assessment assessment;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ContentType {
        COURS, ARTICLE, VIDEO
    }
}
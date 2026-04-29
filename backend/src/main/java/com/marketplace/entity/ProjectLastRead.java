package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_last_reads",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "project_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectLastRead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "last_read_at")
    private LocalDateTime lastReadAt = LocalDateTime.now();
}

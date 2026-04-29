package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "message_reactions",
       uniqueConstraints = @UniqueConstraint(columnNames = {"message_id", "user_id"}))
@Getter @Setter @AllArgsConstructor @Builder
public final class MessageReaction {

    // JPA requires a no-args constructor; written manually so @Builder + @AllArgsConstructor don't produce a duplicate.
    protected MessageReaction() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "message_id", nullable = false)
    private ChatMessage message;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 10)
    private String emoji;
}

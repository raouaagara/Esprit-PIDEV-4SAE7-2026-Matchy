package com.marketplace.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_online_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserOnlineStatus {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "is_online")
    private boolean online = false;

    @Column(name = "last_seen")
    private LocalDateTime lastSeen = LocalDateTime.now();
}

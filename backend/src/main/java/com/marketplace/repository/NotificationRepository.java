package com.marketplace.repository;

import com.marketplace.entity.Notification;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);

    long countByRecipientAndReadFalse(User recipient);

    @Transactional
    @Modifying
    @Query("UPDATE Notification n SET n.read = true WHERE n.recipient = :recipient")
    void markAllReadByRecipient(@Param("recipient") User recipient);
}

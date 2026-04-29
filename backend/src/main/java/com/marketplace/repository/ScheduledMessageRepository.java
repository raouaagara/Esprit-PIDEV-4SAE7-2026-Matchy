package com.marketplace.repository;

import com.marketplace.entity.Project;
import com.marketplace.entity.ScheduledMessage;
import com.marketplace.entity.ScheduledMessageStatus;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduledMessageRepository extends JpaRepository<ScheduledMessage, Long> {

    List<ScheduledMessage> findByProjectAndStatusOrderByNextSendAtAsc(Project project, ScheduledMessageStatus status);

    List<ScheduledMessage> findByStatusAndNextSendAtLessThanEqual(ScheduledMessageStatus status, LocalDateTime now);

    List<ScheduledMessage> findBySenderAndStatus(User sender, ScheduledMessageStatus status);

    List<ScheduledMessage> findByStatusAndNextSendAtBetweenAndReminderSentFalse(
            ScheduledMessageStatus status, LocalDateTime from, LocalDateTime to);
}

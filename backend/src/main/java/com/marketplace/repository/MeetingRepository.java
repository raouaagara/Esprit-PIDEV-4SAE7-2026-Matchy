package com.marketplace.repository;

import com.marketplace.entity.Meeting;
import com.marketplace.entity.Meeting.MeetingStatus;
import com.marketplace.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    Optional<Meeting> findByRoomId(String roomId);

    List<Meeting> findByProjectOrderByCreatedAtDesc(Project project);

    @Query("""
        SELECT m FROM Meeting m
        WHERE m.type = 'SCHEDULED'
          AND m.status = 'WAITING'
          AND m.reminderSent = false
          AND m.scheduledAt BETWEEN :from AND :to
    """)
    List<Meeting> findMeetingsForReminder(
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to);
}

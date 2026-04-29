package com.marketplace.repository;

import com.marketplace.entity.AgendaMeeting;
import com.marketplace.entity.AgendaMeeting.AgendaStatus;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AgendaMeetingRepository extends JpaRepository<AgendaMeeting, Long> {

    List<AgendaMeeting> findByOrganizerOrderByScheduledAtAsc(User organizer);

    List<AgendaMeeting> findByClientOrderByScheduledAtAsc(User client);

    List<AgendaMeeting> findByOrganizerAndScheduledAtBetweenAndStatus(
            User organizer, LocalDateTime from, LocalDateTime to, AgendaStatus status);

    @Query("SELECT m FROM AgendaMeeting m WHERE m.status = 'SCHEDULED' " +
           "AND m.scheduledAt BETWEEN :from AND :to " +
           "AND (m.reminderSentOrganizer = false OR m.reminderSentClient = false)")
    List<AgendaMeeting> findMeetingsForReminder(@Param("from") LocalDateTime from,
                                                @Param("to") LocalDateTime to);

    @Query("SELECT m FROM AgendaMeeting m WHERE m.status = 'SCHEDULED' " +
           "AND m.scheduledAt BETWEEN :from AND :to " +
           "AND m.reminder1DaySent = false")
    List<AgendaMeeting> findMeetingsForDayReminder(@Param("from") LocalDateTime from,
                                                   @Param("to") LocalDateTime to);

    @Query("SELECT m FROM AgendaMeeting m WHERE m.status = 'SCHEDULED' " +
           "AND m.scheduledAt BETWEEN :from AND :to " +
           "AND (m.reminderSentOrganizer = false OR m.reminderSentClient = false)")
    List<AgendaMeeting> findMeetingsFor15MinEmailReminder(@Param("from") LocalDateTime from,
                                                          @Param("to") LocalDateTime to);
}

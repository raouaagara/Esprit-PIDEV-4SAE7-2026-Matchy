package com.marketplace.repository;

import com.marketplace.entity.ChatMessage;
import com.marketplace.entity.Project;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByProjectOrderBySentAtAsc(Project project);

    @Query("SELECT m FROM ChatMessage m WHERE m.project = :project AND " +
           "(m.scheduledAt IS NULL OR m.scheduleSent = true OR m.sender.id = :userId) " +
           "ORDER BY m.sentAt ASC")
    List<ChatMessage> findVisibleMessages(@Param("project") Project project, @Param("userId") Long userId);

    @Query("SELECT m FROM ChatMessage m WHERE m.project = :project AND " +
           "(m.clientId IS NULL OR m.clientId = :clientId) AND " +
           "(m.scheduledAt IS NULL OR m.scheduleSent = true OR m.sender.id = :userId) " +
           "ORDER BY m.sentAt ASC")
    List<ChatMessage> findVisibleMessagesForClient(@Param("project") Project project,
            @Param("userId") Long userId, @Param("clientId") Long clientId);

    @Query("SELECT DISTINCT m.clientId FROM ChatMessage m WHERE m.project = :project AND m.clientId IS NOT NULL")
    List<Long> findClientIdsByProject(@Param("project") Project project);

    Optional<ChatMessage> findFirstByProjectAndClientIdOrderBySentAtDesc(Project project, Long clientId);

    long countByProjectAndSentAtAfter(Project project, LocalDateTime after);

    @Query("SELECT DISTINCT m.sender FROM ChatMessage m WHERE m.project = :project AND m.sender <> :exclude")
    List<User> findParticipantsByProject(@Param("project") Project project, @Param("exclude") User exclude);

    @Query("SELECT COUNT(m) FROM ChatMessage m WHERE m.project = :project AND m.clientId = :clientId " +
           "AND m.sender.id <> :organizerId AND m.sentAt > :since")
    long countUnreadForConversation(@Param("project") Project project,
                                    @Param("clientId") Long clientId,
                                    @Param("organizerId") Long organizerId,
                                    @Param("since") LocalDateTime since);

    List<ChatMessage> findByProjectAndPinnedTrue(Project project);

    @Query("SELECT m FROM ChatMessage m WHERE m.project = :project " +
           "AND (m.fileUrl IS NOT NULL OR m.content LIKE '%http%')")
    List<ChatMessage> findCandidateSharedContent(@Param("project") Project project);
}

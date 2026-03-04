package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Message;
import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    List<Message> findByProjectOrderByCreatedAtAsc(Project project);
    
    @Query("SELECT m FROM Message m WHERE m.project.id = :projectId " +
           "AND ((m.sender.id = :userId) OR (m.receiver.id = :userId OR m.receiver IS NULL)) " +
           "ORDER BY m.createdAt ASC")
    List<Message> findChatThread(@Param("projectId") Long projectId, @Param("userId") Long userId);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver.id = :userId AND m.isRead = false")
    Long countUnreadMessages(@Param("userId") Long userId);
    
    @Query("SELECT DISTINCT m.project FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId")
    List<Project> findUserChatProjects(@Param("userId") Long userId);
    
    List<Message> findByReceiverAndIsReadFalse(User receiver);
}

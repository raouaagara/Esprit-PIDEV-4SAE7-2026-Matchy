package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Notification;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndIsReadOrderByCreatedAtDesc(User user, Boolean isRead);
    Long countByUserAndIsRead(User user, Boolean isRead);
}

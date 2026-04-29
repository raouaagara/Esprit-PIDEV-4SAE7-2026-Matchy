package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.Notification;
import com.marketplace.entity.Notification.NotificationType;
import com.marketplace.entity.User;
import com.marketplace.repository.NotificationRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    public void sendNotification(User recipient, User sender, String content,
                                  Long projectId, String projectTitle, Long messageId,
                                  NotificationType type) {
        Notification notif = new Notification();
        notif.setRecipient(recipient);
        notif.setSender(sender);
        notif.setContent(content);
        notif.setProjectId(projectId);
        notif.setProjectTitle(projectTitle);
        notif.setMessageId(messageId);
        notif.setNotificationType(type);
        Notification saved = notificationRepository.save(notif);

        NotificationResponse response = toResponse(saved);
        messagingTemplate.convertAndSend("/topic/notifications/" + recipient.getId(), response);
    }

    public List<NotificationResponse> getNotifications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByRecipientOrderByCreatedAtDesc(user)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public long getUnreadCount(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.countByRecipientAndReadFalse(user);
    }

    @Transactional
    public void markRead(Long notifId, String userEmail) {
        notificationRepository.findById(notifId).ifPresent(n -> {
            if (n.getRecipient().getEmail().equals(userEmail)) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        });
    }

    @Transactional
    public void markAllRead(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        notificationRepository.markAllReadByRecipient(user);
    }

    private NotificationResponse toResponse(Notification n) {
        return new NotificationResponse(
                n.getId(),
                n.getSender() != null ? n.getSender().getId() : null,
                n.getSender() != null ? n.getSender().getName() : "Système",
                n.getContent(),
                n.getProjectId(),
                n.getProjectTitle(),
                n.getMessageId(),
                n.getNotificationType() != null ? n.getNotificationType().name() : "NEW_MESSAGE",
                n.isRead(),
                n.getCreatedAt());
    }
}

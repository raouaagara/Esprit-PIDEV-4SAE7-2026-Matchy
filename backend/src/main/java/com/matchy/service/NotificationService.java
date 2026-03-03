package com.matchy.service;

import com.matchy.entity.Notification;
import com.matchy.entity.User;
import com.matchy.repository.NotificationRepository;
import com.matchy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired private NotificationRepository notificationRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private UserRepository userRepository;

    public List<Notification> getForUser(Long userId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnread(Long userId) {
        return notificationRepository.findByRecipientIdAndReadFalse(userId);
    }

    public long countUnread(Long userId) {
        return notificationRepository.countByRecipientIdAndReadFalse(userId);
    }

    public Notification create(Notification n) {
        try {
            Notification saved = notificationRepository.save(n);
            System.out.println("[NOTIF] Saved notification id=" + saved.getId() + " to userId=" + saved.getRecipientId() + " | " + saved.getTitle());
            try {
                messagingTemplate.convertAndSend("/topic/notifications/" + n.getRecipientId(), saved);
            } catch (Exception e) {
                System.out.println("[NOTIF] WebSocket skipped: " + e.getMessage());
            }
            return saved;
        } catch (Exception e) {
            System.err.println("[NOTIF] ERROR saving notification: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unread = notificationRepository.findByRecipientIdAndReadFalse(userId);
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    public void delete(Long id) { notificationRepository.deleteById(id); }

    // ─── Nouveau projet → notifier tous les FREELANCERS ───
    public void notifyNewProjectToFreelancers(String projectTitle, Long projectId) {
        try {
            List<User> freelancers = userRepository.findByRole(User.Role.FREELANCER);
            System.out.println("[NOTIF] Found " + freelancers.size() + " freelancers to notify for project: " + projectTitle);
            for (User freelancer : freelancers) {
                Notification n = new Notification();
                n.setRecipientId(freelancer.getId());
                n.setRecipientEmail(freelancer.getEmail());
                n.setTitle("New Project Available 🚀");
                n.setMessage("A new project has been posted: \"" + projectTitle + "\"");
                n.setType(Notification.NotificationType.PROJECT_CREATED);
                n.setRelatedEntityId(String.valueOf(projectId));
                n.setRelatedEntityType("PROJECT");
                create(n);
            }
        } catch (Exception e) {
            System.err.println("[NOTIF] ERROR in notifyNewProjectToFreelancers: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ─── Candidature envoyée → notifier le CLIENT ───
    public void notifyProposalReceived(Long clientId, String clientEmail, String freelancerName, String projectTitle) {
        try {
            Notification n = new Notification();
            n.setRecipientId(clientId);
            n.setRecipientEmail(clientEmail);
            n.setTitle("New Proposal Received 📝");
            n.setMessage(freelancerName + " submitted a proposal for: \"" + projectTitle + "\"");
            n.setType(Notification.NotificationType.PROPOSAL_RECEIVED);
            create(n);
        } catch (Exception e) {
            System.err.println("[NOTIF] ERROR in notifyProposalReceived: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ─── Candidature acceptée → notifier le FREELANCER ───
    public void notifyProposalAccepted(Long freelancerId, String freelancerEmail, String projectTitle) {
        try {
            Notification n = new Notification();
            n.setRecipientId(freelancerId);
            n.setRecipientEmail(freelancerEmail);
            n.setTitle("Proposal Accepted! 🎉");
            n.setMessage("Your proposal for \"" + projectTitle + "\" has been accepted!");
            n.setType(Notification.NotificationType.PROPOSAL_ACCEPTED);
            create(n);
        } catch (Exception e) {
            System.err.println("[NOTIF] ERROR in notifyProposalAccepted: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ─── Candidature refusée → notifier le FREELANCER ───
    public void notifyProposalRejected(Long freelancerId, String freelancerEmail, String projectTitle) {
        try {
            Notification n = new Notification();
            n.setRecipientId(freelancerId);
            n.setRecipientEmail(freelancerEmail);
            n.setTitle("Proposal Not Selected");
            n.setMessage("Your proposal for \"" + projectTitle + "\" was not selected this time.");
            n.setType(Notification.NotificationType.PROPOSAL_REJECTED);
            create(n);
        } catch (Exception e) {
            System.err.println("[NOTIF] ERROR in notifyProposalRejected: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
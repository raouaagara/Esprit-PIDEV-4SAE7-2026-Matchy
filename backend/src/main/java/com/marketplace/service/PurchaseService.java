package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.*;
import com.marketplace.entity.Notification.NotificationType;
import com.marketplace.entity.Purchase.PurchaseStatus;
import com.marketplace.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseService {

    @Autowired private PurchaseRepository purchaseRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    public PurchaseResponse createPurchase(PurchaseRequestDto req, String clientEmail) {
        if (req == null || req.getProjectId() == null) {
            throw new RuntimeException("projectId manquant dans la requête");
        }

        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + clientEmail));
        Project project = projectRepository.findById(req.getProjectId())
                .orElseThrow(() -> new RuntimeException("Projet non trouvé: " + req.getProjectId()));

        if (project.getOrganizer() != null
                && project.getOrganizer().getEmail().equals(clientEmail)) {
            throw new RuntimeException("Vous ne pouvez pas acheter votre propre projet");
        }

        Long existing = purchaseRepository.countByClientIdAndProjectId(
                client.getId(), project.getId());
        if (existing != null && existing > 0) {
            throw new RuntimeException("Vous avez déjà une demande d'achat pour ce projet");
        }

        Purchase purchase = new Purchase();
        purchase.setClient(client);
        purchase.setProject(project);
        purchase.setStatus(PurchaseStatus.PENDING);
        purchase.setRequestedAt(LocalDateTime.now());
        purchase.setMessage(req.getMessage() != null ? req.getMessage() : "");

        Purchase saved = purchaseRepository.save(purchase);
        PurchaseResponse response = toResponse(saved);

        // Notifier l'organisateur (non-bloquant)
        try {
            String notifContent = "💰 Nouvelle demande d'achat de " + client.getName()
                    + " pour « " + project.getTitle() + " »";
            notificationService.sendNotification(
                    project.getOrganizer(), client, notifContent,
                    project.getId(), project.getTitle(),
                    saved.getId(), NotificationType.PURCHASE_REQUEST);
        } catch (Exception e) {
            // ne pas bloquer l'achat si la notification échoue
        }

        // Diffuser via WebSocket (non-bloquant)
        try {
            messagingTemplate.convertAndSend(
                    "/topic/purchases/" + project.getOrganizer().getId(), response);
        } catch (Exception e) {
            // ne pas bloquer l'achat si le broadcast échoue
        }

        return response;
    }

    @Transactional
    public PurchaseResponse acceptPurchase(Long purchaseId, String organizerEmail) {
        Purchase purchase = findAndValidate(purchaseId, organizerEmail);
        purchase.setStatus(PurchaseStatus.ACCEPTED);
        purchase.setAcceptedAt(LocalDateTime.now());

        Project project = purchase.getProject();
        project.setSoldCount(project.getSoldCount() + 1);
        projectRepository.save(project);

        Purchase saved = purchaseRepository.save(purchase);

        // Message système dans le chat du projet (non-bloquant)
        try {
            User organizer = purchase.getProject().getOrganizer();
            ChatMessage systemMsg = new ChatMessage();
            systemMsg.setContent("🎉 Achat accepté ! L'espace de collaboration est maintenant actif. "
                    + "Partagez ici vos fichiers, exigences et suivez la livraison en temps réel.");
            systemMsg.setSender(organizer);
            systemMsg.setProject(project);
            systemMsg.setMessageType(ChatMessage.MessageType.TEXT);
            ChatMessage savedMsg = chatMessageRepository.save(systemMsg);
            messagingTemplate.convertAndSend("/topic/chat/" + project.getId(), toChatResponse(savedMsg));
        } catch (Exception e) {
            // ne pas bloquer l'acceptation si le message chat échoue
        }

        // Notifier le client (non-bloquant)
        try {
            User organizer = purchase.getProject().getOrganizer();
            notificationService.sendNotification(
                    purchase.getClient(), organizer,
                    "✅ Votre achat de « " + project.getTitle() + " » a été accepté ! Collaboration démarrée.",
                    project.getId(), project.getTitle(),
                    saved.getId(), NotificationType.PURCHASE_ACCEPTED);
        } catch (Exception e) {
            // ne pas bloquer l'acceptation si la notification échoue
        }

        // Diffuser mise à jour du projet (non-bloquant)
        try {
            messagingTemplate.convertAndSend("/topic/projects", toProjectResponse(project));
        } catch (Exception e) {
            // ne pas bloquer l'acceptation si le broadcast échoue
        }

        return toResponse(saved);
    }

    @Transactional
    public PurchaseResponse rejectPurchase(Long purchaseId, String organizerEmail) {
        Purchase purchase = findAndValidate(purchaseId, organizerEmail);
        purchase.setStatus(PurchaseStatus.REJECTED);
        Purchase saved = purchaseRepository.save(purchase);

        try {
            notificationService.sendNotification(
                    purchase.getClient(), purchase.getProject().getOrganizer(),
                    "❌ Votre demande d'achat pour « " + purchase.getProject().getTitle() + " » a été refusée.",
                    purchase.getProject().getId(), purchase.getProject().getTitle(),
                    saved.getId(), NotificationType.PURCHASE_REJECTED);
        } catch (Exception e) {
            // ne pas bloquer le refus si la notification échoue
        }

        return toResponse(saved);
    }

    public List<PurchaseResponse> getPendingForOrganizer(String organizerEmail) {
        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return purchaseRepository.findByOrganizerAndStatus(organizer, PurchaseStatus.PENDING)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<PurchaseResponse> getMyPurchases(String clientEmail) {
        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return purchaseRepository.findByClientOrderByRequestedAtDesc(client)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public long countPending(String organizerEmail) {
        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return purchaseRepository.countPendingByOrganizer(organizer);
    }

    private Purchase findAndValidate(Long purchaseId, String organizerEmail) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        if (!purchase.getProject().getOrganizer().getEmail().equals(organizerEmail)) {
            throw new RuntimeException("Non autorisé");
        }
        if (purchase.getStatus() != PurchaseStatus.PENDING) {
            throw new RuntimeException("Cette demande a déjà été traitée");
        }
        return purchase;
    }

    private PurchaseResponse toResponse(Purchase p) {
        return new PurchaseResponse(
                p.getId(),
                p.getClient().getId(),
                p.getClient().getName(),
                p.getClient().getEmail(),
                p.getProject().getId(),
                p.getProject().getTitle(),
                p.getProject().getPrice(),
                p.getStatus().name(),
                p.getMessage(),
                p.getRequestedAt(),
                p.getAcceptedAt());
    }

    private ChatMessageResponse toChatResponse(ChatMessage m) {
        ChatMessageResponse res = new ChatMessageResponse();
        res.setId(m.getId());
        res.setContent(m.getContent());
        res.setSenderId(m.getSender().getId());
        res.setSenderName(m.getSender().getName());
        res.setSenderRole(m.getSender().getRole().name());
        res.setProjectId(m.getProject().getId());
        res.setSentAt(m.getSentAt());
        res.setMessageType("TEXT");
        return res;
    }

    private ProjectResponse toProjectResponse(Project p) {
        return new ProjectResponse(
                p.getId(), p.getTitle(), p.getDescription(), p.getPrice(),
                p.getCategory(), p.getImageUrl(), p.getStatus().name(),
                p.getSoldCount(), p.getOrganizer().getId(), p.getOrganizer().getName(),
                p.getOrganizer().getAvatar(), p.getCreatedAt());
    }
}

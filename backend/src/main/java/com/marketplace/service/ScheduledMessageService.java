package com.marketplace.service;

import com.marketplace.dto.Dtos.ChatMessageResponse;
import com.marketplace.dto.Dtos.ScheduledMessageDTO;
import com.marketplace.dto.Dtos.ScheduledMessageRequest;
import com.marketplace.entity.*;
import com.marketplace.entity.ChatMessage.MessageType;
import com.marketplace.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ScheduledMessageService {

    private static final Logger log = LoggerFactory.getLogger(ScheduledMessageService.class);

    @Autowired private ScheduledMessageRepository scheduledMessageRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private SimpMessagingTemplate messaging;
    @Autowired private ChatService chatService;

    // ── Create ──────────────────────────────────────────────────────────────────

    public ScheduledMessageDTO createScheduledMessage(ScheduledMessageRequest body, User currentUser) {
        Project project = projectRepository.findById(body.getProjectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projet introuvable."));

        if (body.getScheduledAt() == null || !body.getScheduledAt().isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La date d'envoi doit être dans le futur.");
        }

        RecurrenceType recurrenceType = parseRecurrenceType(body.getRecurrenceType());
        List<String> recurrenceDays = body.getRecurrenceDays() != null ? body.getRecurrenceDays() : List.of();

        if (recurrenceType == RecurrenceType.CUSTOM && recurrenceDays.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Sélectionnez au moins un jour pour la récurrence personnalisée.");
        }

        ScheduledMessage msg = ScheduledMessage.builder()
                .project(project)
                .sender(currentUser)
                .content(body.getContent())
                .scheduledAt(body.getScheduledAt())
                .nextSendAt(body.getScheduledAt())
                .recurrenceType(recurrenceType)
                .recurrenceDays(recurrenceDays)
                .status(ScheduledMessageStatus.PENDING)
                .reminderSent(false)
                .build();

        return toDto(scheduledMessageRepository.save(msg));
    }

    // ── List PENDING for a project ──────────────────────────────────────────────

    public List<ScheduledMessageDTO> getScheduledMessages(Long projectId, User currentUser) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projet introuvable."));
        return scheduledMessageRepository
                .findByProjectAndStatusOrderByNextSendAtAsc(project, ScheduledMessageStatus.PENDING)
                .stream()
                .filter(m -> m.getSender().getId().equals(currentUser.getId()))
                .map(this::toDto)
                .toList();
    }

    // ── List PENDING across all projects for the current user ──────────────────

    public List<ScheduledMessageDTO> getMyScheduledMessages(User currentUser) {
        return scheduledMessageRepository
                .findBySenderAndStatus(currentUser, ScheduledMessageStatus.PENDING)
                .stream()
                .map(this::toDto)
                .toList();
    }

    // ── Edit ────────────────────────────────────────────────────────────────────

    public ScheduledMessageDTO editScheduledMessage(Long id, ScheduledMessageRequest body, User currentUser) {
        ScheduledMessage msg = findOwned(id, currentUser);

        if (body.getScheduledAt() == null || !body.getScheduledAt().isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La date d'envoi doit être dans le futur.");
        }

        RecurrenceType recurrenceType = parseRecurrenceType(body.getRecurrenceType());
        List<String> recurrenceDays = body.getRecurrenceDays() != null ? body.getRecurrenceDays() : List.of();

        msg.setContent(body.getContent());
        msg.setScheduledAt(body.getScheduledAt());
        msg.setNextSendAt(body.getScheduledAt());
        msg.setRecurrenceType(recurrenceType);
        msg.setRecurrenceDays(recurrenceDays);
        msg.setReminderSent(false);

        return toDto(scheduledMessageRepository.save(msg));
    }

    // ── Cancel ──────────────────────────────────────────────────────────────────

    public void cancelScheduledMessage(Long id, User currentUser) {
        ScheduledMessage msg = findOwned(id, currentUser);
        msg.setStatus(ScheduledMessageStatus.CANCELLED);
        scheduledMessageRepository.save(msg);
    }

    // ── Background: send due messages ──────────────────────────────────────────

    @Transactional
    public void processScheduledMessages() {
        List<ScheduledMessage> due = scheduledMessageRepository
                .findByStatusAndNextSendAtLessThanEqual(ScheduledMessageStatus.PENDING, LocalDateTime.now());

        for (ScheduledMessage sm : due) {
            try {
                ChatMessageResponse chatMsg = sendAsChat(sm);
                messaging.convertAndSend("/topic/chat/" + sm.getProject().getId(), chatMsg);

                LocalDateTime next = computeNextSendAt(sm);
                if (next == null) {
                    sm.setStatus(ScheduledMessageStatus.SENT);
                } else {
                    sm.setNextSendAt(next);
                    sm.setReminderSent(false);
                }
                scheduledMessageRepository.save(sm);

                messaging.convertAndSend(
                        "/topic/notifications/" + sm.getSender().getId(),
                        Map.of("type", "SCHEDULED_SENT",
                               "projectId", sm.getProject().getId(),
                               "projectTitle", sm.getProject().getTitle(),
                               "messagePreview", preview(sm.getContent()),
                               "sentAt", LocalDateTime.now().toString()));

            } catch (Exception e) {
                log.error("Failed to send scheduled message id={}: {}", sm.getId(), e.getMessage(), e);
                sm.setStatus(ScheduledMessageStatus.FAILED);
                scheduledMessageRepository.save(sm);
            }
        }
    }

    // ── Background: 15-minute reminders ────────────────────────────────────────

    public void process15MinReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime soon = now.plusMinutes(15);

        scheduledMessageRepository
                .findByStatusAndNextSendAtBetweenAndReminderSentFalse(ScheduledMessageStatus.PENDING, now, soon)
                .forEach(sm -> {
                    messaging.convertAndSend(
                            "/topic/notifications/" + sm.getSender().getId(),
                            Map.of("type", "SCHEDULED_REMINDER",
                                   "projectId", sm.getProject().getId(),
                                   "projectTitle", sm.getProject().getTitle(),
                                   "messagePreview", preview(sm.getContent()),
                                   "nextSendAt", sm.getNextSendAt().toString()));
                    sm.setReminderSent(true);
                    scheduledMessageRepository.save(sm);
                });
    }

    // ── Helpers ─────────────────────────────────────────────────────────────────

    private ChatMessageResponse sendAsChat(ScheduledMessage sm) {
        ChatMessage chatMsg = new ChatMessage();
        chatMsg.setContent(sm.getContent());
        chatMsg.setSender(sm.getSender());
        chatMsg.setProject(sm.getProject());
        chatMsg.setMessageType(MessageType.TEXT);
        return chatService.toResponse(chatMessageRepository.save(chatMsg));
    }

    private ScheduledMessage findOwned(Long id, User currentUser) {
        ScheduledMessage msg = scheduledMessageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Message planifié introuvable."));
        if (!msg.getSender().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Vous ne pouvez modifier que vos propres messages planifiés.");
        }
        if (msg.getStatus() != ScheduledMessageStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Impossible de modifier un message déjà envoyé ou annulé.");
        }
        return msg;
    }

    private RecurrenceType parseRecurrenceType(String raw) {
        if (raw == null || raw.isBlank()) return RecurrenceType.ONCE;
        try {
            return RecurrenceType.valueOf(raw.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Type de récurrence invalide: " + raw);
        }
    }

    private LocalDateTime computeNextSendAt(ScheduledMessage msg) {
        LocalDateTime current = msg.getNextSendAt();
        return switch (msg.getRecurrenceType()) {
            case ONCE -> null;
            case DAILY -> current.plusDays(1);
            case WEEKLY -> current.plusWeeks(1);
            case WEEKDAYS -> {
                LocalDateTime next = current.plusDays(1);
                while (next.getDayOfWeek() == DayOfWeek.SATURDAY
                        || next.getDayOfWeek() == DayOfWeek.SUNDAY) {
                    next = next.plusDays(1);
                }
                yield next;
            }
            case CUSTOM -> {
                if (msg.getRecurrenceDays() == null || msg.getRecurrenceDays().isEmpty()) yield null;
                List<DayOfWeek> days = msg.getRecurrenceDays().stream()
                        .map(d -> DayOfWeek.valueOf(d.toUpperCase()))
                        .sorted(Comparator.comparingInt(DayOfWeek::getValue))
                        .toList();
                LocalDateTime next = current.plusDays(1);
                for (int i = 0; i < 7; i++, next = next.plusDays(1)) {
                    if (days.contains(next.getDayOfWeek())) yield next;
                }
                yield null;
            }
        };
    }

    private String preview(String content) {
        return content != null && content.length() > 60 ? content.substring(0, 60) + "..." : content;
    }

    public ScheduledMessageDTO toDto(ScheduledMessage m) {
        ScheduledMessageDTO dto = new ScheduledMessageDTO();
        dto.setId(m.getId());
        dto.setProjectId(m.getProject().getId());
        dto.setProjectTitle(m.getProject().getTitle());
        dto.setSenderId(m.getSender().getId());
        dto.setSenderName(m.getSender().getName());
        dto.setContent(m.getContent());
        dto.setScheduledAt(m.getScheduledAt());
        dto.setNextSendAt(m.getNextSendAt());
        dto.setRecurrenceType(m.getRecurrenceType().name());
        dto.setRecurrenceDays(m.getRecurrenceDays());
        dto.setStatus(m.getStatus().name());
        dto.setCreatedAt(m.getCreatedAt());
        return dto;
    }
}

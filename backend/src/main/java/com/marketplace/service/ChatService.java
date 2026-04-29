package com.marketplace.service;

import com.marketplace.dto.Dtos;
import com.marketplace.dto.Dtos.ChatMessageRequest;
import com.marketplace.dto.Dtos.ChatMessageResponse;
import com.marketplace.dto.Dtos.MessageReactionDto;
import com.marketplace.dto.Dtos.ProjectParticipant;
import com.marketplace.entity.*;
import com.marketplace.entity.ChatMessage.MessageType;
import com.marketplace.entity.Notification.NotificationType;
import com.marketplace.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private MessageReactionRepository messageReactionRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private ProjectLastReadRepository projectLastReadRepository;
    @Autowired private UserOnlineStatusRepository userOnlineStatusRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    private static final Pattern MENTION_PATTERN = Pattern.compile("@([\\w]+)");
    private static final LocalDateTime EPOCH = LocalDateTime.of(2000, 1, 1, 0, 0, 0);

    public List<ChatMessageResponse> getMessages(Long projectId, String email, Long clientId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        if (email != null) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null && user.getRole() == User.Role.CLIENT) {
                return chatMessageRepository.findVisibleMessagesForClient(project, user.getId(), user.getId())
                        .stream().map(this::toResponse).collect(Collectors.toList());
            } else if (user != null && clientId != null) {
                return chatMessageRepository.findVisibleMessagesForClient(project, user.getId(), clientId)
                        .stream().map(this::toResponse).collect(Collectors.toList());
            }
        }
        long uid = email != null ? userRepository.findByEmail(email).map(User::getId).orElse(-1L) : -1L;
        return chatMessageRepository.findVisibleMessages(project, uid)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<Dtos.ConversationSummary> getConversations(String email) {
        User organizer = resolveUser(email);
        List<Project> projects = projectRepository.findByOrganizer(organizer);
        List<Dtos.ConversationSummary> result = new ArrayList<>();
        for (Project project : projects) {
            List<Long> clientIds = chatMessageRepository.findClientIdsByProject(project);
            for (Long cid : clientIds) {
                User client = userRepository.findById(cid).orElse(null);
                if (client == null) continue;
                Optional<ChatMessage> lastMsgOpt =
                        chatMessageRepository.findFirstByProjectAndClientIdOrderBySentAtDesc(project, cid);
                boolean online = userOnlineStatusRepository.findById(cid)
                        .map(UserOnlineStatus::isOnline).orElse(false);
                String lastContent = lastMsgOpt.map(m ->
                        m.getContent() != null && !m.getContent().isEmpty() ? m.getContent() : "📎 Fichier"
                ).orElse(null);
                LocalDateTime lastTime = lastMsgOpt.map(ChatMessage::getSentAt).orElse(null);

                // Real unread count: messages from the client after the organizer's last read
                LocalDateTime lastRead = projectLastReadRepository
                        .findByUserAndProject(organizer, project)
                        .map(ProjectLastRead::getLastReadAt)
                        .orElse(EPOCH);
                long unread = chatMessageRepository.countUnreadForConversation(
                        project, cid, organizer.getId(), lastRead);

                result.add(new Dtos.ConversationSummary(
                        project.getId() + "_" + cid, cid, client.getName(),
                        project.getId(), project.getTitle(),
                        lastContent, lastTime, unread, online));
            }
        }
        result.sort((a, b) -> {
            if (a.getLastMessageTime() == null) return 1;
            if (b.getLastMessageTime() == null) return -1;
            return b.getLastMessageTime().compareTo(a.getLastMessageTime());
        });
        return result;
    }

    public ChatMessageResponse sendMessage(ChatMessageRequest req, String senderEmail) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectRepository.findById(req.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ChatMessage msg = new ChatMessage();
        msg.setContent(req.getContent());
        msg.setSender(sender);
        msg.setProject(project);

        if (req.getMessageType() != null && !req.getMessageType().isEmpty()) {
            try {
                msg.setMessageType(MessageType.valueOf(req.getMessageType()));
            } catch (IllegalArgumentException e) {
                msg.setMessageType(MessageType.TEXT);
            }
        }
        msg.setFileUrl(req.getFileUrl());
        msg.setFileName(req.getFileName());
        msg.setFileType(req.getFileType());
        msg.setOriginalContent(req.getOriginalContent());
        msg.setDetectedLanguage(req.getDetectedLanguage());

        if (sender.getRole() == User.Role.CLIENT) {
            msg.setClientId(sender.getId());
        } else if (req.getClientId() != null) {
            msg.setClientId(req.getClientId());
        }

        ChatMessage saved = chatMessageRepository.save(msg);

        try {
            markProjectReadInternal(sender, project);
        } catch (Exception e) {
            log.warn("markRead failed (non-critical): {}", e.getMessage());
        }

        try {
            sendNotificationsForMessage(saved, sender, project, req.getContent());
        } catch (Exception e) {
            log.warn("sendNotifications failed (non-critical): {}", e.getMessage());
        }

        return toResponse(saved);
    }

    private void sendNotificationsForMessage(ChatMessage msg, User sender, Project project, String content) {
        String notifContent = (content != null && !content.isEmpty())
                ? (content.length() > 60 ? content.substring(0, 60) + "..." : content)
                : "📎 Fichier partagé";

        if (msg.getClientId() != null) {
            // Private conversation: notify only the specific other party
            if (sender.getRole() == User.Role.CLIENT) {
                User organizer = project.getOrganizer();
                notificationService.sendNotification(
                        organizer, sender,
                        sender.getName() + ": " + notifContent,
                        project.getId(), project.getTitle(),
                        msg.getId(), NotificationType.NEW_MESSAGE);
            } else {
                userRepository.findById(msg.getClientId()).ifPresent(client ->
                    notificationService.sendNotification(
                            client, sender,
                            sender.getName() + ": " + notifContent,
                            project.getId(), project.getTitle(),
                            msg.getId(), NotificationType.NEW_MESSAGE));
            }
            return;
        }

        // Broadcast message (e.g. meeting invite with clientId=null): notify organizer + all participants
        Set<Long> notifiedIds = new HashSet<>();
        notifiedIds.add(sender.getId());

        User organizer = project.getOrganizer();
        if (!notifiedIds.contains(organizer.getId())) {
            notifiedIds.add(organizer.getId());
            notificationService.sendNotification(
                    organizer, sender,
                    sender.getName() + ": " + notifContent,
                    project.getId(), project.getTitle(),
                    msg.getId(), NotificationType.NEW_MESSAGE);
        }

        List<User> participants = chatMessageRepository.findParticipantsByProject(project, sender);
        for (User participant : participants) {
            if (!notifiedIds.contains(participant.getId())) {
                notifiedIds.add(participant.getId());
                notificationService.sendNotification(
                        participant, sender,
                        sender.getName() + ": " + notifContent,
                        project.getId(), project.getTitle(),
                        msg.getId(), NotificationType.NEW_MESSAGE);
            }
        }

        // Handle @mentions
        if (content != null && !content.isEmpty()) {
            Matcher matcher = MENTION_PATTERN.matcher(content);
            while (matcher.find()) {
                String mentionedName = matcher.group(1).trim();
                userRepository.findByNameIgnoreCase(mentionedName).ifPresent(mentioned -> {
                    if (!mentioned.getId().equals(sender.getId())) {
                        notificationService.sendNotification(
                                mentioned, sender,
                                sender.getName() + " vous a mentionné: " + notifContent,
                                project.getId(), project.getTitle(),
                                msg.getId(), NotificationType.MENTION);
                    }
                });
            }
        }
    }

    public long getUnreadCount(Long projectId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Optional<ProjectLastRead> lastRead = projectLastReadRepository.findByUserAndProject(user, project);
        // Use a safe minimum date that MySQL can handle
        LocalDateTime since = lastRead.map(ProjectLastRead::getLastReadAt).orElse(EPOCH);
        return chatMessageRepository.countByProjectAndSentAtAfter(project, since);
    }

    @Transactional
    public void markRead(Long projectId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        markProjectReadInternal(user, project);
    }

    private void markProjectReadInternal(User user, Project project) {
        ProjectLastRead plr = projectLastReadRepository
                .findByUserAndProject(user, project)
                .orElseGet(() -> {
                    ProjectLastRead p = new ProjectLastRead();
                    p.setUser(user);
                    p.setProject(project);
                    return p;
                });
        plr.setLastReadAt(LocalDateTime.now());
        projectLastReadRepository.save(plr);
    }

    public List<ProjectParticipant> getParticipants(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        List<ProjectParticipant> result = new ArrayList<>();
        result.add(new ProjectParticipant(
                project.getOrganizer().getId(),
                project.getOrganizer().getName(),
                project.getOrganizer().getRole().name()));
        chatMessageRepository.findParticipantsByProject(project, project.getOrganizer())
                .forEach(u -> result.add(new ProjectParticipant(u.getId(), u.getName(), u.getRole().name())));
        return result;
    }

    // ── Pin / Unpin ──────────────────────────────────────────────────────────────

    @Transactional
    public ChatMessageResponse pinMessage(Long projectId, Long messageId, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        User user = resolveUser(email);
        msg.setPinned(true);
        msg.setPinnedAt(LocalDateTime.now());
        msg.setPinnedBy(user);
        ChatMessageResponse res = toResponse(chatMessageRepository.save(msg));
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, res);
        return res;
    }

    @Transactional
    public ChatMessageResponse unpinMessage(Long projectId, Long messageId, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        msg.setPinned(false);
        msg.setPinnedAt(null);
        msg.setPinnedBy(null);
        ChatMessageResponse res = toResponse(chatMessageRepository.save(msg));
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, res);
        return res;
    }

    public List<ChatMessageResponse> getPinnedMessages(Long projectId, String email) {
        Project project = resolveProject(projectId);
        return chatMessageRepository.findByProjectAndPinnedTrue(project)
                .stream().map(this::toResponse).toList();
    }

    // ── Shared content ───────────────────────────────────────────────────────────

    public List<ChatMessageResponse> getSharedContent(Long projectId, String email) {
        Project project = resolveProject(projectId);
        return chatMessageRepository.findCandidateSharedContent(project)
                .stream().map(this::toResponse).toList();
    }

    // ── Edit ─────────────────────────────────────────────────────────────────────

    @Transactional
    public ChatMessageResponse editMessage(Long projectId, Long messageId, String newContent, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        if (!msg.getSender().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vous ne pouvez modifier que vos propres messages.");
        }
        msg.setContent(newContent);
        msg.setEdited(true);
        msg.setEditedAt(LocalDateTime.now());
        ChatMessageResponse res = toResponse(chatMessageRepository.save(msg));
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, res);
        return res;
    }

    // ── Delete ───────────────────────────────────────────────────────────────────

    @Transactional
    public void deleteMessage(Long projectId, Long messageId, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        User user = resolveUser(email);
        boolean isOwner = msg.getSender().getEmail().equals(email);
        boolean isOrganizer = user.getRole() == User.Role.ORGANIZER;
        if (!isOwner && !isOrganizer) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vous n'êtes pas autorisé à supprimer ce message.");
        }
        messageReactionRepository.deleteByMessage(msg);
        chatMessageRepository.delete(msg);
        ChatMessageResponse deleted = new ChatMessageResponse();
        deleted.setId(messageId);
        deleted.setProjectId(projectId);
        deleted.setDeleted(true);
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, deleted);
    }

    // ── Reactions ────────────────────────────────────────────────────────────────

    @Transactional
    public ChatMessageResponse toggleReaction(Long projectId, Long messageId, String emoji, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        User user = resolveUser(email);
        Optional<MessageReaction> existing = messageReactionRepository.findByMessageAndUser(msg, user);
        if (existing.isPresent()) {
            MessageReaction reaction = existing.get();
            if (reaction.getEmoji().equals(emoji)) {
                messageReactionRepository.deleteByMessageAndUser(msg, user);
            } else {
                reaction.setEmoji(emoji);
                messageReactionRepository.save(reaction);
            }
        } else {
            messageReactionRepository.save(MessageReaction.builder()
                    .message(msg).user(user).emoji(emoji).build());
        }
        ChatMessageResponse res = toResponse(msg);
        messagingTemplate.convertAndSend("/topic/chat/" + projectId, res);
        return res;
    }

    public List<MessageReactionDto> getReactions(Long projectId, Long messageId, String email) {
        ChatMessage msg = resolveMessage(projectId, messageId);
        return messageReactionRepository.findByMessage(msg).stream()
                .map(r -> new MessageReactionDto(r.getId(), r.getUser().getId(), r.getUser().getName(), r.getEmoji()))
                .toList();
    }

    // ── toResponse ───────────────────────────────────────────────────────────────

    public ChatMessageResponse toResponse(ChatMessage m) {
        ChatMessageResponse res = new ChatMessageResponse();
        res.setId(m.getId());
        res.setContent(m.getContent());
        res.setSenderId(m.getSender().getId());
        res.setSenderName(m.getSender().getName());
        res.setSenderRole(m.getSender().getRole().name());
        res.setProjectId(m.getProject().getId());
        res.setSentAt(m.getSentAt());
        res.setMessageType(m.getMessageType() != null ? m.getMessageType().name() : "TEXT");
        res.setFileUrl(m.getFileUrl());
        res.setFileName(m.getFileName());
        res.setFileType(m.getFileType());
        res.setOriginalContent(m.getOriginalContent());
        res.setDetectedLanguage(m.getDetectedLanguage());
        res.setScheduledAt(m.getScheduledAt());
        res.setScheduleSent(m.isScheduleSent());
        res.setPinned(m.isPinned());
        res.setPinnedAt(m.getPinnedAt());
        res.setPinnedByName(m.getPinnedBy() != null ? m.getPinnedBy().getName() : null);
        res.setEdited(m.isEdited());
        res.setEditedAt(m.getEditedAt());
        res.setClientId(m.getClientId());
        List<MessageReactionDto> reactions = messageReactionRepository.findByMessage(m).stream()
                .map(r -> new MessageReactionDto(r.getId(), r.getUser().getId(), r.getUser().getName(), r.getEmoji()))
                .toList();
        res.setReactions(reactions);
        return res;
    }

    // ── Private helpers ──────────────────────────────────────────────────────────

    private Project resolveProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projet introuvable."));
    }

    private User resolveUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable."));
    }

    private ChatMessage resolveMessage(Long projectId, Long messageId) {
        Project project = resolveProject(projectId);
        ChatMessage msg = chatMessageRepository.findById(messageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message introuvable."));
        if (!msg.getProject().getId().equals(project.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce message n'appartient pas à ce projet.");
        }
        return msg;
    }
}

package com.marketplace.controller;

import com.marketplace.dto.Dtos;
import com.marketplace.dto.Dtos.*;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.ChatService;
import com.marketplace.service.LocalStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @Autowired private ChatService chatService;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private LocalStorageService localStorageService;
    @Autowired private UserRepository userRepository;

    @GetMapping("/conversations")
    public ResponseEntity<List<Dtos.ConversationSummary>> getConversations(Authentication auth) {
        return ResponseEntity.ok(chatService.getConversations(auth.getName()));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(
            @PathVariable Long projectId,
            @RequestParam(required = false) Long clientId,
            Authentication auth) {
        String email = auth != null ? auth.getName() : null;
        return ResponseEntity.ok(chatService.getMessages(projectId, email, clientId));
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessageRequest req, Authentication auth) {
        try {
            ChatMessageResponse msg = chatService.sendMessage(req, auth.getName());
            try {
                messagingTemplate.convertAndSend("/topic/chat/" + req.getProjectId(), msg);
            } catch (Exception wsEx) {
                log.warn("WS broadcast failed (non-critical): {}", wsEx.getMessage());
            }
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            log.error("sendMessage failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            FileUploadResponse response = localStorageService.upload(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur upload: " + e.getMessage());
        }
    }

    @GetMapping("/{projectId}/unread")
    public ResponseEntity<UnreadCountResponse> getUnreadCount(
            @PathVariable Long projectId, Authentication auth) {
        long count = chatService.getUnreadCount(projectId, auth.getName());
        return ResponseEntity.ok(new UnreadCountResponse(projectId, count));
    }

    @PostMapping("/{projectId}/mark-read")
    public ResponseEntity<Void> markRead(@PathVariable Long projectId, Authentication auth) {
        chatService.markRead(projectId, auth.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{projectId}/participants")
    public ResponseEntity<List<ProjectParticipant>> getParticipants(@PathVariable Long projectId) {
        return ResponseEntity.ok(chatService.getParticipants(projectId));
    }

    // ── Pinned messages ──────────────────────────────────────────────────────────

    @GetMapping("/{projectId}/pinned")
    public ResponseEntity<List<ChatMessageResponse>> getPinned(
            @PathVariable Long projectId, Authentication auth) {
        return ResponseEntity.ok(chatService.getPinnedMessages(projectId, auth.getName()));
    }

    @PostMapping("/{projectId}/messages/{messageId}/pin")
    public ResponseEntity<ChatMessageResponse> pin(
            @PathVariable Long projectId, @PathVariable Long messageId, Authentication auth) {
        return ResponseEntity.ok(chatService.pinMessage(projectId, messageId, auth.getName()));
    }

    @DeleteMapping("/{projectId}/messages/{messageId}/pin")
    public ResponseEntity<ChatMessageResponse> unpin(
            @PathVariable Long projectId, @PathVariable Long messageId, Authentication auth) {
        return ResponseEntity.ok(chatService.unpinMessage(projectId, messageId, auth.getName()));
    }

    // ── Shared content ───────────────────────────────────────────────────────────

    @GetMapping("/{projectId}/shared")
    public ResponseEntity<List<ChatMessageResponse>> getShared(
            @PathVariable Long projectId, Authentication auth) {
        return ResponseEntity.ok(chatService.getSharedContent(projectId, auth.getName()));
    }

    // ── Edit / Delete ────────────────────────────────────────────────────────────

    @PutMapping("/{projectId}/messages/{messageId}")
    public ResponseEntity<?> editMessage(
            @PathVariable Long projectId, @PathVariable Long messageId,
            @RequestBody Map<String, String> body, Authentication auth) {
        try {
            return ResponseEntity.ok(chatService.editMessage(projectId, messageId, body.get("content"), auth.getName()));
        } catch (org.springframework.web.server.ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    @DeleteMapping("/{projectId}/messages/{messageId}")
    public ResponseEntity<?> deleteMessage(
            @PathVariable Long projectId, @PathVariable Long messageId, Authentication auth) {
        try {
            chatService.deleteMessage(projectId, messageId, auth.getName());
            return ResponseEntity.noContent().build();
        } catch (org.springframework.web.server.ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    // ── Reactions ────────────────────────────────────────────────────────────────

    @PostMapping("/{projectId}/messages/{messageId}/reactions")
    public ResponseEntity<ChatMessageResponse> toggleReaction(
            @PathVariable Long projectId, @PathVariable Long messageId,
            @RequestBody Map<String, String> body, Authentication auth) {
        return ResponseEntity.ok(chatService.toggleReaction(projectId, messageId, body.get("emoji"), auth.getName()));
    }

    @GetMapping("/{projectId}/messages/{messageId}/reactions")
    public ResponseEntity<List<MessageReactionDto>> getReactions(
            @PathVariable Long projectId, @PathVariable Long messageId, Authentication auth) {
        return ResponseEntity.ok(chatService.getReactions(projectId, messageId, auth.getName()));
    }

    // ── Typing indicator ─────────────────────────────────────────────────────────

    @PostMapping("/{projectId}/typing")
    public ResponseEntity<Void> notifyTyping(
            @PathVariable Long projectId, Authentication auth) {
        if (auth == null) return ResponseEntity.ok().build();
        try {
            String displayName = userRepository.findByEmail(auth.getName())
                .map(u -> u.getName() != null ? u.getName() : u.getEmail())
                .orElse(auth.getName());
            messagingTemplate.convertAndSend("/topic/typing/" + projectId,
                Map.of("userName", displayName, "projectId", projectId));
        } catch (Exception e) {
            log.warn("typing broadcast failed: {}", e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    // ── Presence ────────────────────────────────────────────────────────────────

    @PostMapping("/{projectId}/presence")
    public ResponseEntity<Void> notifyPresence(
            @PathVariable Long projectId,
            @RequestBody Map<String, Object> body,
            Authentication auth) {
        if (auth == null) return ResponseEntity.ok().build();
        try {
            String displayName = userRepository.findByEmail(auth.getName())
                .map(u -> u.getName() != null ? u.getName() : u.getEmail())
                .orElse(auth.getName());
            boolean online = Boolean.TRUE.equals(body.get("online"));
            messagingTemplate.convertAndSend("/topic/presence/" + projectId,
                Map.of("userName", displayName, "online", online, "projectId", projectId));
        } catch (Exception e) {
            log.warn("presence broadcast failed: {}", e.getMessage());
        }
        return ResponseEntity.ok().build();
    }
}

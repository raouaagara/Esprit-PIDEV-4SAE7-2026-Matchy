package com.marketplace.controller;

import com.marketplace.dto.Dtos.*;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.PrivateChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/private-chat")
public class PrivateChatController {

    private static final Logger log = LoggerFactory.getLogger(PrivateChatController.class);

    @Autowired private PrivateChatService privateChatService;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private UserRepository userRepo;

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationSummary>> getConversations(Authentication auth) {
        return ResponseEntity.ok(privateChatService.getConversations(auth.getName()));
    }

    @GetMapping("/{roomKey}/messages")
    public ResponseEntity<List<PrivateChatMessageResponse>> getMessages(
            @PathVariable String roomKey, Authentication auth) {
        return ResponseEntity.ok(privateChatService.getMessages(roomKey, auth.getName()));
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody PrivateChatMessageRequest req, Authentication auth) {
        try {
            PrivateChatMessageResponse msg = privateChatService.sendMessage(req, auth.getName());
            try {
                messagingTemplate.convertAndSend("/topic/private-chat/" + req.getRoomKey(), msg);
                messagingTemplate.convertAndSend("/topic/private-notif/" + req.getReceiverId(), msg);
            } catch (Exception wsEx) {
                log.warn("WS broadcast failed: {}", wsEx.getMessage());
            }
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            log.error("sendMessage failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{roomKey}/read")
    public ResponseEntity<Void> markRead(@PathVariable String roomKey, Authentication auth) {
        privateChatService.markRead(roomKey, auth.getName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/status")
    public ResponseEntity<Void> updateStatus(@RequestBody UserStatusRequest req, Authentication auth) {
        userRepo.findByEmail(auth.getName()).ifPresent(user -> {
            privateChatService.updateOnlineStatus(user.getId(), req.isOnline());
            try {
                messagingTemplate.convertAndSend("/topic/user-status/" + user.getId(),
                        Map.of("userId", user.getId(), "online", req.isOnline()));
            } catch (Exception e) {
                log.warn("Status broadcast failed: {}", e.getMessage());
            }
        });
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status/{userId}")
    public ResponseEntity<UserStatusResponse> getStatus(@PathVariable Long userId) {
        return ResponseEntity.ok(privateChatService.getOnlineStatus(userId));
    }
}

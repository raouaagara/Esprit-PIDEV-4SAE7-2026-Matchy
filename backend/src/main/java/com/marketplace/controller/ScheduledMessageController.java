package com.marketplace.controller;

import com.marketplace.dto.Dtos.ScheduledMessageDTO;
import com.marketplace.dto.Dtos.ScheduledMessageRequest;
import com.marketplace.entity.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.ScheduledMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ScheduledMessageController {

    private static final Logger log = LoggerFactory.getLogger(ScheduledMessageController.class);

    @Autowired private ScheduledMessageService scheduledMessageService;
    @Autowired private UserRepository userRepository;

    // ── POST /{projectId}/scheduled — create ────────────────────────────────────
    @PostMapping("/{projectId}/scheduled")
    public ResponseEntity<?> create(
            @PathVariable Long projectId,
            @RequestBody ScheduledMessageRequest body,
            Authentication auth) {
        try {
            body.setProjectId(projectId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(scheduledMessageService.createScheduledMessage(body, currentUser(auth)));
        } catch (org.springframework.web.server.ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            log.error("create scheduled message failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── GET /{projectId}/scheduled — list mine for this project ─────────────────
    @GetMapping("/{projectId}/scheduled")
    public ResponseEntity<List<ScheduledMessageDTO>> list(
            @PathVariable Long projectId, Authentication auth) {
        return ResponseEntity.ok(scheduledMessageService.getScheduledMessages(projectId, currentUser(auth)));
    }

    // ── PUT /{projectId}/scheduled/{id} — edit ──────────────────────────────────
    @PutMapping("/{projectId}/scheduled/{id}")
    public ResponseEntity<?> edit(
            @PathVariable Long projectId,
            @PathVariable Long id,
            @RequestBody ScheduledMessageRequest body,
            Authentication auth) {
        try {
            body.setProjectId(projectId);
            return ResponseEntity.ok(scheduledMessageService.editScheduledMessage(id, body, currentUser(auth)));
        } catch (org.springframework.web.server.ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            log.error("edit scheduled message failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── DELETE /{projectId}/scheduled/{id} — cancel ─────────────────────────────
    @DeleteMapping("/{projectId}/scheduled/{id}")
    public ResponseEntity<?> cancel(
            @PathVariable Long projectId,
            @PathVariable Long id,
            Authentication auth) {
        try {
            scheduledMessageService.cancelScheduledMessage(id, currentUser(auth));
            return ResponseEntity.noContent().build();
        } catch (org.springframework.web.server.ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            log.error("cancel scheduled message failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ── GET /scheduled/mine — all mine across projects ──────────────────────────
    @GetMapping("/scheduled/mine")
    public ResponseEntity<List<ScheduledMessageDTO>> mine(Authentication auth) {
        return ResponseEntity.ok(scheduledMessageService.getMyScheduledMessages(currentUser(auth)));
    }

    private User currentUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable."));
    }
}

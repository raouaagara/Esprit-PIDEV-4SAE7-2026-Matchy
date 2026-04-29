package com.marketplace.controller;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.Project;
import com.marketplace.entity.User;
import com.marketplace.repository.ProjectRepository;
import com.marketplace.repository.UserRepository;
import com.marketplace.service.MeetingService;
import com.marketplace.service.ZegoCloudService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/meeting")
public class MeetingController {

    private static final Logger log = LoggerFactory.getLogger(MeetingController.class);

    @Autowired private MeetingService meetingService;
    @Autowired private UserRepository userRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private ZegoCloudService zegoCloudService;

    /** Diagnostic endpoint — call GET /api/meeting/debug/{projectId} to see exactly what fails */
    @GetMapping("/debug/{projectId}")
    public ResponseEntity<Map<String, Object>> debug(@PathVariable Long projectId, Authentication auth) {
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("authEmail", auth.getName());
        try {
            User user = userRepository.findByEmail(auth.getName()).orElse(null);
            r.put("userFound", user != null);
            if (user != null) {
                r.put("userId", user.getId());
                r.put("userRole", user.getRole().name());
                r.put("isOrganizer", user.getRole() == User.Role.ORGANIZER);
            }
            Project p = projectRepository.findById(projectId).orElse(null);
            r.put("projectFound", p != null);
            if (p != null) {
                r.put("projectTitle", p.getTitle());
                r.put("projectOrganizer", p.getOrganizer().getEmail());
                r.put("projectOwnerMatch", p.getOrganizer().getEmail().equals(auth.getName()));
            }
            String roomId = zegoCloudService.generateRoomId("test");
            r.put("roomIdGenerated", roomId);
            if (user != null) {
                String token = zegoCloudService.generateToken(user.getId().toString(), 60);
                r.put("tokenGenerated", token != null && token.startsWith("04"));
            }
        } catch (Exception e) {
            r.put("error", "[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
        return ResponseEntity.ok(r);
    }

    @PostMapping("/instant")
    public ResponseEntity<?> createInstant(@RequestBody MeetingInstantRequest req, Authentication auth) {
        try { return ResponseEntity.ok(meetingService.createInstant(req, auth.getName())); }
        catch (Exception e) {
            log.error("createInstant failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PostMapping("/schedule")
    public ResponseEntity<?> schedule(@RequestBody MeetingScheduleRequest req, Authentication auth) {
        try { return ResponseEntity.ok(meetingService.schedule(req, auth.getName())); }
        catch (Exception e) {
            log.error("schedule failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PostMapping("/link")
    public ResponseEntity<?> createLink(@RequestBody MeetingLinkRequest req, Authentication auth) {
        try { return ResponseEntity.ok(meetingService.createLink(req, auth.getName())); }
        catch (Exception e) {
            log.error("createLink failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<?> join(@PathVariable String roomId, Authentication auth) {
        try { return ResponseEntity.ok(meetingService.join(roomId, auth.getName())); }
        catch (Exception e) {
            log.error("join failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PutMapping("/{roomId}/end")
    public ResponseEntity<?> end(@PathVariable String roomId, Authentication auth) {
        try { meetingService.end(roomId, auth.getName()); return ResponseEntity.ok().build(); }
        catch (Exception e) {
            log.error("end failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<MeetingResponse>> getMeetings(@PathVariable Long projectId) {
        return ResponseEntity.ok(meetingService.getMeetings(projectId));
    }
}

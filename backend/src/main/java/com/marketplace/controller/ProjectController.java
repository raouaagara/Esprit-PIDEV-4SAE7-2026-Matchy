package com.marketplace.controller;

import com.marketplace.dto.Dtos.*;
import com.marketplace.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/my")
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication auth) {
        return ResponseEntity.ok(projectService.getOrganizerProjects(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequest req, Authentication auth) {
        try {
            ProjectResponse project = projectService.createProject(req, auth.getName());
            // Notify all clients via WebSocket that a new project was added
            messagingTemplate.convertAndSend("/topic/projects", project);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id,
                                            @RequestBody ProjectRequest req,
                                            Authentication auth) {
        try {
            ProjectResponse project = projectService.updateProject(id, req, auth.getName());
            messagingTemplate.convertAndSend("/topic/projects", project);
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id, Authentication auth) {
        try {
            projectService.deleteProject(id, auth.getName());
            messagingTemplate.convertAndSend("/topic/project-deleted", id);
            return ResponseEntity.ok("Deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication auth) {
        try {
            return ResponseEntity.ok(projectService.getDashboardStats(auth.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

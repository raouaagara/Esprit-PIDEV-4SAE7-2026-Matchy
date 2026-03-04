package tn.esprit.pi.controller;

import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.Project;
import tn.esprit.pi.repository.MilestoneRepository;
import tn.esprit.pi.repository.ProjectRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/milestones")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class MilestoneController {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // ============ CREATE ============
    @PostMapping("/create")
    public ResponseEntity<?> createMilestone(@RequestBody CreateMilestoneRequest request) {
        try {
            System.out.println("=== Creating Milestone ===");
            System.out.println("Title: " + request.getTitle());
            System.out.println("ProjectId: " + request.getProjectId());

            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + request.getProjectId()));

            Milestone milestone = new Milestone();
            milestone.setProject(project);
            milestone.setTitle(request.getTitle());
            milestone.setDescription(request.getDescription());
            milestone.setBudget(request.getBudget());
            milestone.setDeadline(request.getDeadline());
            milestone.setStatus(Milestone.MilestoneStatus.PENDING);

            Milestone saved = milestoneRepository.save(milestone);
            System.out.println("Milestone saved with ID: " + saved.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("title", saved.getTitle());
            response.put("message", "Milestone created successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error creating milestone: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ READ ============
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getProjectMilestones(@PathVariable Long projectId) {
        try {
            System.out.println("=== Getting Milestones for Project ID: " + projectId + " ===");

            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

            List<Milestone> milestones = milestoneRepository.findByProject(project);
            System.out.println("Found " + milestones.size() + " milestones");

            // Create a safe copy without circular references
            List<Map<String, Object>> safeMilestones = new ArrayList<>();
            for (Milestone m : milestones) {
                Map<String, Object> milestoneMap = new HashMap<>();
                milestoneMap.put("id", m.getId());
                milestoneMap.put("title", m.getTitle());
                milestoneMap.put("description", m.getDescription());
                milestoneMap.put("budget", m.getBudget());
                milestoneMap.put("deadline", m.getDeadline());
                milestoneMap.put("status", m.getStatus() != null ? m.getStatus().toString() : "PENDING");
                milestoneMap.put("projectId", projectId);
                safeMilestones.add(milestoneMap);
            }

            return ResponseEntity.ok(safeMilestones);

        } catch (Exception e) {
            System.out.println("Error getting milestones: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/available/{projectId}")
    public ResponseEntity<?> getAvailableMilestones(@PathVariable Long projectId) {
        try {
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            List<Milestone> milestones = milestoneRepository.findByProject(project);

            // Filter to only include PENDING milestones
            List<Map<String, Object>> availableMilestones = milestones.stream()
                    .filter(m -> m.getStatus() == Milestone.MilestoneStatus.PENDING)
                    .map(m -> {
                        Map<String, Object> milestoneMap = new HashMap<>();
                        milestoneMap.put("id", m.getId());
                        milestoneMap.put("title", m.getTitle());
                        milestoneMap.put("description", m.getDescription());
                        milestoneMap.put("budget", m.getBudget());
                        milestoneMap.put("deadline", m.getDeadline());
                        milestoneMap.put("projectId", project.getId());
                        milestoneMap.put("projectTitle", project.getTitle());
                        return milestoneMap;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(availableMilestones);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMilestoneById(@PathVariable Long id) {
        try {
            Milestone milestone = milestoneRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milestone not found with id: " + id));

            Map<String, Object> milestoneMap = new HashMap<>();
            milestoneMap.put("id", milestone.getId());
            milestoneMap.put("title", milestone.getTitle());
            milestoneMap.put("description", milestone.getDescription());
            milestoneMap.put("budget", milestone.getBudget());
            milestoneMap.put("deadline", milestone.getDeadline());
            milestoneMap.put("status", milestone.getStatus().toString());
            milestoneMap.put("projectId", milestone.getProject().getId());
            milestoneMap.put("projectTitle", milestone.getProject().getTitle());

            return ResponseEntity.ok(milestoneMap);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ UPDATE ============
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMilestone(@PathVariable Long id, @RequestBody UpdateMilestoneRequest request) {
        try {
            System.out.println("=== Updating Milestone ID: " + id + " ===");

            Milestone milestone = milestoneRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milestone not found with id: " + id));

            // Update fields if provided
            if (request.getTitle() != null && !request.getTitle().isEmpty()) {
                milestone.setTitle(request.getTitle());
            }
            if (request.getDescription() != null) {
                milestone.setDescription(request.getDescription());
            }
            if (request.getBudget() != null) {
                milestone.setBudget(request.getBudget());
            }
            if (request.getDeadline() != null) {
                milestone.setDeadline(request.getDeadline());
            }
            if (request.getStatus() != null) {
                milestone.setStatus(Milestone.MilestoneStatus.valueOf(request.getStatus()));
            }

            Milestone updated = milestoneRepository.save(milestone);
            System.out.println("Milestone updated successfully");

            Map<String, Object> response = new HashMap<>();
            response.put("id", updated.getId());
            response.put("message", "Milestone updated successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error updating milestone: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ DELETE ============
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMilestone(@PathVariable Long id) {
        try {
            System.out.println("=== Deleting Milestone ID: " + id + " ===");

            Milestone milestone = milestoneRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Milestone not found with id: " + id));

            // Check if milestone has applications or submissions
            // You may need to add these checks based on your entity relationships
            // if (milestone.getApplications() != null && !milestone.getApplications().isEmpty()) {
            //     return ResponseEntity.badRequest().body("Cannot delete milestone with existing applications");
            // }

            milestoneRepository.delete(milestone);
            System.out.println("Milestone deleted successfully");

            Map<String, String> response = new HashMap<>();
            response.put("message", "Milestone deleted successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error deleting milestone: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

@Data
class CreateMilestoneRequest {
    private Long projectId;
    private String title;
    private String description;
    private Double budget;
    private LocalDate deadline;
}

// ============ NEW: UPDATE REQUEST DTO ============
@Data
class UpdateMilestoneRequest {
    private String title;
    private String description;
    private Double budget;
    private LocalDate deadline;
    private String status;
}
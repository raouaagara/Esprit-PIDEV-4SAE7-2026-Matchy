package tn.esprit.pi.controller;

import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.User;
import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.repository.ProjectRepository;
import tn.esprit.pi.repository.MilestoneRepository;
import tn.esprit.pi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private UserRepository userRepository;

    // ============ CREATE PROJECT ============
    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody CreateProjectRequest request) {
        try {
            System.out.println("=== Creating Project ===");
            System.out.println("Title: " + request.getTitle());
            System.out.println("CompanyId: " + request.getCompanyId());

            // Find the company user
            User company = userRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company not found with id: " + request.getCompanyId()));

            Project project = new Project();
            project.setTitle(request.getTitle());
            project.setDescription(request.getDescription());
            project.setTotalBudget(request.getTotalBudget());
            project.setDeadline(request.getDeadline());
            project.setCompany(company);
            project.setStatus(Project.ProjectStatus.OPEN);
            project.setCreatedAt(LocalDateTime.now());

            Project saved = projectRepository.save(project);
            System.out.println("Project saved with ID: " + saved.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("title", saved.getTitle());
            response.put("message", "Project created successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error creating project: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ GET ALL PROJECTS OR FILTER BY STATUS ============
    @GetMapping("/all")
    public ResponseEntity<?> getAllProjects(@RequestParam(required = false) String status) {
        try {
            System.out.println("=== Getting Projects (status: " + status + ") ===");

            List<Project> projects;
            if (status != null && !status.isEmpty()) {
                try {
                    Project.ProjectStatus projectStatus = Project.ProjectStatus.valueOf(status.toUpperCase());
                    projects = projectRepository.findByStatus(projectStatus);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid status: " + status));
                }
            } else {
                projects = projectRepository.findAll();
            }
            
            System.out.println("Found " + projects.size() + " projects");

            List<Map<String, Object>> safeProjects = new ArrayList<>();
            for (Project p : projects) {
                try {
                    Map<String, Object> projectMap = new HashMap<>();
                    projectMap.put("id", p.getId());
                    projectMap.put("title", p.getTitle());
                    projectMap.put("description", p.getDescription());
                    projectMap.put("totalBudget", p.getTotalBudget());
                    projectMap.put("deadline", p.getDeadline());
                    projectMap.put("status", p.getStatus().toString());
                    projectMap.put("companyId", p.getCompany().getId());
                    
                    // Safely get company name
                    String companyName = "";
                    if (p.getCompany().getCompanyName() != null && !p.getCompany().getCompanyName().isEmpty()) {
                        companyName = p.getCompany().getCompanyName();
                    } else {
                        companyName = (p.getCompany().getFirstName() != null ? p.getCompany().getFirstName() : "") + 
                                     " " + 
                                     (p.getCompany().getLastName() != null ? p.getCompany().getLastName() : "");
                        companyName = companyName.trim();
                    }
                    projectMap.put("companyName", companyName.isEmpty() ? "Unknown Company" : companyName);
                    projectMap.put("createdAt", p.getCreatedAt());

                    // Get milestone count
                    List<Milestone> milestones = milestoneRepository.findByProject(p);
                    projectMap.put("milestoneCount", milestones.size());

                    safeProjects.add(projectMap);
                } catch (Exception ex) {
                    System.out.println("Error processing project " + p.getId() + ": " + ex.getMessage());
                    ex.printStackTrace();
                }
            }

            return ResponseEntity.ok(safeProjects);

        } catch (Exception e) {
            System.out.println("Error getting projects: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============ GET COMPANY PROJECTS ============
    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getCompanyProjects(@PathVariable Long companyId) {
        try {
            System.out.println("=== Getting Projects for Company ID: " + companyId + " ===");

            // Find the company user
            User company = userRepository.findById(companyId)
                    .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

            // Get projects using the User object
            List<Project> projects = projectRepository.findByCompany(company);
            System.out.println("Found " + projects.size() + " projects");

            // Create safe response
            List<Map<String, Object>> safeProjects = new ArrayList<>();
            for (Project p : projects) {
                try {
                    Map<String, Object> projectMap = new HashMap<>();
                    projectMap.put("id", p.getId());
                    projectMap.put("title", p.getTitle());
                    projectMap.put("description", p.getDescription());
                    projectMap.put("totalBudget", p.getTotalBudget());
                    projectMap.put("deadline", p.getDeadline());
                    projectMap.put("status", p.getStatus() != null ? p.getStatus().toString() : "OPEN");
                    projectMap.put("companyId", p.getCompany().getId());
                    
                    // Safely get company name
                    String companyName = "";
                    if (p.getCompany().getCompanyName() != null && !p.getCompany().getCompanyName().isEmpty()) {
                        companyName = p.getCompany().getCompanyName();
                    } else {
                        companyName = (p.getCompany().getFirstName() != null ? p.getCompany().getFirstName() : "") + 
                                     " " + 
                                     (p.getCompany().getLastName() != null ? p.getCompany().getLastName() : "");
                        companyName = companyName.trim();
                    }
                    projectMap.put("companyName", companyName.isEmpty() ? "Unknown Company" : companyName);
                    projectMap.put("createdAt", p.getCreatedAt());

                    // Get milestone count
                    List<Milestone> milestones = milestoneRepository.findByProject(p);
                    projectMap.put("milestoneCount", milestones.size());

                    safeProjects.add(projectMap);
                } catch (Exception ex) {
                    System.out.println("Error processing project " + p.getId() + ": " + ex.getMessage());
                }
            }

            return ResponseEntity.ok(safeProjects);

        } catch (Exception e) {
            System.out.println("Error getting projects: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ GET PROJECT BY ID ============
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        try {
            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

            Map<String, Object> projectMap = new HashMap<>();
            projectMap.put("id", project.getId());
            projectMap.put("title", project.getTitle());
            projectMap.put("description", project.getDescription());
            projectMap.put("totalBudget", project.getTotalBudget());
            projectMap.put("deadline", project.getDeadline());
            projectMap.put("status", project.getStatus().toString());
            projectMap.put("companyId", project.getCompany().getId());
            
            // Safely get company name
            String companyName = "";
            if (project.getCompany().getCompanyName() != null && !project.getCompany().getCompanyName().isEmpty()) {
                companyName = project.getCompany().getCompanyName();
            } else {
                companyName = (project.getCompany().getFirstName() != null ? project.getCompany().getFirstName() : "") + 
                             " " + 
                             (project.getCompany().getLastName() != null ? project.getCompany().getLastName() : "");
                companyName = companyName.trim();
            }
            projectMap.put("companyName", companyName.isEmpty() ? "Unknown Company" : companyName);
            projectMap.put("createdAt", project.getCreatedAt());

            return ResponseEntity.ok(projectMap);

        } catch (Exception e) {
            System.out.println("Error getting project: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ============ UPDATE PROJECT ============
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody UpdateProjectRequest request) {
        try {
            System.out.println("=== Updating Project ID: " + id + " ===");

            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

            // Update fields if provided
            if (request.getTitle() != null && !request.getTitle().isEmpty()) {
                project.setTitle(request.getTitle());
            }
            if (request.getDescription() != null) {
                project.setDescription(request.getDescription());
            }
            if (request.getTotalBudget() != null) {
                project.setTotalBudget(request.getTotalBudget());
            }
            if (request.getDeadline() != null) {
                project.setDeadline(request.getDeadline());
            }
            if (request.getStatus() != null) {
                project.setStatus(Project.ProjectStatus.valueOf(request.getStatus()));
            }

            Project updated = projectRepository.save(project);
            System.out.println("Project updated successfully");

            Map<String, Object> response = new HashMap<>();
            response.put("id", updated.getId());
            response.put("message", "Project updated successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error updating project: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ DELETE PROJECT ============
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            System.out.println("=== Deleting Project ID: " + id + " ===");

            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

            // Check if project has milestones
            List<Milestone> milestones = milestoneRepository.findByProject(project);
            if (milestones != null && !milestones.isEmpty()) {
                return ResponseEntity.badRequest().body("Cannot delete project with existing milestones. Delete milestones first.");
            }

            projectRepository.delete(project);
            System.out.println("Project deleted successfully");

            Map<String, String> response = new HashMap<>();
            response.put("message", "Project deleted successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("Error deleting project: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ============ GET PROJECT MILESTONES ============
    @GetMapping("/{id}/milestones")
    public ResponseEntity<?> getProjectMilestones(@PathVariable Long id) {
        try {
            System.out.println("=== Getting Milestones for Project ID: " + id + " ===");

            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

            List<Milestone> milestones = milestoneRepository.findByProject(project);

            List<Map<String, Object>> safeMilestones = new ArrayList<>();
            for (Milestone m : milestones) {
                Map<String, Object> milestoneMap = new HashMap<>();
                milestoneMap.put("id", m.getId());
                milestoneMap.put("title", m.getTitle());
                milestoneMap.put("description", m.getDescription());
                milestoneMap.put("budget", m.getBudget());
                milestoneMap.put("deadline", m.getDeadline());
                milestoneMap.put("status", m.getStatus() != null ? m.getStatus().toString() : "PENDING");
                milestoneMap.put("projectId", id);
                safeMilestones.add(milestoneMap);
            }

            return ResponseEntity.ok(safeMilestones);

        } catch (Exception e) {
            System.out.println("Error getting milestones: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

// ============ REQUEST DTOs ============
class CreateProjectRequest {
    private String title;
    private String description;
    private Double totalBudget;
    private LocalDate deadline;
    private Long companyId;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(Double totalBudget) { this.totalBudget = totalBudget; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
}

class UpdateProjectRequest {
    private String title;
    private String description;
    private Double totalBudget;
    private LocalDate deadline;
    private String status;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(Double totalBudget) { this.totalBudget = totalBudget; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
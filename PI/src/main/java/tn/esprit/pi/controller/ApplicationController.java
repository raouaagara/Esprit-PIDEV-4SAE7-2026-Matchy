// src/main/java/tn/esprit/pi/controller/ApplicationController.java
package tn.esprit.pi.controller;

import lombok.Data;
import tn.esprit.pi.entity.Application;
import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.User;
import tn.esprit.pi.repository.ApplicationRepository;
import tn.esprit.pi.repository.MilestoneRepository;
import tn.esprit.pi.repository.UserRepository;
import tn.esprit.pi.dto.ApplicationDTO;
import tn.esprit.pi.dto.CreateApplicationRequest;
import tn.esprit.pi.dto.CreateContractRequest;
import tn.esprit.pi.service.NotificationService;
import tn.esprit.pi.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final MilestoneRepository milestoneRepository;
    private final UserRepository userRepository;
    private final ContractService contractService;
    private final NotificationService notificationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyToMilestone(@RequestBody CreateApplicationRequest request) {
        try {
            System.out.println("=== Freelancer Applying to Milestone ===");
            System.out.println("MilestoneId: " + request.getMilestoneId());
            System.out.println("FreelancerId: " + request.getFreelancerId());

            Milestone milestone = milestoneRepository.findById(request.getMilestoneId())
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));

            User freelancer = userRepository.findById(request.getFreelancerId())
                    .orElseThrow(() -> new RuntimeException("Freelancer not found"));

            // Check if already applied
            if (applicationRepository.findByMilestoneAndFreelancer(milestone, freelancer).isPresent()) {
                return ResponseEntity.badRequest().body("You have already applied to this milestone");
            }

            Application application = new Application();
            application.setMilestone(milestone);
            application.setFreelancer(freelancer);
            application.setCoverLetter(request.getCoverLetter());
            application.setProposedBudget(request.getProposedBudget());
            application.setStatus(Application.ApplicationStatus.PENDING);

            Application saved = applicationRepository.save(application);
            System.out.println("Application saved with ID: " + saved.getId());

            // Send notification to company
            User company = milestone.getProject().getCompany();
            notificationService.createNotification(
                company,
                "New Application Received",
                freelancer.getFirstName() + " " + freelancer.getLastName() + 
                " applied to milestone: " + milestone.getTitle(),
                tn.esprit.pi.entity.Notification.NotificationType.APPLICATION_RECEIVED,
                saved.getId()
            );

            return ResponseEntity.ok(convertToDTO(saved));

        } catch (Exception e) {
            System.out.println("Error applying to milestone: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
// src/main/java/tn/esprit/pi/controller/ApplicationController.java
// Add these new endpoints

    @PutMapping("/{applicationId}/schedule-interview")
    public ResponseEntity<?> scheduleInterview(
            @PathVariable Long applicationId,
            @RequestBody InterviewScheduleRequest request) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            application.setInterviewDate(request.getInterviewDate());
            application.setMeetLink(request.getMeetLink());
            application.setStatus(Application.ApplicationStatus.INTERVIEW_SCHEDULED);

            Application updated = applicationRepository.save(application);

            // Send notification to freelancer
            notificationService.createNotification(
                application.getFreelancer(),
                "Interview Scheduled",
                "Your interview for milestone '" + application.getMilestone().getTitle() + 
                "' has been scheduled for " + request.getInterviewDate(),
                tn.esprit.pi.entity.Notification.NotificationType.INTERVIEW_SCHEDULED,
                updated.getId()
            );

            return ResponseEntity.ok(convertToDTO(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{applicationId}/confirm-interview")
    public ResponseEntity<?> confirmInterview(@PathVariable Long applicationId) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            application.setFreelancerConfirmed(true);
            application.setStatus(Application.ApplicationStatus.INTERVIEW_CONFIRMED);

            Application updated = applicationRepository.save(application);

            // Send notification to company
            User company = application.getMilestone().getProject().getCompany();
            notificationService.createNotification(
                company,
                "Interview Confirmed",
                application.getFreelancer().getFirstName() + " " + 
                application.getFreelancer().getLastName() + 
                " confirmed the interview for milestone: " + application.getMilestone().getTitle(),
                tn.esprit.pi.entity.Notification.NotificationType.INTERVIEW_CONFIRMED,
                updated.getId()
            );

            return ResponseEntity.ok(convertToDTO(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{applicationId}/final-decision")
    public ResponseEntity<?> finalDecision(
            @PathVariable Long applicationId,
            @RequestParam String status,
            @RequestParam String feedback) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            application.setStatus(Application.ApplicationStatus.valueOf(status));
            application.setCompanyFeedback(feedback);

            // If accepted, update milestone and generate contract
            if (status.equals("ACCEPTED")) {
                Milestone milestone = application.getMilestone();
                milestone.setAssignedFreelancer(application.getFreelancer());
                milestone.setStatus(Milestone.MilestoneStatus.IN_PROGRESS);
                milestoneRepository.save(milestone);

                // Generate contract automatically
                CreateContractRequest contractRequest = new CreateContractRequest();
                contractRequest.setProjectId(milestone.getProject().getId());
                contractRequest.setMilestoneId(milestone.getId());
                contractRequest.setCompanyId(milestone.getProject().getCompany().getId());
                contractRequest.setFreelancerId(application.getFreelancer().getId());
                contractRequest.setAmount(application.getProposedBudget());
                contractRequest.setStartDate(LocalDate.now());
                contractRequest.setEndDate(milestone.getDeadline());
                contractRequest.setTerms(
                    "This contract is for the completion of milestone: " + milestone.getTitle() + "\n\n" +
                    "Project: " + milestone.getProject().getTitle() + "\n" +
                    "Description: " + milestone.getDescription() + "\n\n" +
                    "Payment Amount: " + application.getProposedBudget() + " TND\n" +
                    "Deadline: " + milestone.getDeadline() + "\n\n" +
                    "Terms and Conditions:\n" +
                    "1. The freelancer agrees to complete the work as described in the milestone.\n" +
                    "2. Payment will be released upon successful completion and approval of the work.\n" +
                    "3. Both parties agree to communicate professionally and meet deadlines.\n" +
                    "4. Any disputes will be resolved through the platform's dispute resolution process."
                );
                
                try {
                    contractService.generateContract(contractRequest);
                    System.out.println("Contract generated successfully for application: " + applicationId);
                } catch (Exception e) {
                    System.out.println("Error generating contract: " + e.getMessage());
                    // Continue even if contract generation fails
                }

                // Send acceptance notification to freelancer
                notificationService.createNotification(
                    application.getFreelancer(),
                    "Application Accepted!",
                    "Congratulations! Your application for milestone '" + 
                    milestone.getTitle() + "' has been accepted. A contract has been sent to you for review and signature.",
                    tn.esprit.pi.entity.Notification.NotificationType.APPLICATION_ACCEPTED,
                    application.getId()
                );
            } else if (status.equals("REJECTED")) {
                // Send rejection notification to freelancer
                notificationService.createNotification(
                    application.getFreelancer(),
                    "Application Update",
                    "Your application for milestone '" + 
                    application.getMilestone().getTitle() + "' was not accepted this time.",
                    tn.esprit.pi.entity.Notification.NotificationType.APPLICATION_REJECTED,
                    application.getId()
                );
            }

            Application updated = applicationRepository.save(application);

            return ResponseEntity.ok(convertToDTO(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Add this DTO inside the controller file
    // Add this DTO inside the controller file - MAKE IT STATIC
    @Data
    public static class InterviewScheduleRequest {
        private LocalDateTime interviewDate;
        private String meetLink;
    }
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<?> getFreelancerApplications(@PathVariable Long freelancerId) {
        try {
            User freelancer = userRepository.findById(freelancerId)
                    .orElseThrow(() -> new RuntimeException("Freelancer not found"));

            List<Application> applications = applicationRepository.findByFreelancer(freelancer);

            List<ApplicationDTO> dtos = applications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
// src/main/java/tn/esprit/pi/controller/ApplicationController.java
// Add this method to your existing controller

    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getCompanyApplications(@PathVariable Long companyId) {
        try {
            System.out.println("=== Getting applications for company ID: " + companyId + " ===");

            // Get all applications
            List<Application> allApplications = applicationRepository.findAll();

            // Filter applications for this company's projects
            List<ApplicationDTO> companyApplications = allApplications.stream()
                    .filter(app -> app.getMilestone().getProject().getCompany().getId().equals(companyId))
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            System.out.println("Found " + companyApplications.size() + " applications");

            return ResponseEntity.ok(companyApplications);

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/milestone/{milestoneId}")
    public ResponseEntity<?> getMilestoneApplications(@PathVariable Long milestoneId) {
        try {
            Milestone milestone = milestoneRepository.findById(milestoneId)
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));

            List<Application> applications = applicationRepository.findByMilestone(milestone);

            List<ApplicationDTO> dtos = applications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllApplications() {
        try {
            System.out.println("=== Getting all applications ===");
            List<Application> applications = applicationRepository.findAll();
            
            List<ApplicationDTO> dtos = applications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            
            System.out.println("Found " + dtos.size() + " applications");
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            application.setStatus(Application.ApplicationStatus.valueOf(status));
            Application updated = applicationRepository.save(application);

            return ResponseEntity.ok(convertToDTO(updated));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private ApplicationDTO convertToDTO(Application app) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(app.getId());
        dto.setMilestoneId(app.getMilestone().getId());
        dto.setMilestoneTitle(app.getMilestone().getTitle());
        dto.setProjectId(app.getMilestone().getProject().getId());
        dto.setProjectTitle(app.getMilestone().getProject().getTitle());
        dto.setFreelancerId(app.getFreelancer().getId());
        dto.setFreelancerName(app.getFreelancer().getFirstName() + " " + app.getFreelancer().getLastName());
        dto.setCoverLetter(app.getCoverLetter());
        dto.setProposedBudget(app.getProposedBudget());
        dto.setStatus(app.getStatus().toString());
        dto.setAppliedAt(app.getAppliedAt());
        dto.setInterviewDate(app.getInterviewDate());
        dto.setMeetLink(app.getMeetLink());
        dto.setCompanyFeedback(app.getCompanyFeedback());
        dto.setFreelancerConfirmed(app.getFreelancerConfirmed());
        return dto;
    }
}
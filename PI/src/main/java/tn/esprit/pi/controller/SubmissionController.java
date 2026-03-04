// src/main/java/tn/esprit/pi/controller/SubmissionController.java
package tn.esprit.pi.controller;

import tn.esprit.pi.entity.*;
import tn.esprit.pi.repository.*;
import tn.esprit.pi.dto.*;
import tn.esprit.pi.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionRepository submissionRepository;
    private final MilestoneRepository milestoneRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final NotificationService notificationService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitWork(@RequestBody CreateSubmissionRequest request) {
        try {
            System.out.println("=== Freelancer Submitting Work ===");
            System.out.println("MilestoneId: " + request.getMilestoneId());
            System.out.println("FreelancerId: " + request.getFreelancerId());

            Milestone milestone = milestoneRepository.findById(request.getMilestoneId())
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));

            // Verify freelancer is assigned to this milestone
            if (milestone.getAssignedFreelancer() == null ||
                    !milestone.getAssignedFreelancer().getId().equals(request.getFreelancerId())) {
                return ResponseEntity.badRequest().body("You are not assigned to this milestone");
            }

            User freelancer = userRepository.findById(request.getFreelancerId())
                    .orElseThrow(() -> new RuntimeException("Freelancer not found"));

            Submission submission = new Submission();
            submission.setMilestone(milestone);
            submission.setFreelancer(freelancer);
            submission.setTitle(request.getTitle());
            submission.setDescription(request.getDescription());
            submission.setAttachmentUrl(request.getAttachmentUrl());
            submission.setStatus(Submission.SubmissionStatus.SUBMITTED);

            // Update milestone status
            milestone.setStatus(Milestone.MilestoneStatus.COMPLETED);
            milestoneRepository.save(milestone);

            Submission saved = submissionRepository.save(submission);
            System.out.println("Submission saved with ID: " + saved.getId());

            // Send notification to company
            User company = milestone.getProject().getCompany();
            notificationService.createNotification(
                company,
                "Work Submitted",
                freelancer.getFirstName() + " " + freelancer.getLastName() + 
                " submitted work for milestone: " + milestone.getTitle(),
                Notification.NotificationType.SUBMISSION_RECEIVED,
                saved.getId()
            );

            return ResponseEntity.ok(convertToDTO(saved));

        } catch (Exception e) {
            System.out.println("Error submitting work: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<?> getFreelancerSubmissions(@PathVariable Long freelancerId) {
        try {
            User freelancer = userRepository.findById(freelancerId)
                    .orElseThrow(() -> new RuntimeException("Freelancer not found"));

            List<Submission> submissions = submissionRepository.findByFreelancer(freelancer);

            List<SubmissionDTO> dtos = submissions.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getCompanySubmissions(@PathVariable Long companyId) {
        try {
            List<Submission> allSubmissions = submissionRepository.findAll();

            List<SubmissionDTO> companySubmissions = allSubmissions.stream()
                    .filter(sub -> sub.getMilestone().getProject().getCompany().getId().equals(companyId))
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(companySubmissions);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/milestone/{milestoneId}")
    public ResponseEntity<?> getMilestoneSubmissions(@PathVariable Long milestoneId) {
        try {
            Milestone milestone = milestoneRepository.findById(milestoneId)
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));

            List<Submission> submissions = submissionRepository.findByMilestone(milestone);

            List<SubmissionDTO> dtos = submissions.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllSubmissions() {
        try {
            System.out.println("=== Getting all submissions ===");
            List<Submission> submissions = submissionRepository.findAll();
            
            List<SubmissionDTO> dtos = submissions.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            
            System.out.println("Found " + dtos.size() + " submissions");
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private SubmissionDTO convertToDTO(Submission submission) {
        SubmissionDTO dto = new SubmissionDTO();
        dto.setId(submission.getId());
        dto.setMilestoneId(submission.getMilestone().getId());
        dto.setMilestoneTitle(submission.getMilestone().getTitle());
        dto.setProjectId(submission.getMilestone().getProject().getId());
        dto.setProjectTitle(submission.getMilestone().getProject().getTitle());
        dto.setFreelancerId(submission.getFreelancer().getId());
        dto.setFreelancerName(submission.getFreelancer().getFirstName() + " " + submission.getFreelancer().getLastName());
        dto.setTitle(submission.getTitle());
        dto.setDescription(submission.getDescription());
        dto.setAttachmentUrl(submission.getAttachmentUrl());
        dto.setStatus(submission.getStatus().toString());
        dto.setSubmittedAt(submission.getSubmittedAt());

        if (submission.getReview() != null) {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setId(submission.getReview().getId());
            reviewDTO.setSubmissionId(submission.getId());
            reviewDTO.setReviewerId(submission.getReview().getReviewer().getId());
            reviewDTO.setReviewerName(submission.getReview().getReviewer().getFirstName() + " " +
                    submission.getReview().getReviewer().getLastName());
            reviewDTO.setComments(submission.getReview().getComments());
            reviewDTO.setRating(submission.getReview().getRating());
            reviewDTO.setStatus(submission.getReview().getStatus().toString());
            reviewDTO.setCreatedAt(submission.getReview().getCreatedAt());
            dto.setReview(reviewDTO);
        }

        return dto;
    }
}
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
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final MilestoneRepository milestoneRepository;
    private final NotificationService notificationService;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestBody CreateReviewRequest request) {
        try {
            System.out.println("=== Company Reviewing Submission ===");
            System.out.println("SubmissionId: " + request.getSubmissionId());
            System.out.println("ReviewerId: " + request.getReviewerId());

            Submission submission = submissionRepository.findById(request.getSubmissionId())
                    .orElseThrow(() -> new RuntimeException("Submission not found"));

            User reviewer = userRepository.findById(request.getReviewerId())
                    .orElseThrow(() -> new RuntimeException("Reviewer not found"));

            // Check if already reviewed
            if (reviewRepository.findBySubmission(submission).isPresent()) {
                return ResponseEntity.badRequest().body("This submission has already been reviewed");
            }

            Review review = new Review();
            review.setSubmission(submission);
            review.setReviewer(reviewer);
            review.setComments(request.getComments());
            review.setRating(request.getRating());

            Review.ReviewStatus reviewStatus = Review.ReviewStatus.valueOf(request.getStatus());
            review.setStatus(reviewStatus);

            // Update submission status
            if (reviewStatus == Review.ReviewStatus.APPROVED) {
                submission.setStatus(Submission.SubmissionStatus.APPROVED);

                // Update milestone status to PAID
                Milestone milestone = submission.getMilestone();
                milestone.setStatus(Milestone.MilestoneStatus.PAID);
                milestoneRepository.save(milestone);

                // Send approval notification to freelancer
                notificationService.createNotification(
                    submission.getFreelancer(),
                    "Work Approved!",
                    "Your submission for milestone '" + milestone.getTitle() + 
                    "' has been approved with rating: " + request.getRating() + "/5",
                    Notification.NotificationType.SUBMISSION_REVIEWED,
                    submission.getId()
                );

            } else if (reviewStatus == Review.ReviewStatus.REJECTED) {
                submission.setStatus(Submission.SubmissionStatus.REJECTED);

                // Reopen milestone for revision
                Milestone milestone = submission.getMilestone();
                milestone.setStatus(Milestone.MilestoneStatus.IN_PROGRESS);
                milestoneRepository.save(milestone);

                // Send rejection notification to freelancer
                notificationService.createNotification(
                    submission.getFreelancer(),
                    "Revision Requested",
                    "Your submission for milestone '" + milestone.getTitle() + 
                    "' needs revision. Please check the feedback.",
                    Notification.NotificationType.SUBMISSION_REVIEWED,
                    submission.getId()
                );
            }

            submissionRepository.save(submission);
            Review saved = reviewRepository.save(review);
            System.out.println("Review saved with ID: " + saved.getId());

            return ResponseEntity.ok(convertToDTO(saved));

        } catch (Exception e) {
            System.out.println("Error creating review: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<?> getReviewBySubmission(@PathVariable Long submissionId) {
        try {
            Submission submission = submissionRepository.findById(submissionId)
                    .orElseThrow(() -> new RuntimeException("Submission not found"));

            Review review = reviewRepository.findBySubmission(submission)
                    .orElse(null);

            if (review == null) {
                return ResponseEntity.ok(null);
            }

            return ResponseEntity.ok(convertToDTO(review));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        try {
            System.out.println("=== Getting all reviews ===");
            List<Review> reviews = reviewRepository.findAll();
            
            List<ReviewDTO> dtos = reviews.stream()
                    .map(this::convertToDTO)
                    .collect(java.util.stream.Collectors.toList());
            
            System.out.println("Found " + dtos.size() + " reviews");
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setSubmissionId(review.getSubmission().getId());
        dto.setReviewerId(review.getReviewer().getId());
        dto.setReviewerName(review.getReviewer().getFirstName() + " " + review.getReviewer().getLastName());
        dto.setComments(review.getComments());
        dto.setRating(review.getRating());
        dto.setStatus(review.getStatus().toString());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
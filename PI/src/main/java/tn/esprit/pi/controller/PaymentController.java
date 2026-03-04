package tn.esprit.pi.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class PaymentController {

    @GetMapping("/freelancer/{freelancerId}/history")
    public ResponseEntity<?> getFreelancerPaymentHistory(@PathVariable Long freelancerId) {
        try {
            System.out.println("=== Getting payment history for freelancer: " + freelancerId + " ===");
            
            // Return empty list for now - will be populated when payments are implemented
            List<PaymentDTO> payments = new ArrayList<>();
            
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/company/{companyId}/history")
    public ResponseEntity<?> getCompanyPaymentHistory(@PathVariable Long companyId) {
        try {
            System.out.println("=== Getting payment history for company: " + companyId + " ===");
            
            // Return empty list for now - will be populated when payments are implemented
            List<PaymentDTO> payments = new ArrayList<>();
            
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/freelancer/{freelancerId}/stats")
    public ResponseEntity<?> getFreelancerPaymentStats(@PathVariable Long freelancerId) {
        try {
            System.out.println("=== Getting payment stats for freelancer: " + freelancerId + " ===");
            
            PaymentStatsDTO stats = new PaymentStatsDTO();
            stats.setTotalEarned(0.0);
            stats.setPendingPayments(0.0);
            stats.setCompletedPayments(0.0);
            stats.setEscrowBalance(0.0);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/company/{companyId}/stats")
    public ResponseEntity<?> getCompanyPaymentStats(@PathVariable Long companyId) {
        try {
            System.out.println("=== Getting payment stats for company: " + companyId + " ===");
            
            PaymentStatsDTO stats = new PaymentStatsDTO();
            stats.setTotalEarned(0.0);
            stats.setPendingPayments(0.0);
            stats.setCompletedPayments(0.0);
            stats.setEscrowBalance(0.0);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // DTOs
    @Data
    public static class PaymentDTO {
        private Long id;
        private Long milestoneId;
        private String milestoneTitle;
        private Long projectId;
        private String projectTitle;
        private Double amount;
        private String status;
        private LocalDateTime createdAt;
        private LocalDateTime paidAt;
    }

    @Data
    public static class PaymentStatsDTO {
        private Double totalEarned;
        private Double pendingPayments;
        private Double completedPayments;
        private Double escrowBalance;
    }
}

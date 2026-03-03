package com.matchy.controller;

import com.matchy.entity.Proposal;
import com.matchy.service.ProposalService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    @Autowired private ProposalService proposalService;

    @GetMapping
    public ResponseEntity<List<Proposal>> getAll(
        @RequestParam(required = false) Long projectId,
        @RequestParam(required = false) Long freelancerId) {
        if (projectId != null)   return ResponseEntity.ok(proposalService.getProposalsByProject(projectId));
        if (freelancerId != null) return ResponseEntity.ok(proposalService.getProposalsByFreelancer(freelancerId));
        return ResponseEntity.ok(proposalService.getAllProposals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return proposalService.getProposalById(id).map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Proposal proposal, HttpServletRequest req) {
        try {
            String userId = (String) req.getAttribute("userId");
            if (userId == null) userId = "3";

            String email = (String) req.getAttribute("userEmail");
            if (email == null) email = "freelancer@matchy.tn";

            // ✅ Extract real full name from JWT attributes
            String firstName = (String) req.getAttribute("firstName");
            String lastName  = (String) req.getAttribute("lastName");
            String fullName  = buildFullName(firstName, lastName);

            return ResponseEntity.ok(proposalService.createProposal(proposal, userId, fullName, email));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            return ResponseEntity.ok(proposalService.updateStatus(id, body.get("status"), body.get("feedback")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        proposalService.deleteProposal(id);
        return ResponseEntity.ok(Map.of("message", "Proposal deleted"));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(proposalService.getStats());
    }

    private String buildFullName(String firstName, String lastName) {
        if (firstName == null && lastName == null) return "Unknown";
        if (firstName == null) return lastName;
        if (lastName == null)  return firstName;
        return firstName + " " + lastName;
    }
}
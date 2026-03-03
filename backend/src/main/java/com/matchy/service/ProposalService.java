package com.matchy.service;

import com.matchy.entity.Proposal;
import com.matchy.entity.User;
import com.matchy.repository.ProposalRepository;
import com.matchy.repository.ProjectRepository;
import com.matchy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProposalService {

    @Autowired private ProposalRepository proposalRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private NotificationService notificationService;
    @Autowired private EmailService emailService;
    @Autowired private UserRepository userRepository;
    @Autowired private GamificationService gamificationService;

    public List<Proposal> getAllProposals() { return proposalRepository.findAll(); }
    public Optional<Proposal> getProposalById(Long id) { return proposalRepository.findById(id); }
    public List<Proposal> getProposalsByProject(Long projectId) { return proposalRepository.findByProjectId(projectId); }
    public List<Proposal> getProposalsByFreelancer(Long freelancerId) { return proposalRepository.findByFreelancerId(freelancerId); }

    public Proposal createProposal(Proposal proposal, String userId, String userName, String userEmail) {
        if (proposalRepository.existsByProjectIdAndFreelancerId(proposal.getProjectId(), Long.parseLong(userId)))
            throw new RuntimeException("You already applied to this project");

        proposal.setFreelancerId(Long.parseLong(userId));
        proposal.setFreelancerName(userName);
        proposal.setFreelancerEmail(userEmail);
        proposal.setStatus(Proposal.ProposalStatus.PENDING);

        projectRepository.findById(proposal.getProjectId()).ifPresent(project -> {
            proposal.setProjectTitle(project.getTitle());
            proposal.setClientId(project.getClientId());
            proposal.setClientEmail(project.getClientEmail());

            notificationService.notifyProposalReceived(
                project.getClientId(), project.getClientEmail(),
                userName, project.getTitle()
            );

            userRepository.findById(project.getClientId()).ifPresent(client -> {
                String freelancerBio = userRepository.findById(Long.parseLong(userId))
                    .map(User::getBio).orElse("");
                try {
                    emailService.sendNewProposalToClient(
                        project.getClientEmail(), client.getFirstName(),
                        project.getTitle(), userName, freelancerBio
                    );
                } catch (Exception e) {
                    System.err.println("New proposal email failed: " + e.getMessage());
                }
            });
        });

        Proposal saved = proposalRepository.save(proposal);

        // Increment proposalsCount on the project
        projectRepository.findById(saved.getProjectId()).ifPresent(project -> {
            int current = project.getProposalsCount() == null ? 0 : project.getProposalsCount();
            project.setProposalsCount(current + 1);
            projectRepository.save(project);
        });

        // Gamification — check badges on submission
        gamificationService.onProposalSubmitted(saved.getFreelancerId());

        return saved;
    }

    public Proposal updateStatus(Long id, String status, String feedback) {
        Proposal p = proposalRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proposal not found"));

        Proposal.ProposalStatus newStatus = Proposal.ProposalStatus.valueOf(status.toUpperCase());
        p.setStatus(newStatus);
        if (feedback != null) p.setClientFeedback(feedback);

        Proposal saved = proposalRepository.save(p);

        userRepository.findById(p.getFreelancerId()).ifPresent(freelancer -> {
            String firstName = freelancer.getFirstName();

            if (newStatus == Proposal.ProposalStatus.ACCEPTED) {
                notificationService.notifyProposalAccepted(
                    p.getFreelancerId(), p.getFreelancerEmail(), p.getProjectTitle()
                );
                String clientName = userRepository.findById(p.getClientId())
                    .map(User::getFirstName).orElse("the client");
                try {
                    emailService.sendProposalAccepted(
                        p.getFreelancerEmail(), firstName, p.getProjectTitle(), clientName
                    );
                } catch (Exception e) {
                    System.err.println("Accepted email failed: " + e.getMessage());
                }
                // Gamification
                gamificationService.onProposalAccepted(p.getFreelancerId());

            } else if (newStatus == Proposal.ProposalStatus.REJECTED) {
                notificationService.notifyProposalRejected(
                    p.getFreelancerId(), p.getFreelancerEmail(), p.getProjectTitle()
                );
                try {
                    emailService.sendProposalRejected(
                        p.getFreelancerEmail(), firstName, p.getProjectTitle()
                    );
                } catch (Exception e) {
                    System.err.println("Rejected email failed: " + e.getMessage());
                }
                // Gamification
                gamificationService.onProposalRejected(p.getFreelancerId());
            }
        });

        return saved;
    }

    public void deleteProposal(Long id) { proposalRepository.deleteById(id); }

    public Map<String, Long> getStats() {
        Map<String, Long> s = new LinkedHashMap<>();
        s.put("total",    proposalRepository.count());
        s.put("pending",  proposalRepository.countByStatus(Proposal.ProposalStatus.PENDING));
        s.put("accepted", proposalRepository.countByStatus(Proposal.ProposalStatus.ACCEPTED));
        s.put("rejected", proposalRepository.countByStatus(Proposal.ProposalStatus.REJECTED));
        return s;
    }
}
// src/main/java/tn/esprit/pi/repository/SubmissionRepository.java
package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Submission;
import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByFreelancer(User freelancer);
    List<Submission> findByMilestone(Milestone milestone);
    List<Submission> findByMilestoneAndStatus(Milestone milestone, Submission.SubmissionStatus status);
    List<Submission> findByFreelancerAndStatus(User freelancer, Submission.SubmissionStatus status);
}
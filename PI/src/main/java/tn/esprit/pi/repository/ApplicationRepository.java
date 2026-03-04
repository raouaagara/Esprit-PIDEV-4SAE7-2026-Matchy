// src/main/java/tn/esprit/pi/repository/ApplicationRepository.java
package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Application;
import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByFreelancer(User freelancer);
    List<Application> findByMilestone(Milestone milestone);
    Optional<Application> findByMilestoneAndFreelancer(Milestone milestone, User freelancer);
    List<Application> findByFreelancerAndStatus(User freelancer, Application.ApplicationStatus status);
    // src/main/java/tn/esprit/pi/repository/ApplicationRepository.java
// Add these methods

    List<Application> findByStatus(Application.ApplicationStatus status);
    List<Application> findByFreelancerAndStatusIn(User freelancer, List<Application.ApplicationStatus> statuses);
}
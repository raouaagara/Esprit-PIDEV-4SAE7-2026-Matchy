package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByProject(Project project);
    List<Milestone> findByAssignedFreelancerId(Long freelancerId);
}
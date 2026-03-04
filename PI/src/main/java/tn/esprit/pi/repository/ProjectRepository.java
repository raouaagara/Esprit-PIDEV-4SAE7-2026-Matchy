package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCompany(User company);
    List<Project> findByCompanyAndStatus(User company, Project.ProjectStatus status);
    List<Project> findByStatus(Project.ProjectStatus status);
}
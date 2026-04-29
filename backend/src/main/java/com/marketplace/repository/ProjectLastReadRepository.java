package com.marketplace.repository;

import com.marketplace.entity.ProjectLastRead;
import com.marketplace.entity.User;
import com.marketplace.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProjectLastReadRepository extends JpaRepository<ProjectLastRead, Long> {

    Optional<ProjectLastRead> findByUserAndProject(User user, Project project);
}

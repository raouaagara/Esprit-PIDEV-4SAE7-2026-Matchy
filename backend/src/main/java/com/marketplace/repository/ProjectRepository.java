package com.marketplace.repository;

import com.marketplace.entity.Project;
import com.marketplace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOrganizer(User organizer);
    List<Project> findByOrganizerOrderByCreatedAtDesc(User organizer);
    List<Project> findAllByOrderByCreatedAtDesc();

    @Query("SELECT SUM(p.soldCount) FROM Project p WHERE p.organizer = :organizer")
    Integer sumSoldCountByOrganizer(@Param("organizer") User organizer);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.organizer = :organizer")
    Long countByOrganizer(@Param("organizer") User organizer);

    @Query("SELECT p.category, COUNT(p) FROM Project p WHERE p.organizer = :organizer GROUP BY p.category")
    List<Object[]> countByOrganizerGroupByCategory(@Param("organizer") User organizer);
}

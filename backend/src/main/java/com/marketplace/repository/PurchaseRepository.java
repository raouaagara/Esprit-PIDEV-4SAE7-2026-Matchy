package com.marketplace.repository;

import com.marketplace.entity.Purchase;
import com.marketplace.entity.Purchase.PurchaseStatus;
import com.marketplace.entity.User;
import com.marketplace.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    List<Purchase> findByClientOrderByRequestedAtDesc(User client);

    List<Purchase> findByProjectOrderByRequestedAtDesc(Project project);

    Optional<Purchase> findByClientAndProject(User client, Project project);

    @Query("SELECT p FROM Purchase p WHERE p.project.organizer = :organizer AND p.status = :status ORDER BY p.requestedAt DESC")
    List<Purchase> findByOrganizerAndStatus(@Param("organizer") User organizer, @Param("status") PurchaseStatus status);

    @Query("SELECT COUNT(p) FROM Purchase p WHERE p.project.organizer = :organizer AND p.status = 'PENDING'")
    long countPendingByOrganizer(@Param("organizer") User organizer);

    boolean existsByClientAndProject(User client, Project project);

    @Query("SELECT COUNT(p) FROM Purchase p WHERE p.client.id = :clientId AND p.project.id = :projectId")
    Long countByClientIdAndProjectId(@Param("clientId") Long clientId, @Param("projectId") Long projectId);
}

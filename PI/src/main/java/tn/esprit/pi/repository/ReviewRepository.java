// src/main/java/tn/esprit/pi/repository/ReviewRepository.java
package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Review;
import tn.esprit.pi.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findBySubmission(Submission submission);
}
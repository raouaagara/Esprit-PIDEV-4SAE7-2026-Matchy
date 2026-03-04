// src/main/java/tn/esprit/pi/dto/ReviewDTO.java
package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Long submissionId;
    private Long reviewerId;
    private String reviewerName;
    private String comments;
    private Integer rating;
    private String status;
    private LocalDateTime createdAt;
}
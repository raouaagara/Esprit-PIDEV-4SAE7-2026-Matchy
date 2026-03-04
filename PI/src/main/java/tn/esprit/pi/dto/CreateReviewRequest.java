// src/main/java/tn/esprit/pi/dto/CreateReviewRequest.java
package tn.esprit.pi.dto;

import lombok.Data;

@Data
public class CreateReviewRequest {
    private Long submissionId;
    private Long reviewerId;
    private String comments;
    private Integer rating;
    private String status; // APPROVED or REJECTED
}
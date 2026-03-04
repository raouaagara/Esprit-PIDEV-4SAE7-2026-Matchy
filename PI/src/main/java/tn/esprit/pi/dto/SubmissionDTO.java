// src/main/java/tn/esprit/pi/dto/SubmissionDTO.java
package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubmissionDTO {
    private Long id;
    private Long milestoneId;
    private String milestoneTitle;
    private Long projectId;
    private String projectTitle;
    private Long freelancerId;
    private String freelancerName;
    private String title;
    private String description;
    private String attachmentUrl;
    private String status;
    private LocalDateTime submittedAt;
    private ReviewDTO review;
}
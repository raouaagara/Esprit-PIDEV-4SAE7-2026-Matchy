// src/main/java/tn/esprit/pi/dto/ApplicationDTO.java
package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationDTO {
    private Long id;
    private Long milestoneId;
    private String milestoneTitle;
    private Long projectId;
    private String projectTitle;
    private Long freelancerId;
    private String freelancerName;
    private String coverLetter;
    private Double proposedBudget;
    private String status;
    private LocalDateTime appliedAt;
    // src/main/java/tn/esprit/pi/dto/ApplicationDTO.java
// Add these fields

    private LocalDateTime interviewDate;
    private String meetLink;
    private String companyFeedback;
    private Boolean freelancerConfirmed;
}
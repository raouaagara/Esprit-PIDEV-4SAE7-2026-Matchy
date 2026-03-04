// src/main/java/tn/esprit/pi/dto/CreateSubmissionRequest.java
package tn.esprit.pi.dto;

import lombok.Data;

@Data
public class CreateSubmissionRequest {
    private Long milestoneId;
    private Long freelancerId;
    private String title;
    private String description;
    private String attachmentUrl;
}
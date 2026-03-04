// src/main/java/tn/esprit/pi/dto/CreateApplicationRequest.java
package tn.esprit.pi.dto;

import lombok.Data;

@Data
public class CreateApplicationRequest {
    private Long milestoneId;
    private Long freelancerId;
    private String coverLetter;
    private Double proposedBudget;
}
package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private Long companyId;
    private String companyName;
    private Double totalBudget;
    private LocalDate deadline;
    private String status;
    private List<MilestoneDTO> milestones;
}

@Data
class MilestoneDTO {
    private Long id;
    private String title;
    private String description;
    private Double budget;
    private LocalDate deadline;
    private String status;
    private Long assignedFreelancerId;
    private String assignedFreelancerName;
}
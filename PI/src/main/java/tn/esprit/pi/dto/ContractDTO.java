package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ContractDTO {
    private Long id;
    private Long projectId;
    private String projectTitle;
    private Long milestoneId;
    private String milestoneTitle;
    private Long companyId;
    private String companyName;
    private Long freelancerId;
    private String freelancerName;
    private String contractNumber;
    private String terms;
    private Double amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Boolean companySigned;
    private LocalDateTime companySignedAt;
    private Boolean freelancerSigned;
    private LocalDateTime freelancerSignedAt;
    private String terminationReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

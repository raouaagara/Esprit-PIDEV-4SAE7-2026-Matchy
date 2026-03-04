package tn.esprit.pi.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateContractRequest {
    private Long projectId;
    private Long milestoneId;
    private Long companyId;
    private Long freelancerId;
    private String terms;
    private Double amount;
    private LocalDate startDate;
    private LocalDate endDate;
}

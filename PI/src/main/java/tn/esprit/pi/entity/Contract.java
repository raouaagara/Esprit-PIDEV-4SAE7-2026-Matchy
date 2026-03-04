package tn.esprit.pi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;
    
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private User company;
    
    @ManyToOne
    @JoinColumn(name = "freelancer_id", nullable = false)
    private User freelancer;
    
    @Column(name = "contract_number", unique = true)
    private String contractNumber;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String terms;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractStatus status = ContractStatus.PENDING;
    
    @Column(name = "company_signed")
    private Boolean companySigned = false;
    
    @Column(name = "company_signed_at")
    private LocalDateTime companySignedAt;
    
    @Column(name = "freelancer_signed")
    private Boolean freelancerSigned = false;
    
    @Column(name = "freelancer_signed_at")
    private LocalDateTime freelancerSignedAt;
    
    @Column(name = "termination_reason")
    private String terminationReason;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum ContractStatus {
        PENDING,
        ACTIVE,
        COMPLETED,
        TERMINATED,
        EXPIRED
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (contractNumber == null) {
            contractNumber = "CNT-" + System.currentTimeMillis();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

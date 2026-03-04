package tn.esprit.pi.service;

import tn.esprit.pi.entity.Contract;
import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.Milestone;
import tn.esprit.pi.entity.User;
import tn.esprit.pi.repository.ContractRepository;
import tn.esprit.pi.repository.ProjectRepository;
import tn.esprit.pi.repository.MilestoneRepository;
import tn.esprit.pi.repository.UserRepository;
import tn.esprit.pi.dto.ContractDTO;
import tn.esprit.pi.dto.CreateContractRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractService {
    
    private final ContractRepository contractRepository;
    private final ProjectRepository projectRepository;
    private final MilestoneRepository milestoneRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    @Transactional
    public ContractDTO generateContract(CreateContractRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        User company = userRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        User freelancer = userRepository.findById(request.getFreelancerId())
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        
        Milestone milestone = null;
        if (request.getMilestoneId() != null) {
            milestone = milestoneRepository.findById(request.getMilestoneId())
                    .orElseThrow(() -> new RuntimeException("Milestone not found"));
        }
        
        Contract contract = new Contract();
        contract.setProject(project);
        contract.setMilestone(milestone);
        contract.setCompany(company);
        contract.setFreelancer(freelancer);
        contract.setTerms(request.getTerms());
        contract.setAmount(request.getAmount());
        contract.setStartDate(request.getStartDate());
        contract.setEndDate(request.getEndDate());
        contract.setStatus(Contract.ContractStatus.PENDING);
        contract.setCompanySigned(true); // Company auto-signs when generating
        contract.setCompanySignedAt(LocalDateTime.now());
        
        Contract saved = contractRepository.save(contract);
        
        // Notify freelancer about new contract
        notificationService.createNotification(
            freelancer,
            "New Contract",
            "You have received a contract for project: " + project.getTitle() + ". Please review and sign.",
            tn.esprit.pi.entity.Notification.NotificationType.CONTRACT_RECEIVED,
            saved.getId()
        );
        
        return convertToDTO(saved);
    }
    
    public ContractDTO getContract(Long contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        return convertToDTO(contract);
    }
    
    public List<ContractDTO> getProjectContracts(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return contractRepository.findByProject(project)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ContractDTO> getCompanyContracts(Long companyId) {
        User company = userRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return contractRepository.findByCompany(company)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ContractDTO> getFreelancerContracts(Long freelancerId) {
        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        return contractRepository.findByFreelancer(freelancer)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ContractDTO signContract(Long contractId, Long userId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getId().equals(contract.getFreelancer().getId())) {
            contract.setFreelancerSigned(true);
            contract.setFreelancerSignedAt(LocalDateTime.now());
            
            // If both signed, activate contract
            if (contract.getCompanySigned() && contract.getFreelancerSigned()) {
                contract.setStatus(Contract.ContractStatus.ACTIVE);
                
                // Notify company
                notificationService.createNotification(
                    contract.getCompany(),
                    "Contract Activated",
                    contract.getFreelancer().getFirstName() + " " + contract.getFreelancer().getLastName() + 
                    " has signed the contract. The contract is now active.",
                    tn.esprit.pi.entity.Notification.NotificationType.CONTRACT_SIGNED,
                    contract.getId()
                );
            }
        }
        
        Contract saved = contractRepository.save(contract);
        return convertToDTO(saved);
    }
    
    @Transactional
    public ContractDTO updateContractStatus(Long contractId, String status) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        
        contract.setStatus(Contract.ContractStatus.valueOf(status));
        Contract saved = contractRepository.save(contract);
        
        return convertToDTO(saved);
    }
    
    @Transactional
    public ContractDTO terminateContract(Long contractId, String reason) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        
        contract.setStatus(Contract.ContractStatus.TERMINATED);
        contract.setTerminationReason(reason);
        
        Contract saved = contractRepository.save(contract);
        
        // Notify both parties
        notificationService.createNotification(
            contract.getFreelancer(),
            "Contract Terminated",
            "The contract for project " + contract.getProject().getTitle() + " has been terminated.",
            tn.esprit.pi.entity.Notification.NotificationType.CONTRACT_TERMINATED,
            contract.getId()
        );
        
        notificationService.createNotification(
            contract.getCompany(),
            "Contract Terminated",
            "The contract for project " + contract.getProject().getTitle() + " has been terminated.",
            tn.esprit.pi.entity.Notification.NotificationType.CONTRACT_TERMINATED,
            contract.getId()
        );
        
        return convertToDTO(saved);
    }
    
    private ContractDTO convertToDTO(Contract contract) {
        ContractDTO dto = new ContractDTO();
        dto.setId(contract.getId());
        dto.setProjectId(contract.getProject().getId());
        dto.setProjectTitle(contract.getProject().getTitle());
        
        if (contract.getMilestone() != null) {
            dto.setMilestoneId(contract.getMilestone().getId());
            dto.setMilestoneTitle(contract.getMilestone().getTitle());
        }
        
        dto.setCompanyId(contract.getCompany().getId());
        dto.setCompanyName(contract.getCompany().getFirstName() + " " + contract.getCompany().getLastName());
        dto.setFreelancerId(contract.getFreelancer().getId());
        dto.setFreelancerName(contract.getFreelancer().getFirstName() + " " + contract.getFreelancer().getLastName());
        dto.setContractNumber(contract.getContractNumber());
        dto.setTerms(contract.getTerms());
        dto.setAmount(contract.getAmount());
        dto.setStartDate(contract.getStartDate());
        dto.setEndDate(contract.getEndDate());
        dto.setStatus(contract.getStatus().toString());
        dto.setCompanySigned(contract.getCompanySigned());
        dto.setCompanySignedAt(contract.getCompanySignedAt());
        dto.setFreelancerSigned(contract.getFreelancerSigned());
        dto.setFreelancerSignedAt(contract.getFreelancerSignedAt());
        dto.setTerminationReason(contract.getTerminationReason());
        dto.setCreatedAt(contract.getCreatedAt());
        dto.setUpdatedAt(contract.getUpdatedAt());
        
        return dto;
    }
}

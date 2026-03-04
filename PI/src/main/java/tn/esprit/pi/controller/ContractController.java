package tn.esprit.pi.controller;

import tn.esprit.pi.dto.ContractDTO;
import tn.esprit.pi.dto.CreateContractRequest;
import tn.esprit.pi.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ContractController {
    
    private final ContractService contractService;
    
    @PostMapping("/generate")
    public ResponseEntity<?> generateContract(@RequestBody CreateContractRequest request) {
        try {
            System.out.println("=== Generating Contract ===");
            System.out.println("Project ID: " + request.getProjectId());
            System.out.println("Freelancer ID: " + request.getFreelancerId());
            
            ContractDTO contract = contractService.generateContract(request);
            return ResponseEntity.ok(contract);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/{contractId}")
    public ResponseEntity<?> getContract(@PathVariable Long contractId) {
        try {
            ContractDTO contract = contractService.getContract(contractId);
            return ResponseEntity.ok(contract);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getProjectContracts(@PathVariable Long projectId) {
        try {
            List<ContractDTO> contracts = contractService.getProjectContracts(projectId);
            return ResponseEntity.ok(contracts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getCompanyContracts(@PathVariable Long companyId) {
        try {
            List<ContractDTO> contracts = contractService.getCompanyContracts(companyId);
            return ResponseEntity.ok(contracts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<?> getFreelancerContracts(@PathVariable Long freelancerId) {
        try {
            List<ContractDTO> contracts = contractService.getFreelancerContracts(freelancerId);
            return ResponseEntity.ok(contracts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/{contractId}/sign")
    public ResponseEntity<?> signContract(@PathVariable Long contractId, @RequestBody Map<String, Long> request) {
        try {
            Long userId = request.get("userId");
            ContractDTO contract = contractService.signContract(contractId, userId);
            return ResponseEntity.ok(contract);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/{contractId}/status")
    public ResponseEntity<?> updateContractStatus(@PathVariable Long contractId, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            ContractDTO contract = contractService.updateContractStatus(contractId, status);
            return ResponseEntity.ok(contract);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/{contractId}/terminate")
    public ResponseEntity<?> terminateContract(@PathVariable Long contractId, @RequestBody Map<String, String> request) {
        try {
            String reason = request.get("reason");
            ContractDTO contract = contractService.terminateContract(contractId, reason);
            return ResponseEntity.ok(contract);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}

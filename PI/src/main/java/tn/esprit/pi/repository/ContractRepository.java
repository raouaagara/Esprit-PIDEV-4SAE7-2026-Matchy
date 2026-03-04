package tn.esprit.pi.repository;

import tn.esprit.pi.entity.Contract;
import tn.esprit.pi.entity.Project;
import tn.esprit.pi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    
    List<Contract> findByProject(Project project);
    
    List<Contract> findByCompany(User company);
    
    List<Contract> findByFreelancer(User freelancer);
    
    Optional<Contract> findByProjectAndFreelancer(Project project, User freelancer);
    
    Optional<Contract> findByContractNumber(String contractNumber);
    
    List<Contract> findByStatus(Contract.ContractStatus status);
}

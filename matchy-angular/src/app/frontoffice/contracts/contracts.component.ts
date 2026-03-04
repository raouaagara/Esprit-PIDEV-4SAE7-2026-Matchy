import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { AuthService } from '../services/auth.service';
import { Contract } from '../models/models';

@Component({
  selector: 'app-fo-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];
  loading = false;
  currentUser: any;
  selectedContract: Contract | null = null;
  showContractModal = false;

  constructor(
    private contractService: ContractService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadContracts();
  }

  loadContracts() {
    this.loading = true;
    this.contractService.getFreelancerContracts(this.currentUser.id)
      .subscribe({
        next: (contracts) => {
          // Add computed properties
          this.contracts = contracts.map(c => ({
            ...c,
            contractNumber: `CTR-${c.id.toString().padStart(6, '0')}`,
            amount: c.totalAmount,
            companySigned: !!c.companySignedAt,
            freelancerSigned: !!c.freelancerSignedAt
          }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading contracts:', error);
          this.loading = false;
        }
      });
  }

  viewContract(contract: Contract) {
    this.selectedContract = {
      ...contract,
      contractNumber: `CTR-${contract.id.toString().padStart(6, '0')}`,
      amount: contract.totalAmount,
      companySigned: !!contract.companySignedAt,
      freelancerSigned: !!contract.freelancerSignedAt
    };
    this.showContractModal = true;
  }

  signContract(contract: Contract) {
    if (confirm('Are you sure you want to sign this contract?')) {
      this.contractService.signContract({
        contractId: contract.id,
        userId: this.currentUser.id,
        signature: `${this.currentUser.firstName} ${this.currentUser.lastName}`
      }).subscribe({
        next: () => {
          alert('Contract signed successfully!');
          this.loadContracts();
          this.showContractModal = false;
        },
        error: (error) => {
          console.error('Error signing contract:', error);
          alert('Error signing contract. Please try again.');
        }
      });
    }
  }

  closeModal() {
    this.showContractModal = false;
    this.selectedContract = null;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'warning',
      'ACTIVE': 'success',
      'COMPLETED': 'info',
      'TERMINATED': 'danger',
      'EXPIRED': 'muted'
    };
    return statusMap[status] || 'muted';
  }
}

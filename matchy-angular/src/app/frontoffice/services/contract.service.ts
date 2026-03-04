import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contract, CreateContractRequest, SignContractRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ContractService {
  private apiUrl = `${environment.apiUrl}/contracts`;

  constructor(private http: HttpClient) {}

  // Generate contract after application acceptance
  generateContract(data: CreateContractRequest): Observable<Contract> {
    return this.http.post<Contract>(`${this.apiUrl}/generate`, data);
  }

  // Get contract by ID
  getContract(contractId: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/${contractId}`);
  }

  // Get contracts by project
  getProjectContracts(projectId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Get contracts for company
  getCompanyContracts(companyId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/company/${companyId}`);
  }

  // Get contracts for freelancer
  getFreelancerContracts(freelancerId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }

  // Sign contract (digital signature)
  signContract(data: SignContractRequest): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${data.contractId}/sign`, data);
  }

  // Update contract status
  updateContractStatus(contractId: number, status: string): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${contractId}/status`, { status });
  }

  // Terminate contract
  terminateContract(contractId: number, reason: string): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${contractId}/terminate`, { reason });
  }
}

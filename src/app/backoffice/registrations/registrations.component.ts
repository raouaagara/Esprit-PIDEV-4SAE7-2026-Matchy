import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrationService } from '../../core/services/registration.service';
import { Registration, RegistrationStatus } from '../../core/models/registration.model';
import { ConfirmationService } from '../../shared/services/confirmation.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class RegistrationsComponent implements OnInit {
  registrations: Registration[] = [];
  filteredRegistrations: Registration[] = [];
  currentFilter: string = 'ALL';

  allCount = 0;
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;

  constructor(
    private registrationService: RegistrationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getAllRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
        this.updateCounts();
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading registrations:', error);
      }
    });
  }

  updateCounts(): void {
    this.allCount = this.registrations.length;
    this.pendingCount = this.registrations.filter(r => r.status === RegistrationStatus.PENDING).length;
    this.approvedCount = this.registrations.filter(r => r.status === RegistrationStatus.APPROVED).length;
    this.rejectedCount = this.registrations.filter(r => r.status === RegistrationStatus.REJECTED).length;
  }

  filterByStatus(status: string): void {
    this.currentFilter = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter === 'ALL') {
      this.filteredRegistrations = [...this.registrations];
    } else {
      this.filteredRegistrations = this.registrations.filter(
        r => r.status === this.currentFilter
      );
    }
  }

  approveRegistration(id: number): void {
    this.confirmationService.confirm({
      title: 'Approve Registration',
      message: 'Are you sure you want to approve this registration? The participant counter will be updated.',
      confirmText: 'Approve',
      cancelText: 'Cancel',
      type: 'success',
      icon: '✅'
    }).then((confirmed) => {
      if (confirmed) {
        this.registrationService.approveRegistration(id).subscribe({
          next: () => {
            this.loadRegistrations();
          },
          error: (error) => {
            alert(error.error?.message || 'Failed to approve registration');
          }
        });
      }
    });
  }

  rejectRegistration(id: number): void {
    this.confirmationService.confirm({
      title: 'Reject Registration',
      message: 'Are you sure you want to reject this registration? This action will change the status to rejected.',
      confirmText: 'Reject',
      cancelText: 'Cancel',
      type: 'warning',
      icon: '⚠️'
    }).then((confirmed) => {
      if (confirmed) {
        this.registrationService.rejectRegistration(id).subscribe({
          next: () => {
            this.loadRegistrations();
          },
          error: (error) => {
            alert(error.error?.message || 'Failed to reject registration');
          }
        });
      }
    });
  }

  deleteRegistration(id: number): void {
    this.confirmationService.confirm({
      title: 'Delete Registration',
      message: 'Are you sure you want to delete this registration? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      icon: '🗑️'
    }).then((confirmed) => {
      if (confirmed) {
        this.registrationService.deleteRegistration(id).subscribe({
          next: () => {
            this.loadRegistrations();
          },
          error: (error) => {
            alert('Failed to delete registration');
          }
        });
      }
    });
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
}

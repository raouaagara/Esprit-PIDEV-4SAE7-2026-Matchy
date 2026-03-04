import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../../core/services/registration.service';
import { RegistrationCreate } from '../../../core/models/registration.model';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
  standalone: false
})
export class RegistrationModalComponent {
  @Input() evenementId!: number;
  @Input() evenementTitle!: string;
  @Input() userId: number = 1; // Default user ID (should come from auth service)
  @Output() close = new EventEmitter<void>();
  @Output() registered = new EventEmitter<void>();

  registrationForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const registrationData: RegistrationCreate = {
      ...this.registrationForm.value,
      userId: this.userId,
      evenementId: this.evenementId
    };

    this.registrationService.createRegistration(registrationData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration submitted successfully! Waiting for admin approval.';
        this.isSubmitting = false;
        setTimeout(() => {
          this.registered.emit();
          this.onClose();
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to submit registration. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  get f() {
    return this.registrationForm.controls;
  }
}

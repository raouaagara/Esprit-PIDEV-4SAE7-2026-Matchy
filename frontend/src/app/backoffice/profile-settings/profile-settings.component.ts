import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bo-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class BoProfileSettingsComponent implements OnInit {
  form: FormGroup;
  saved     = false;
  saveError = '';
  isSaving  = false;
  settings  = { maintenance: false, registration: true, emails: true, verification: true };

  private api = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      bio:       [''],
      location:  [''],
      skills:    [''],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.http.get<any>(`${this.api}/users/${userId}`).subscribe({
      next: (user) => {
        this.form.patchValue({
          firstName: user.firstName || '',
          lastName:  user.lastName  || '',
          email:     user.email     || '',
          bio:       user.bio       || '',
          location:  user.location  || '',
          skills:    user.skills    || '',
        });
      },
      error: (err) => {
        this.saveError = 'Failed to load profile: ' + (err?.status || err?.message);
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.saveError = 'Please fill all required fields.';
      return;
    }
    this.isSaving  = true;
    this.saveError = '';

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.saveError = 'Not authenticated. Please log in again.';
      this.isSaving = false;
      return;
    }

    const payload = {
      firstName: this.form.value.firstName,
      lastName:  this.form.value.lastName,
      email:     this.form.value.email,
      bio:       this.form.value.bio       || '',
      location:  this.form.value.location  || '',
      skills:    this.form.value.skills    || '',
    };

    this.http.put<any>(`${this.api}/users/${userId}`, payload).subscribe({
      next: (updated) => {
        this.isSaving = false;
        this.saved    = true;
        // Mettre à jour le localStorage pour refléter les changements
        const stored = localStorage.getItem('matchy_user');
        if (stored) {
          const user = JSON.parse(stored);
          user.firstName = updated.firstName;
          user.lastName  = updated.lastName;
          user.email     = updated.email;
          user.name      = `${updated.firstName} ${updated.lastName}`;
          localStorage.setItem('matchy_user', JSON.stringify(user));
        }
        setTimeout(() => this.saved = false, 3000);
      },
      error: (err) => {
        this.isSaving  = false;
        this.saveError = err?.error?.error || `Error ${err?.status}: Failed to save changes`;
      }
    });
  }
}

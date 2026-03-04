import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../frontoffice/services/auth.service";

@Component({
  selector: "app-bo-login",
  templateUrl: "./bo-login.component.html",
  styleUrls: ["./bo-login.component.scss"],
})
export class BoLoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.error = "";

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(["/backoffice/dashboard"]);
      },
      error: (err) => {
        console.error("Login error:", err);
        this.error = err.error?.message || err.error || "Invalid email or password";
        this.isLoading = false;
      },
    });
  }
}

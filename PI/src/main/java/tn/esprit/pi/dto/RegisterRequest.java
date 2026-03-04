// src/main/java/com/pi/task/dto/RegisterRequest.java
package tn.esprit.pi.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class RegisterRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "User type is required")
    private String userType; // "FREELANCER" or "COMPANY"

    // Company specific fields
    private String companyName;

    // Freelancer specific fields
    private String expertise;
    private Double hourlyRate;

    // Common fields
    private String phone;
    private String address;
}
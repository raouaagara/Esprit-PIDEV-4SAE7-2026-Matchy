// src/main/java/com/pi/task/dto/AuthResponse.java
package tn.esprit.pi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import  tn.esprit.pi.entity.User;


@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String userType;
    private String companyName;
    private String expertise;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.userType = user.getUserType().name();
        this.companyName = user.getCompanyName();
        this.expertise = user.getExpertise();
    }
}
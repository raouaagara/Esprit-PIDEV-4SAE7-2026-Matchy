// src/main/java/com/pi/task/dto/UserDTO.java
package tn.esprit.pi.dto;

import lombok.Data;
import tn.esprit.pi.entity.User;
import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String userType;
    private String companyName;
    private String expertise;
    private Double hourlyRate;
    private String phone;
    private String address;
    private String profilePicture;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserType(user.getUserType().name());
        dto.setCompanyName(user.getCompanyName());
        dto.setExpertise(user.getExpertise());
        dto.setHourlyRate(user.getHourlyRate());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setProfilePicture(user.getProfilePicture());
        dto.setIsActive(user.getIsActive());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
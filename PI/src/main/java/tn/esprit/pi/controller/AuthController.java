package tn.esprit.pi.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pi.entity.User;
import tn.esprit.pi.repository.UserRepository;
import tn.esprit.pi.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("=== REGISTRATION ATTEMPT ===");
            System.out.println("Email: " + request.getEmail());
            System.out.println("UserType: " + request.getUserType());

            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());

            // Handle UserType safely
            try {
                user.setUserType(User.UserType.valueOf(request.getUserType()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid user type. Must be FREELANCER or COMPANY");
            }

            // Handle optional fields safely
            if (request.getCompanyName() != null && !request.getCompanyName().isEmpty()) {
                user.setCompanyName(request.getCompanyName());
            }

            if (request.getExpertise() != null && !request.getExpertise().isEmpty()) {
                user.setExpertise(request.getExpertise());
            }

            // Handle hourlyRate - default to 0 if null
            user.setHourlyRate(request.getHourlyRate() != null ? request.getHourlyRate() : 0.0);

            if (request.getPhone() != null && !request.getPhone().isEmpty()) {
                user.setPhone(request.getPhone());
            }

            if (request.getAddress() != null && !request.getAddress().isEmpty()) {
                user.setAddress(request.getAddress());
            }

            user.setIsActive(true);

            User savedUser = userRepository.save(user);
            System.out.println("User saved with ID: " + savedUser.getId());

            String token = jwtUtil.generateToken(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("userType", user.getUserType());
            response.put("companyName", user.getCompanyName());
            response.put("expertise", user.getExpertise());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail())
                    .orElse(null);

            if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }

            String token = jwtUtil.generateToken(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("userType", user.getUserType());
            response.put("companyName", user.getCompanyName());
            response.put("expertise", user.getExpertise());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

@Data
class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String userType;
    private String companyName;
    private String expertise;
    private Double hourlyRate;
    private String phone;
    private String address;
}

@Data
class LoginRequest {
    private String email;
    private String password;
}
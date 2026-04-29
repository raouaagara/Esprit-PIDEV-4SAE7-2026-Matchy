package com.marketplace.service;

import com.marketplace.dto.Dtos.*;
import com.marketplace.entity.User;
import com.marketplace.repository.UserRepository;
import com.marketplace.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(User.Role.valueOf(req.getRole().toUpperCase()));
        user.setEmailVerified(true);
        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getEmail());
        return new AuthResponse(token, saved.getId(), saved.getName(), saved.getEmail(), saved.getRole().name());
    }

    @SuppressWarnings("unchecked")
    public AuthResponse googleAuth(GoogleAuthRequest req) {
        if (req.getCredential() == null || req.getCredential().isBlank()) {
            throw new RuntimeException("Token Google manquant");
        }
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + req.getCredential();
        ResponseEntity<Map> response;
        try {
            response = restTemplate.getForEntity(url, Map.class);
        } catch (RestClientException e) {
            throw new RuntimeException("Token Google invalide");
        }
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Token Google invalide");
        }
        Map<String, Object> data = response.getBody();
        String email = (String) data.get("email");
        String name  = (String) data.getOrDefault("name", "");
        if (email == null || email.isBlank()) {
            throw new RuntimeException("Impossible de récupérer l'email depuis Google");
        }
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setName(name.isBlank() ? email.split("@")[0] : name);
            u.setEmail(email);
            u.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            String role = (req.getRole() != null && !req.getRole().isBlank()) ? req.getRole() : "CLIENT";
            try { u.setRole(User.Role.valueOf(role.toUpperCase())); }
            catch (IllegalArgumentException ex) { u.setRole(User.Role.CLIENT); }
            u.setEmailVerified(true);
            return userRepository.save(u);
        });
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}

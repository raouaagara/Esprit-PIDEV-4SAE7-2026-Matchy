package com.marketplace.controller;

import com.marketplace.dto.Dtos.AgendaClientDto;
import com.marketplace.dto.Dtos.AgendaMeetingRequest;
import com.marketplace.dto.Dtos.AgendaMeetingResponse;
import com.marketplace.service.AgendaMeetingService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agenda")
public class AgendaMeetingController {

    @Autowired private AgendaMeetingService agendaService;
    @Autowired private JavaMailSender mailSender;
    @Value("${spring.mail.username}") private String fromEmail;

    @PostMapping
    public ResponseEntity<AgendaMeetingResponse> create(
            @RequestBody AgendaMeetingRequest req, Authentication auth) {
        return ResponseEntity.ok(agendaService.create(auth.getName(), req));
    }

    @GetMapping
    public ResponseEntity<List<AgendaMeetingResponse>> getForOrganizer(Authentication auth) {
        return ResponseEntity.ok(agendaService.getForOrganizer(auth.getName()));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<AgendaMeetingResponse>> getUpcoming(
            @RequestParam(defaultValue = "15") int minutes, Authentication auth) {
        return ResponseEntity.ok(agendaService.getUpcomingForOrganizer(auth.getName(), minutes));
    }

    @GetMapping("/client")
    public ResponseEntity<List<AgendaMeetingResponse>> getForClient(Authentication auth) {
        return ResponseEntity.ok(agendaService.getForClient(auth.getName()));
    }

    @GetMapping("/clients")
    public ResponseEntity<List<AgendaClientDto>> getClients(Authentication auth) {
        return ResponseEntity.ok(agendaService.getClientsForOrganizer(auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendaMeetingResponse> update(
            @PathVariable Long id,
            @RequestBody AgendaMeetingRequest req,
            Authentication auth) {
        return ResponseEntity.ok(agendaService.update(id, auth.getName(), req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(@PathVariable Long id, Authentication auth) {
        agendaService.cancel(id, auth.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/test-email")
    public ResponseEntity<String> testEmail(@RequestParam String to) {
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, false, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Test SMTP - Marketplace");
            helper.setText("Si vous recevez cet email, la configuration SMTP fonctionne correctement.", false);
            mailSender.send(msg);
            return ResponseEntity.ok("OK: Email envoyé à " + to + " depuis " + fromEmail);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("ERREUR: " + e.getClass().getSimpleName() + " — " + e.getMessage());
        }
    }
}

package tn.esprit.pi.controller;

import tn.esprit.pi.dto.MessageDTO;
import tn.esprit.pi.dto.CreateMessageRequest;
import tn.esprit.pi.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MessageController {
    
    private final MessageService messageService;
    private final String uploadDir = "./uploads/messages/";
    
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody CreateMessageRequest request) {
        try {
            MessageDTO message = messageService.sendMessage(request);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getProjectMessages(@PathVariable Long projectId) {
        try {
            List<MessageDTO> messages = messageService.getProjectMessages(projectId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/thread/{projectId}/{userId}")
    public ResponseEntity<?> getChatThread(@PathVariable Long projectId, @PathVariable Long userId) {
        try {
            List<MessageDTO> messages = messageService.getChatThread(projectId, userId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/{messageId}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long messageId) {
        try {
            messageService.markAsRead(messageId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/thread/{projectId}/{userId}/read-all")
    public ResponseEntity<?> markThreadAsRead(@PathVariable Long projectId, @PathVariable Long userId) {
        try {
            messageService.markThreadAsRead(projectId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}/unread-count")
    public ResponseEntity<?> getUnreadCount(@PathVariable Long userId) {
        try {
            Long count = messageService.getUnreadCount(userId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadAttachment(@RequestParam("file") MultipartFile file) {
        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Generate unique filename
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            
            // Save file
            Files.copy(file.getInputStream(), filePath);
            
            // Return file info
            Map<String, String> response = new HashMap<>();
            response.put("url", "/uploads/messages/" + filename);
            response.put("name", file.getOriginalFilename());
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error uploading file: " + e.getMessage());
        }
    }
}

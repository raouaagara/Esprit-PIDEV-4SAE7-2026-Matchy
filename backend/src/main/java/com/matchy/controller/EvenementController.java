package com.matchy.controller;

import com.matchy.dto.EvenementCreateDTO;
import com.matchy.dto.EvenementDTO;
import com.matchy.entity.Evenement;
import com.matchy.service.EvenementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evenements")
@RequiredArgsConstructor
public class EvenementController {
    
    private final EvenementService evenementService;
    
    @PostMapping
    public ResponseEntity<EvenementDTO> createEvenement(@Valid @RequestBody EvenementCreateDTO createDTO) {
        EvenementDTO created = evenementService.createEvenement(createDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EvenementDTO> updateEvenement(
            @PathVariable Long id,
            @Valid @RequestBody EvenementCreateDTO updateDTO) {
        EvenementDTO updated = evenementService.updateEvenement(id, updateDTO);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        evenementService.deleteEvenement(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EvenementDTO> getEvenementById(@PathVariable Long id) {
        EvenementDTO evenement = evenementService.getEvenementById(id);
        return ResponseEntity.ok(evenement);
    }
    
    @GetMapping
    public ResponseEntity<List<EvenementDTO>> getAllEvenements() {
        List<EvenementDTO> evenements = evenementService.getAllEvenements();
        return ResponseEntity.ok(evenements);
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<EvenementDTO>> getEvenementsByType(@PathVariable Evenement.EvenementType type) {
        List<EvenementDTO> evenements = evenementService.getEvenementsByType(type);
        return ResponseEntity.ok(evenements);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<EvenementDTO>> getUpcomingEvenements() {
        List<EvenementDTO> evenements = evenementService.getUpcomingEvenements();
        return ResponseEntity.ok(evenements);
    }
    
    @PostMapping("/{id}/participate")
    public ResponseEntity<EvenementDTO> participateInEvenement(@PathVariable Long id) {
        EvenementDTO evenement = evenementService.participateInEvenement(id);
        return ResponseEntity.ok(evenement);
    }
    
    @PostMapping("/{id}/cancel-participation")
    public ResponseEntity<EvenementDTO> cancelParticipation(@PathVariable Long id) {
        EvenementDTO evenement = evenementService.cancelParticipation(id);
        return ResponseEntity.ok(evenement);
    }
}

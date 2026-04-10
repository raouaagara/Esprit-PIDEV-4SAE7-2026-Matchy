package com.matchy.controller;

import com.matchy.entity.PredictionSuccessEntity;
import com.matchy.service.PredictionSuccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PredictionSuccessController {

    private final PredictionSuccessService predictionService;

    // ============================================
    // Calculer la prédiction
    // POST /api/predictions/{freelancerId}/{projectId}
    // ============================================
    @PostMapping("/{freelancerId}/{projectId}")
    public ResponseEntity<PredictionSuccessEntity> predictSuccess(
            @PathVariable Long freelancerId,
            @PathVariable Long projectId) {
        try {
            PredictionSuccessEntity prediction = predictionService
                    .predictSuccess(freelancerId, projectId);
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ============================================
    // Récupérer une prédiction existante
    // GET /api/predictions/{freelancerId}/{projectId}
    // ============================================
    @GetMapping("/{freelancerId}/{projectId}")
    public ResponseEntity<PredictionSuccessEntity> getPrediction(
            @PathVariable Long freelancerId,
            @PathVariable Long projectId) {
        Optional<PredictionSuccessEntity> prediction = predictionService
                .getPrediction(freelancerId, projectId);
        return prediction.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ============================================
    // Toutes les prédictions d'un freelancer
    // GET /api/predictions/freelancer/{freelancerId}
    // ============================================
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<PredictionSuccessEntity>> getFreelancerPredictions(
            @PathVariable Long freelancerId) {
        List<PredictionSuccessEntity> predictions = predictionService
                .getFreelancerPredictions(freelancerId);
        return ResponseEntity.ok(predictions);
    }

    // ============================================
    // Meilleures prédictions d'un freelancer
    // GET /api/predictions/freelancer/{freelancerId}/best
    // ============================================
    @GetMapping("/freelancer/{freelancerId}/best")
    public ResponseEntity<List<PredictionSuccessEntity>> getBestPredictions(
            @PathVariable Long freelancerId) {
        List<PredictionSuccessEntity> predictions = predictionService
                .getBestPredictions(freelancerId);
        return ResponseEntity.ok(predictions);
    }
}
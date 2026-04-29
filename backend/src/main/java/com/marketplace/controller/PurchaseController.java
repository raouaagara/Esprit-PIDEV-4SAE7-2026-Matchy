package com.marketplace.controller;

import com.marketplace.dto.Dtos.*;
import com.marketplace.service.PurchaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private static final Logger log = LoggerFactory.getLogger(PurchaseController.class);

    @Autowired private PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody PurchaseRequestDto req, Authentication auth) {
        try {
            return ResponseEntity.ok(purchaseService.createPurchase(req, auth.getName()));
        } catch (Exception e) {
            log.error("createPurchase failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> accept(@PathVariable Long id, Authentication auth) {
        try {
            return ResponseEntity.ok(purchaseService.acceptPurchase(id, auth.getName()));
        } catch (Exception e) {
            log.error("acceptPurchase failed [{}]: {}", e.getClass().getSimpleName(), e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, Authentication auth) {
        try {
            return ResponseEntity.ok(purchaseService.rejectPurchase(id, auth.getName()));
        } catch (Exception e) {
            log.error("rejectPurchase failed [{}]: {}", e.getClass().getSimpleName() , e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body("[" + e.getClass().getSimpleName() + "] " + e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<PurchaseResponse>> getPending(Authentication auth) {
        return ResponseEntity.ok(purchaseService.getPendingForOrganizer(auth.getName()));
    }

    @GetMapping("/pending/count")
    public ResponseEntity<Map<String, Long>> getPendingCount(Authentication auth) {
        long count = purchaseService.countPending(auth.getName());
        return ResponseEntity.ok(Map.of("count", count));
    }

    @GetMapping("/my")
    public ResponseEntity<List<PurchaseResponse>> getMyPurchases(Authentication auth) {
        return ResponseEntity.ok(purchaseService.getMyPurchases(auth.getName()));
    }
}

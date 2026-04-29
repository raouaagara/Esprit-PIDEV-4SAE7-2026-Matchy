package com.marketplace.controller;

import com.marketplace.dto.Dtos.*;
import com.marketplace.service.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/translate")
public class TranslationController {

    @Autowired
    private TranslationService translationService;

    private static final List<String> SUPPORTED_LANGS = List.of("fr", "en", "ar", "es", "de", "zh", "ru");

    @PostMapping
    public ResponseEntity<TranslationResponseDto> translate(@RequestBody TranslationRequestDto req) {
        if (req.getText() == null || req.getText().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        String source = req.getSourceLang() != null ? req.getSourceLang() : "auto";
        String target = req.getTargetLang() != null ? req.getTargetLang() : "fr";

        // Validation de la langue cible
        if (!SUPPORTED_LANGS.contains(target)) {
            return ResponseEntity.badRequest().build();
        }

        String detected = source.equals("auto") ? null : source;
        String translated = translationService.translate(req.getText(), detected, target);
        String sourceLang = detected != null ? detected : translationService.detectLanguage(req.getText());

        return ResponseEntity.ok(new TranslationResponseDto(translated, sourceLang));
    }

    @PostMapping("/detect")
    public ResponseEntity<Map<String, String>> detect(@RequestBody DetectionRequestDto req) {
        if (req.getText() == null || req.getText().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        String lang = translationService.detectLanguage(req.getText());
        return ResponseEntity.ok(Map.of("language", lang));
    }
}
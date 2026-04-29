package com.marketplace.service;

import com.marketplace.dto.Dtos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TranscriptionService {

    private static final Logger log = LoggerFactory.getLogger(TranscriptionService.class);

    @Autowired private WhisperService whisperService;
    @Autowired private TranslationService translationService;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    // Map<roomId, Map<userId, preferredLang>>
    private final Map<String, Map<String, String>> roomParticipants = new ConcurrentHashMap<>();

    public void registerParticipant(String roomId, String userId, String preferredLang) {
        roomParticipants
                .computeIfAbsent(roomId, k -> new ConcurrentHashMap<>())
                .put(userId, preferredLang);
        log.debug("Registered participant {} (lang={}) in room {}", userId, preferredLang, roomId);
    }

    public void unregisterRoom(String roomId) {
        roomParticipants.remove(roomId);
    }

    public Dtos.TranscriptionChunkResponse processChunk(
            MultipartFile audio,
            String roomId,
            String speakerName,
            String speakerId,
            String speakerLang
    ) throws IOException {

        // 1. Transcription Whisper (retourne aussi la langue détectée)
        WhisperService.TranscribeResult whisperResult = whisperService.transcribe(
                audio.getBytes(),
                audio.getContentType()
        );
        String originalText = whisperResult.text;

        if (originalText == null || originalText.isBlank()) {
            return new Dtos.TranscriptionChunkResponse("", speakerLang);
        }

        // 2. Langue source : priorité à Whisper (précis), sinon détection API, sinon langue de l'émetteur
        String sourceLang = !whisperResult.language.isBlank()
                ? whisperResult.language
                : (translationService.detectLanguage(originalText));

        // 3. Enregistrer la langue de l'émetteur (au cas où pas encore fait)
        registerParticipant(roomId, speakerId, speakerLang);

        // 4. Construire la map de traductions : userId → texte traduit dans sa langue
        Map<String, String> participants = roomParticipants.getOrDefault(roomId, Map.of());
        Map<String, String> translations = new HashMap<>();

        participants.forEach((participantId, participantLang) -> {
            if (sourceLang.equals(participantLang)) {
                // Même langue : pas de traduction
                translations.put(participantId, originalText);
            } else {
                // Langues différentes : traduire vers la langue du destinataire
                String translated = translationService.translate(originalText, sourceLang, participantLang);
                translations.put(participantId, translated != null ? translated : originalText);
            }
        });

        // 5. Broadcast sur /topic/subtitles/{roomId} — tous les participants reçoivent
        //    leur traduction dans la map, ils extraient celle qui leur correspond
        Dtos.SubtitleBroadcast broadcast = Dtos.SubtitleBroadcast.builder()
                .speakerName(speakerName)
                .speakerId(speakerId)
                .originalText(originalText)
                .sourceLang(sourceLang)
                .translations(translations)
                .timestamp(System.currentTimeMillis())
                .build();

        messagingTemplate.convertAndSend("/topic/subtitles/" + roomId, broadcast);
        log.debug("[{}] Broadcasted subtitle: {} chars, {} participants",
                speakerName, originalText.length(), translations.size());

        return new Dtos.TranscriptionChunkResponse(originalText, sourceLang);
    }
}

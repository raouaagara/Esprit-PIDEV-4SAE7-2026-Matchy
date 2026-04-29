package com.marketplace.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketplace.dto.Dtos.*;
import com.marketplace.service.ChatService;
import com.marketplace.service.MeetingAIService;
import com.marketplace.service.TranscriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transcription")
public class TranscriptionController {

    private static final Logger log = LoggerFactory.getLogger(TranscriptionController.class);

    @Autowired private MeetingAIService meetingAIService;
    @Autowired private ChatService chatService;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TranscriptionService transcriptionService;

    /**
     * Enregistre la langue préférée d'un participant avant qu'il parle.
     * Appelé dès que l'utilisateur rejoint la salle (après le lobby).
     */
    @PostMapping("/register")
    public ResponseEntity<Void> registerParticipant(
            @RequestBody ParticipantRegisterRequest req
    ) {
        transcriptionService.registerParticipant(req.getRoomId(), req.getUserId(), req.getPreferredLang());
        return ResponseEntity.ok().build();
    }

    /**
     * Reçoit un chunk audio, le transcrit avec Whisper, traduit pour chaque participant
     * et diffuse le résultat sur /topic/subtitles/{roomId}.
     */
    @PostMapping(value = "/chunk", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TranscriptionChunkResponse> processChunk(
            @RequestParam("audio")       MultipartFile audio,
            @RequestParam("roomId")      String roomId,
            @RequestParam("speakerName") String speakerName,
            @RequestParam("speakerId")   String speakerId,
            @RequestParam(value = "targetLang", defaultValue = "fr") String targetLang,
            Authentication auth
    ) {
        try {
            TranscriptionChunkResponse resp = transcriptionService.processChunk(
                    audio, roomId, speakerName, speakerId, targetLang
            );
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            log.error("Chunk processing failed: {}", e.getMessage(), e);
            return ResponseEntity.ok(new TranscriptionChunkResponse("", ""));
        }
    }

    /**
     * Finalise la réunion : génère le résumé IA et sauvegarde dans le chat.
     */
    @PostMapping("/finalize")
    public ResponseEntity<?> finalizeMeeting(
            @RequestBody TranscriptFinalizeRequest req,
            Authentication auth
    ) {
        try {
            log.info("Finalizing meeting: room={}, project={}, transcript_len={}",
                    req.getRoomId(), req.getProjectId(),
                    req.getFullTranscript() != null ? req.getFullTranscript().length() : 0);

            MeetingAIResult aiResult = meetingAIService.analyze(
                    req.getFullTranscript(), req.getSpeakers()
            );

            Map<String, Object> contentMap = new LinkedHashMap<>();
            contentMap.put("type",         "AI_SUMMARY");
            contentMap.put("subject",      "Compte-rendu IA de réunion");
            contentMap.put("summary",      aiResult.getSummary());
            contentMap.put("tasks",        aiResult.getTasks());
            contentMap.put("deadlines",    aiResult.getDeadlines());
            contentMap.put("decisions",    aiResult.getDecisions());
            contentMap.put("speakers",     req.getSpeakers() != null ? req.getSpeakers() : List.of());
            contentMap.put("participants", req.getSpeakers() != null
                    ? String.join(", ", req.getSpeakers()) : "");
            contentMap.put("duration",     "Réunion terminée");

            String jsonContent = objectMapper.writeValueAsString(contentMap);

            try {
                ChatMessageRequest msgReq = new ChatMessageRequest();
                msgReq.setContent(jsonContent);
                msgReq.setProjectId(req.getProjectId());
                msgReq.setMessageType("MEETING_SUMMARY");

                ChatMessageResponse savedMsg = chatService.sendMessage(msgReq, auth.getName());
                messagingTemplate.convertAndSend("/topic/chat/" + req.getProjectId(), savedMsg);
            } catch (Exception saveEx) {
                log.warn("MEETING_SUMMARY save failed (non-critical): {}", saveEx.getMessage());
            }

            // Libérer les ressources de la room
            transcriptionService.unregisterRoom(req.getRoomId());

            return ResponseEntity.ok(aiResult);

        } catch (Exception e) {
            log.error("Meeting finalization failed: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body("Erreur finalisation: " + e.getMessage());
        }
    }
}

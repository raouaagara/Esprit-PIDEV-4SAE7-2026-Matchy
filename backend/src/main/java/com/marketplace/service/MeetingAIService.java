package com.marketplace.service;

import com.marketplace.dto.Dtos.MeetingAIResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.*;

@Service
public class MeetingAIService {

    private static final Logger log = LoggerFactory.getLogger(MeetingAIService.class);

    @Value("${huggingface.api-key:}")
    private String apiKey;

    @Value("${groq.api-key:}")
    private String groqApiKey;

    private static final String GROQ_CHAT_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    // Modèle distilbart plus rapide que bart-large (cold start ~10s au lieu de 30s)
    private static final String DISTILBART_URL =
            "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";
    private static final String BART_LARGE_URL =
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    // RestTemplate dédié avec timeout adapté à HuggingFace (cold start possible)
    private final RestTemplate http;

    public MeetingAIService() {
        SimpleClientHttpRequestFactory f = new SimpleClientHttpRequestFactory();
        f.setConnectTimeout(10_000);
        f.setReadTimeout(90_000);
        this.http = new RestTemplate(f);
        this.http.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    // ── Patterns EN + FR ──────────────────────────────────────────────────────

    private static final Pattern TASK_PATTERN = Pattern.compile(
        "(?i)\\b(will|going to|need to|shall|must|have to|" +
        "je vais|on va|il faut|je dois|nous allons|" +
        "deliver|livrer|fix|corriger|create|créer|build|" +
        "implement|implémenter|finish|terminer|send|envoyer|" +
        "complete|compléter|update|mettre à jour|add|ajouter|" +
        "prepare|préparer|review|réviser|test|tester|deploy|déployer)" +
        "\\b[^.!?\\n]{5,120}"
    );

    private static final Pattern DEADLINE_PATTERN = Pattern.compile(
        "(?i)\\b(by|before|deadline|due on|until|due|" +
        "avant|pour le|avant le|d'ici|à rendre|à livrer|" +
        "monday|tuesday|wednesday|thursday|friday|saturday|sunday|" +
        "lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|" +
        "today|tomorrow|next week|this week|end of|" +
        "aujourd'hui|demain|semaine prochaine|cette semaine|fin de|" +
        "january|february|march|april|may|june|july|august|september|october|november|december|" +
        "janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)" +
        "\\b[^.!?\\n]{2,80}"
    );

    private static final Pattern DECISION_PATTERN = Pattern.compile(
        "(?i)\\b(we decided|agreed to|we agreed|decision:|" +
        "on a décidé|décision:|nous avons décidé|on est d'accord|" +
        "we will use|we chose|let's go with|we're going with|" +
        "on utilise|on a choisi|on va partir sur|c'est décidé)" +
        "\\b[^.!?\\n]{5,100}"
    );

    // ── API publique ──────────────────────────────────────────────────────────

    public MeetingAIResult analyze(String transcript, List<String> speakers) {
        if (transcript == null || transcript.isBlank()) {
            return new MeetingAIResult(
                "Aucune transcription disponible pour cette réunion.",
                List.of(), List.of(), List.of()
            );
        }

        // Extraction locale (instantanée, pas besoin d'API)
        List<String> tasks     = extractMatches(TASK_PATTERN,     transcript, 8);
        List<String> deadlines = extractMatches(DEADLINE_PATTERN, transcript, 5);
        List<String> decisions = extractMatches(DECISION_PATTERN, transcript, 5);

        // Résumé : essaie HuggingFace, sinon fallback extractif local
        String summary = generateSummaryWithFallback(transcript, tasks, deadlines, decisions, speakers);

        log.info("MeetingAI: {} tasks, {} deadlines, {} decisions | summary {} chars",
                tasks.size(), deadlines.size(), decisions.size(), summary.length());

        return new MeetingAIResult(summary, tasks, deadlines, decisions);
    }

    // ── Génération du résumé ─────────────────────────────────────────────────

    private String generateSummaryWithFallback(
            String transcript,
            List<String> tasks,
            List<String> deadlines,
            List<String> decisions,
            List<String> speakers
    ) {
        // Essai 1 : Groq (rapide, fiable, clé déjà configurée)
        String summary = callGroq(transcript, speakers);
        if (summary != null) return summary;

        // Essai 2 : HuggingFace distilbart (si clé configurée)
        summary = callHuggingFace(DISTILBART_URL, transcript, 1);
        if (summary != null) return summary;

        // Essai 3 : HuggingFace bart-large
        summary = callHuggingFace(BART_LARGE_URL, transcript, 1);
        if (summary != null) return summary;

        // Fallback local : résumé extractif (toujours fonctionnel)
        log.info("All AI providers unavailable — using local extractive summarization");
        return extractiveSummary(transcript, tasks, deadlines, decisions, speakers);
    }

    @SuppressWarnings("unchecked")
    private String callGroq(String transcript, List<String> speakers) {
        if (groqApiKey == null || groqApiKey.isBlank()) return null;
        try {
            String participantsInfo = (speakers != null && !speakers.isEmpty())
                    ? "Participants: " + String.join(", ", speakers) + ".\n\n"
                    : "";
            String input = transcript.length() > 6000 ? transcript.substring(0, 6000) : transcript;

            String prompt = "You are a meeting assistant. Summarize the following meeting transcript in 2-4 sentences. "
                    + "Be concise and focus on decisions and outcomes. "
                    + "Respond in the same language as the transcript.\n\n"
                    + participantsInfo
                    + "Transcript:\n" + input;

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("model", "llama-3.1-8b-instant");
            body.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            body.put("temperature", 0);
            body.put("max_tokens", 400);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + groqApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> response = http.postForObject(
                    GROQ_CHAT_URL, new HttpEntity<>(body, headers), Map.class);

            if (response != null) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    if (message != null && message.get("content") instanceof String s && !s.isBlank()) {
                        log.info("Groq summary OK ({} chars)", s.length());
                        return s.trim();
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Groq summary failed: {}", e.getMessage());
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private String callHuggingFace(String modelUrl, String transcript, int maxAttempts) {
        String input = transcript.length() > 3000 ? transcript.substring(0, 3000) : transcript;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-wait-for-model", "true"); // attend le cold start

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("inputs", input);
        payload.put("parameters", Map.of(
            "max_length", 200,
            "min_length", 40,
            "do_sample",  false
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                ResponseEntity<List> response = http.exchange(
                        modelUrl, HttpMethod.POST, request, List.class);

                if (response.getBody() != null && !response.getBody().isEmpty()) {
                    Map<String, Object> first = (Map<String, Object>) response.getBody().get(0);
                    Object summaryText = first.get("summary_text");
                    if (summaryText instanceof String s && !s.isBlank()) {
                        log.info("HuggingFace summary OK ({} chars) via {}", s.length(), modelUrl);
                        return s.trim();
                    }
                }
                return null; // réponse reçue mais vide

            } catch (HttpStatusCodeException e) {
                int status = e.getStatusCode().value();
                if (status == 503 && attempt < maxAttempts) {
                    log.warn("HuggingFace 503 cold start (attempt {}/{}), retry in 15s...", attempt, maxAttempts);
                    try { Thread.sleep(15_000); } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt(); return null;
                    }
                } else {
                    log.warn("HuggingFace {} failed: {}", modelUrl, e.getMessage());
                    return null;
                }
            } catch (Exception e) {
                log.warn("HuggingFace {} error: {}", modelUrl, e.getMessage());
                return null;
            }
        }
        return null;
    }

    /**
     * Résumé extractif local — toujours fonctionnel, sans API.
     * Construit un résumé structuré à partir des éléments détectés.
     */
    private String extractiveSummary(
            String transcript,
            List<String> tasks,
            List<String> deadlines,
            List<String> decisions,
            List<String> speakers
    ) {
        StringBuilder sb = new StringBuilder();

        // Participants
        if (speakers != null && !speakers.isEmpty()) {
            sb.append("Participants : ").append(String.join(", ", speakers)).append(". ");
        }

        // Extraire les lignes de la transcription (format [Nom]: texte)
        String[] lines = transcript.split("\\n");
        Set<String> keyLines = new LinkedHashSet<>();

        // Prendre la première ligne de chaque speaker (ouverture de la réunion)
        Set<String> seenSpeakers = new HashSet<>();
        for (String line : lines) {
            if (line.trim().length() < 15) continue;
            // Extraire le nom du speaker
            int colon = line.indexOf(']');
            String speaker = colon > 0 ? line.substring(0, colon + 1) : "";
            if (!speaker.isEmpty() && seenSpeakers.add(speaker) && keyLines.size() < 3) {
                // Extraire le texte sans le tag [Nom]:
                String text = line.replaceFirst("^\\[[^]]+\\]:\\s*", "").trim();
                if (text.length() > 20) keyLines.add(text);
            }
        }

        // Lignes avec des mots-clés importants
        for (String line : lines) {
            if (keyLines.size() >= 6) break;
            String lower = line.toLowerCase();
            if (lower.matches(".*(décision|decision|agreed|conclu|résumé|finalement|conclusion).*")) {
                String text = line.replaceFirst("^\\[[^]]+\\]:\\s*", "").trim();
                if (text.length() > 20) keyLines.add(text);
            }
        }

        if (!keyLines.isEmpty()) {
            sb.append(String.join(". ", keyLines)).append(". ");
        }

        // Ajouter les tâches détectées
        if (!tasks.isEmpty()) {
            sb.append("Actions identifiées : ");
            int count = Math.min(tasks.size(), 3);
            for (int i = 0; i < count; i++) {
                sb.append(tasks.get(i));
                if (i < count - 1) sb.append(" / ");
            }
            sb.append(". ");
        }

        // Ajouter les deadlines
        if (!deadlines.isEmpty()) {
            sb.append("Échéances : ").append(deadlines.get(0)).append(". ");
        }

        String result = sb.toString().trim();
        if (result.length() < 30) {
            // Dernier recours : premières lignes de la transcription
            result = lines.length > 0 ? String.join(" ", Arrays.copyOfRange(lines, 0, Math.min(3, lines.length))) : transcript;
            result = result.replaceAll("\\[[^]]+\\]:\\s*", "");
            if (result.length() > 500) result = result.substring(0, 500) + "...";
        }

        return result;
    }

    // ── Extraction de patterns ────────────────────────────────────────────────

    private List<String> extractMatches(Pattern pattern, String text, int limit) {
        Set<String> results = new LinkedHashSet<>();
        Matcher m = pattern.matcher(text);
        while (m.find() && results.size() < limit) {
            String match = m.group().trim();
            if (match.length() >= 8) {
                results.add(capitalize(match));
            }
        }
        return new ArrayList<>(results);
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}

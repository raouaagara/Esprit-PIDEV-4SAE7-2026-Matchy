package com.marketplace.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import ws.schild.jave.Encoder;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;

import java.io.*;
import java.util.Map;

@Service
public class WhisperService {

    private static final Logger log = LoggerFactory.getLogger(WhisperService.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    /** Whisper transcription result: recognized text + detected language (ISO-639-1, or "" if unknown). */
    public static class TranscribeResult {
        public final String text;
        public final String language;
        TranscribeResult(String text, String language) {
            this.text     = text;
            this.language = language != null ? language : "";
        }
    }

    // Groq returns language as full English name ("french", "english", …) — map to ISO-639-1
    private static final Map<String, String> LANG_NAME_TO_CODE = Map.ofEntries(
        Map.entry("french",     "fr"),
        Map.entry("english",    "en"),
        Map.entry("arabic",     "ar"),
        Map.entry("spanish",    "es"),
        Map.entry("german",     "de"),
        Map.entry("italian",    "it"),
        Map.entry("portuguese", "pt"),
        Map.entry("chinese",    "zh"),
        Map.entry("russian",    "ru"),
        Map.entry("japanese",   "ja"),
        Map.entry("korean",     "ko"),
        Map.entry("dutch",      "nl"),
        Map.entry("turkish",    "tr"),
        Map.entry("polish",     "pl"),
        Map.entry("swedish",    "sv")
    );

    @Value("${groq.api-key:}")
    private String groqApiKey;

    @Value("${whisper.url:https://api.groq.com/openai/v1/audio/transcriptions}")
    private String whisperUrl;

    private final RestTemplate restTemplate;

    public WhisperService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(15_000);
        factory.setReadTimeout(60_000);
        this.restTemplate = new RestTemplate(factory);
        this.restTemplate.getMessageConverters().clear();
        this.restTemplate.getMessageConverters().add(new FormHttpMessageConverter());
        this.restTemplate.getMessageConverters().add(new StringHttpMessageConverter());
        this.restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    /**
     * Transcrit l'audio en texte via l'API Groq Whisper (compatible OpenAI).
     * Retourne le texte ET la langue détectée (ISO-639-1) grâce à verbose_json.
     */
    @SuppressWarnings("unchecked")
    public TranscribeResult transcribe(byte[] audioBytes, String contentType) {
        final TranscribeResult empty = new TranscribeResult("", "");

        if (audioBytes == null || audioBytes.length < 500) {
            log.warn("Whisper: audio trop court ({} bytes)", audioBytes == null ? 0 : audioBytes.length);
            return empty;
        }
        if (groqApiKey == null || groqApiKey.isBlank()) {
            log.warn("Whisper: groq.api-key non configuré");
            return empty;
        }

        // Conversion WAV pour une meilleure précision
        byte[] payload;
        String filename;
        byte[] wavBytes = convertToWav(audioBytes);
        if (wavBytes != null && wavBytes.length > 1000) {
            payload  = wavBytes;
            filename = "audio.wav";
        } else {
            payload  = audioBytes;
            filename = "audio.webm";
            log.debug("Conversion WAV échouée, envoi webm brut: {} bytes", audioBytes.length);
        }

        int maxAttempts = 2;
        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                log.debug("Groq Whisper tentative {}/{}: {} bytes [{}]", attempt, maxAttempts, payload.length, filename);

                final String fn = filename;
                ByteArrayResource audioResource = new ByteArrayResource(payload) {
                    @Override public String getFilename() { return fn; }
                };

                MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
                body.add("file",            audioResource);
                body.add("model",           "whisper-large-v3-turbo");
                body.add("response_format", "verbose_json"); // gives us language detection

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer " + groqApiKey);
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);

                HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);

                ResponseEntity<String> response = restTemplate.exchange(
                        whisperUrl, HttpMethod.POST, request, String.class);

                String responseBody = response.getBody();
                if (responseBody == null || responseBody.isBlank()) {
                    log.warn("Groq Whisper: réponse vide");
                    return empty;
                }

                log.debug("Groq Whisper réponse: {}", responseBody.length() > 200
                        ? responseBody.substring(0, 200) : responseBody);

                Map<String, Object> json = MAPPER.readValue(responseBody, Map.class);

                Object textObj = json.get("text");
                if (textObj == null || textObj.toString().isBlank()) {
                    log.warn("Groq Whisper: champ 'text' absent. Body={}", responseBody);
                    return empty;
                }

                String text = textObj.toString().trim();
                // verbose_json includes language as full English name, e.g. "french"
                String langFull = json.get("language") instanceof String s ? s.toLowerCase() : "";
                String langCode = LANG_NAME_TO_CODE.getOrDefault(langFull, langFull.length() >= 2 ? langFull.substring(0, 2) : "");

                log.info("Groq Whisper transcrit {} chars [lang={}]: {}", text.length(), langCode,
                        text.length() > 80 ? text.substring(0, 80) + "..." : text);

                return new TranscribeResult(text, langCode);

            } catch (HttpStatusCodeException e) {
                int status = e.getStatusCode().value();
                if ((status == 429 || status == 503) && attempt < maxAttempts) {
                    log.warn("Groq Whisper HTTP {} (tentative {}), retry dans 3s...", status, attempt);
                    try { Thread.sleep(3_000); } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt(); return empty;
                    }
                } else {
                    log.warn("Groq Whisper HTTP {}: {}", status, e.getResponseBodyAsString());
                    return empty;
                }
            } catch (Exception e) {
                log.warn("Groq Whisper exception [{}]: {}", e.getClass().getSimpleName(), e.getMessage());
                return empty;
            }
        }

        return empty;
    }

    /**
     * Convertit webm/opus → WAV PCM 16kHz mono via JAVE/FFmpeg.
     */
    private byte[] convertToWav(byte[] inputBytes) {
        File inputFile = null;
        File outputFile = null;
        try {
            inputFile  = File.createTempFile("whisper_in_",  ".webm");
            outputFile = File.createTempFile("whisper_out_", ".wav");

            try (FileOutputStream fos = new FileOutputStream(inputFile)) {
                fos.write(inputBytes);
            }

            AudioAttributes audio = new AudioAttributes();
            audio.setCodec("pcm_s16le");
            audio.setBitRate(256000);
            audio.setChannels(1);
            audio.setSamplingRate(16000);

            EncodingAttributes attrs = new EncodingAttributes();
            attrs.setOutputFormat("wav");
            attrs.setAudioAttributes(audio);

            try {
                new Encoder().encode(new MultimediaObject(inputFile), outputFile, attrs);
            } catch (Exception encEx) {
                if (!outputFile.exists() || outputFile.length() < 1000) {
                    log.debug("convertToWav: encode échoué, fichier invalide");
                    return null;
                }
                log.debug("convertToWav: chunk partiel OK, {} bytes", outputFile.length());
            }

            if (!outputFile.exists() || outputFile.length() < 1000) return null;

            try (FileInputStream fis = new FileInputStream(outputFile)) {
                byte[] result = fis.readAllBytes();
                log.debug("convertToWav: {} → {} bytes WAV", inputBytes.length, result.length);
                return result;
            }

        } catch (Exception e) {
            log.debug("convertToWav [{}]: {}", e.getClass().getSimpleName(), e.getMessage());
            return null;
        } finally {
            if (inputFile  != null) inputFile.delete();
            if (outputFile != null) outputFile.delete();
        }
    }
}

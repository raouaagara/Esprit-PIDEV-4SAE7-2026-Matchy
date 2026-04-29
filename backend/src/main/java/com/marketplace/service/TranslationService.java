package com.marketplace.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class TranslationService {

    private static final Logger log = LoggerFactory.getLogger(TranslationService.class);
    private static final int CACHE_MAX = 2000;

    // FIX #4 — LRU cache : supprime les plus anciennes entrées au lieu de tout vider
    private final Map<String, String> cache = new LinkedHashMap<>(CACHE_MAX, 0.75f, true) {
        @Override
        protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
            return size() > CACHE_MAX;
        }
    };

    private final RestTemplate http;

    @Value("${libretranslate.url:https://translate.argosopentech.com}")
    private String libreTranslateUrl;

    private static final String LIBRE_PUBLIC_FALLBACK = "https://translate.argosopentech.com";
    private static final String GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

    private static final Map<String, String> LANG_NAMES = Map.ofEntries(
        Map.entry("fr", "French"),   Map.entry("en", "English"),
        Map.entry("ar", "Arabic"),   Map.entry("es", "Spanish"),
        Map.entry("de", "German"),   Map.entry("it", "Italian"),
        Map.entry("pt", "Portuguese"), Map.entry("zh", "Chinese"),
        Map.entry("ru", "Russian"),  Map.entry("ja", "Japanese"),
        Map.entry("ko", "Korean"),   Map.entry("tr", "Turkish")
    );

    @Value("${libretranslate.api-key:}")
    private String apiKey;

    @Value("${groq.api-key:}")
    private String groqApiKey;

    public TranslationService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5_000);
        factory.setReadTimeout(8_000);
        this.http = new RestTemplate(factory);
        this.http.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    /**
     * Traduit text de sourceLang vers targetLang.
     * Ordre : LibreTranslate configuré → instance publique (si différente) → MyMemory → texte original.
     */
    public String translate(String text, String sourceLang, String targetLang) {
        if (text == null || text.isBlank()) return text;
        if (targetLang == null || targetLang.isBlank()) return text;
        if (sourceLang != null && sourceLang.equals(targetLang)) return text;

        // FIX #2 — Ne pas envoyer "auto" directement, détecter d'abord par script
        String src = (sourceLang == null || sourceLang.isBlank()) ? detectByScript(text) : sourceLang;
        if (src == null || src.equals("auto")) {
            // Détection API si le script ne suffit pas
            src = detectLanguage(text);
        }
        if (src.equals(targetLang)) return text;

        String cacheKey = src + "|" + targetLang + "|" + text;
        synchronized (cache) {
            String cached = cache.get(cacheKey);
            if (cached != null) return cached;
        }

        String result = null;

        // 1. Groq LLM (rapide, fiable, clé déjà configurée pour Whisper)
        result = tryGroq(text, src, targetLang);

        // 2. LibreTranslate (URL configurée)
        if (result == null) {
            result = tryLibreTranslate(libreTranslateUrl, text, src, targetLang);
        }

        // 3. LibreTranslate instance publique de secours
        if (result == null && !libreTranslateUrl.trim().equals(LIBRE_PUBLIC_FALLBACK)) {
            result = tryLibreTranslate(LIBRE_PUBLIC_FALLBACK, text, src, targetLang);
        }

        // 4. MyMemory (API gratuite, fiable, 10 000 mots/jour)
        if (result == null) {
            result = tryMyMemory(text, src, targetLang);
        }

        if (result != null) {
            synchronized (cache) {
                cache.put(cacheKey, result);
            }
            return result;
        }

        log.warn("All translation providers failed for [{} → {}]", src, targetLang);
        return text;
    }

    /**
     * Détecte la langue du texte.
     * Utilise l'analyse de script (rapide, sans API) puis LibreTranslate en fallback.
     */
    public String detectLanguage(String text) {
        if (text == null || text.isBlank()) return "en";

        String fast = detectByScript(text);
        if (fast != null) return fast;

        try {
            Map<String, Object> body = new HashMap<>();
            body.put("q", text.length() > 100 ? text.substring(0, 100) : text);
            if (!apiKey.isBlank()) body.put("api_key", apiKey);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> results = http.postForObject(
                    libreTranslateUrl + "/detect",
                    new HttpEntity<>(body, headers),
                    List.class
            );

            if (results != null && !results.isEmpty()) {
                Object lang = results.get(0).get("language");
                if (lang instanceof String s && s.length() >= 2) {
                    return s.substring(0, 2).toLowerCase();
                }
            }
        } catch (Exception e) {
            log.debug("LibreTranslate detect failed: {}", e.getMessage());
        }

        return "en";
    }

    // ── Providers ─────────────────────────────────────────────────────────────

    @SuppressWarnings("unchecked")
    private String tryLibreTranslate(String baseUrl, String text, String source, String target) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("q", text);
            body.put("source", source); // source est déjà résolu (jamais "auto" ici)
            body.put("target", target);
            body.put("format", "text");
            if (!apiKey.isBlank()) body.put("api_key", apiKey);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> response = http.postForObject(
                    baseUrl + "/translate",
                    new HttpEntity<>(body, headers),
                    Map.class
            );

            if (response != null && response.get("translatedText") instanceof String s && !s.isBlank()) {
                log.debug("LibreTranslate OK ({}): {} chars", baseUrl, s.length());
                return s;
            }
        } catch (Exception e) {
            log.debug("LibreTranslate failed ({}): {}", baseUrl, e.getMessage());
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private String tryMyMemory(String text, String source, String target) {
        try {
            // FIX #3 — Ne pas supposer que "auto" = "en" : utiliser la détection réelle
            String src = (source == null || source.equals("auto")) ? detectLanguage(text) : source;

            // FIX #5 — Avertir si le texte est tronqué
            String textToTranslate = text;
            if (text.length() > 500) {
                log.warn("MyMemory: text truncated from {} to 500 chars", text.length());
                textToTranslate = text.substring(0, 500);
            }

            String encoded = URLEncoder.encode(textToTranslate, StandardCharsets.UTF_8);
            String url = "https://api.mymemory.translated.net/get?q=" + encoded
                    + "&langpair=" + src + "|" + target
                    + "&mt=1&of=json";

            Map<String, Object> response = http.getForObject(url, Map.class);
            if (response != null) {
                Object data = response.get("responseData");
                if (data instanceof Map<?, ?> dataMap) {
                    Object translated = dataMap.get("translatedText");
                    if (translated instanceof String s
                            && !s.isBlank()
                            && !s.toLowerCase().contains("invalid")
                            && !s.toLowerCase().contains("mymemory")
                            && !s.equalsIgnoreCase(text)) {
                        log.debug("MyMemory OK: {} chars [{} → {}]", s.length(), src, target);
                        return s;
                    }
                }
            }
        } catch (Exception e) {
            log.debug("MyMemory failed: {}", e.getMessage());
        }
        return null;
    }

    @SuppressWarnings("unchecked")
    private String tryGroq(String text, String source, String target) {
        if (groqApiKey == null || groqApiKey.isBlank()) return null;
        try {
            String srcName = LANG_NAMES.getOrDefault(source, source);
            String tgtName = LANG_NAMES.getOrDefault(target, target);
            String prompt  = "Translate from " + srcName + " to " + tgtName
                    + ". Return ONLY the translation, no explanation:\n\n" + text;

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("model", "llama-3.1-8b-instant");
            body.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            body.put("temperature", 0);
            body.put("max_tokens", 500);

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
                        log.debug("Groq translation OK ({} → {}): {} chars", source, target, s.length());
                        return s.trim();
                    }
                }
            }
        } catch (Exception e) {
            log.debug("Groq translation failed: {}", e.getMessage());
        }
        return null;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Détection rapide par script Unicode.
     * Retourne null pour les scripts latins (français, anglais, espagnol…)
     * afin de laisser l'API faire la détection fine.
     */
    String detectByScript(String text) {
        int arabic = 0, cyrillic = 0, cjk = 0, latin = 0;
        int samples = Math.min(text.length(), 200);
        for (int i = 0; i < samples; i++) {
            char c = text.charAt(i);
            if (c >= '\u0600' && c <= '\u06FF') arabic++;
            else if (c >= '\u0400' && c <= '\u04FF') cyrillic++;
            else if ((c >= '\u4E00' && c <= '\u9FFF') || (c >= '\u3040' && c <= '\u30FF')) cjk++;
            else if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) latin++;
        }
        int total = arabic + cyrillic + cjk + latin;
        if (total == 0) return null;
        if ((double) arabic   / total > 0.25) return "ar";
        if ((double) cyrillic / total > 0.25) return "ru";
        if ((double) cjk      / total > 0.25) return "zh";
        // FIX #5 — Latin détecté mais langue inconnue → laisser l'API décider (fr, en, es…)
        return null;
    }
}
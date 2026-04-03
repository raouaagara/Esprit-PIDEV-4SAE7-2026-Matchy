package com.matchy.config;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class FeignErrorDecoder implements ErrorDecoder {

    private static final Logger log = LoggerFactory.getLogger(FeignErrorDecoder.class);

    private final ErrorDecoder defaultDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        log.error("Erreur Feign - méthode: {}, status: {}", methodKey, response.status());

        return switch (response.status()) {
            case 400 -> new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Requête invalide vers le service distant"
            );
            case 401 -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Non autorisé"
            );
            case 403 -> new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Accès refusé"
            );
            case 404 -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Ressource introuvable dans le service distant"
            );
            case 500 -> new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Erreur interne du service distant"
            );
            default -> defaultDecoder.decode(methodKey, response);
        };
    }
}
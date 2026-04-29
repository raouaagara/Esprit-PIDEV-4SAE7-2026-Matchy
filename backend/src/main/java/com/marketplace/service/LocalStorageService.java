package com.marketplace.service;

import com.marketplace.dto.Dtos.FileUploadResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalStorageService {

    private static final Logger log = LoggerFactory.getLogger(LocalStorageService.class);

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.upload.base-url:http://localhost:8085}")
    private String baseUrl;

    public FileUploadResponse upload(MultipartFile file) throws IOException {
        if (file.isEmpty()) throw new IOException("Fichier vide");

        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        // Generate unique filename preserving extension
        String ext = getExtension(file.getOriginalFilename());
        String storedName = UUID.randomUUID().toString() + ext;
        Path destination = uploadPath.resolve(storedName);

        // Save to disk
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        log.info("File saved: {}", destination);

        String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";
        String resourceType = contentType.startsWith("image/") ? "image" : "raw";
        String publicUrl = baseUrl + "/api/files/" + storedName;
        String originalName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";

        return new FileUploadResponse(publicUrl, storedName, resourceType, originalName);
    }

    public Path resolve(String filename) {
        // Security: strip any path traversal
        String safeName = Paths.get(filename).getFileName().toString();
        return Paths.get(uploadDir).toAbsolutePath().normalize().resolve(safeName);
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf(".")).toLowerCase();
    }
}

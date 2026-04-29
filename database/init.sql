-- ============================================================
-- Marketplace Database - Script d'initialisation
-- ============================================================

CREATE DATABASE IF NOT EXISTS marketplace_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marketplace_db;

-- Les tables sont créées automatiquement par JPA (spring.jpa.hibernate.ddl-auto=update)
-- Ce script contient des données de test

-- Insérer des utilisateurs de test (mot de passe = "password123" hashé avec BCrypt)
-- Hash BCrypt de "password123"
INSERT IGNORE INTO users (email, password, name, role, created_at) VALUES
('client1@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'Alice Dupont', 'CLIENT', NOW()),
('client2@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'Bob Martin', 'CLIENT', NOW()),
('org1@test.com',    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'TechVision Agency', 'ORGANIZER', NOW()),
('org2@test.com',    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'Design Studio Pro', 'ORGANIZER', NOW());

-- Note: Le hash ci-dessus est un exemple, l'application génère les vrais hash.
-- Utilisez l'endpoint /api/auth/register pour créer des comptes correctement.

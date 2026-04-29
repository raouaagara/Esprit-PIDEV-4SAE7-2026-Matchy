# 🛒 Marketplace — Angular + Spring Boot + MySQL

Plateforme marketplace complète avec :
- **Clients** : Voir les projets, chatter avec les organisateurs en temps réel
- **Organisateurs** : Dashboard avec statistiques, gestion des projets (CRUD)
- **Temps réel** : Nouveaux projets et messages via WebSocket (STOMP)

---

## 🏗️ Architecture

```
project/
├── backend/          ← Spring Boot 3 (port 8085)
├── frontend/         ← Angular 17  (port 4200)
└── database/         ← Script SQL MySQL
```

---

## 📋 Prérequis

| Outil      | Version |
|-----------|---------|
| Java      | 17+     |
| Maven     | 3.8+    |
| Node.js   | 18+     |
| npm       | 9+      |
| MySQL     | 8.0+    |

---

## 🚀 Lancement rapide

### 1. MySQL — Créer la base

```sql
CREATE DATABASE marketplace_db;
```

> La base et les tables sont créées automatiquement au premier démarrage (`ddl-auto=update`).

### 2. Backend — Spring Boot

```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

API disponible sur : http://localhost:8085

> **Modifier** `src/main/resources/application.properties` si besoin :
> ```properties
> spring.datasource.username=root
> spring.datasource.password=root
> ```

### 3. Frontend — Angular

```bash
cd frontend
npm install
npm start
```

Application disponible sur : http://localhost:4200

---

## 👤 Comptes de test

Créez des comptes via l'interface d'inscription :

| Rôle        | Email               | Actions                           |
|-------------|---------------------|-----------------------------------|
| Client      | client@test.com     | Voir projets, chatter             |
| Organisateur| org@test.com        | Dashboard, créer/gérer projets    |

---

## 🔌 API Endpoints

### Auth
| Méthode | URL                    | Description           |
|---------|------------------------|-----------------------|
| POST    | /api/auth/register     | Inscription           |
| POST    | /api/auth/login        | Connexion → JWT token |

### Projets
| Méthode | URL                    | Description                      |
|---------|------------------------|----------------------------------|
| GET     | /api/projects          | Tous les projets (public)         |
| GET     | /api/projects/my       | Projets de l'organisateur connecté|
| POST    | /api/projects          | Créer un projet (ORGANIZER)       |
| PUT     | /api/projects/{id}     | Modifier un projet (ORGANIZER)    |
| DELETE  | /api/projects/{id}     | Supprimer un projet (ORGANIZER)   |
| GET     | /api/projects/dashboard| Stats du tableau de bord          |

### Chat
| Méthode | URL                    | Description                      |
|---------|------------------------|----------------------------------|
| GET     | /api/chat/{projectId}  | Historique des messages           |
| POST    | /api/chat/send         | Envoyer un message                |

### WebSocket (STOMP)
| Topic                  | Description                          |
|------------------------|--------------------------------------|
| /topic/projects        | Nouveau projet publié (temps réel)   |
| /topic/project-deleted | Projet supprimé (temps réel)         |
| /topic/chat/{id}       | Messages chat d'un projet            |

---

## ✨ Fonctionnalités

### 🛍️ Espace Client
- Liste de tous les projets avec filtres par catégorie et recherche
- Mise à jour en temps réel quand un organisateur publie un projet
- Bouton **💬 Chatter** sur chaque projet
- Chat en temps réel avec l'organisateur via WebSocket

### 🚀 Espace Organisateur
- **Dashboard** : Total projets, total vendus, revenu, graphique par catégorie
- **Gestion projets** : CRUD complet (créer, modifier, supprimer)
- Ajout d'un projet → apparaît instantanément chez les clients
- Upload URL d'image avec prévisualisation

---

## 🔧 Configuration

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/marketplace_db
spring.datasource.username=root
spring.datasource.password=root
server.port=8085
jwt.secret=mySecretKeyForJWTTokenGenerationThatIsVeryLongAndSecure2024
jwt.expiration=86400000
```

### Frontend (`environment.ts`)
L'URL de l'API est configurée directement dans les services Angular :
```typescript
private apiUrl = 'http://localhost:8085/api';
```

---

## 📁 Structure du projet

### Backend
```
com.marketplace/
├── config/          SecurityConfig, WebSocketConfig
├── controller/      AuthController, ProjectController, ChatController
├── dto/             Dtos (tous les DTO en une classe)
├── entity/          User, Project, ChatMessage
├── repository/      UserRepository, ProjectRepository, ChatMessageRepository
├── security/        JwtUtil, JwtFilter, CustomUserDetailsService
└── service/         AuthService, ProjectService, ChatService
```

### Frontend
```
src/app/
├── core/
│   ├── guards/       authGuard, organizerGuard, clientGuard
│   ├── interceptors/ authInterceptor (JWT)
│   └── services/     AuthService, ProjectService, ChatService, WebSocketService
├── features/
│   ├── auth/         login, register
│   ├── client/       projects (liste + filtres), chat (panel temps réel)
│   └── organizer/    dashboard (stats), projects (CRUD)
└── shared/
    └── models/       models.ts (interfaces TypeScript)
```

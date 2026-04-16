# Matchy 🤝

> **Smart Freelance & Event Management Platform**  
> Esprit School of Engineering · PIDEV 4SAE7 · 2025–2026

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Innovations](#core-innovations)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Access Points](#access-points)
- [Contributors](#contributors)
- [Academic Context](#academic-context)

---

## 🌐 Overview

**Matchy** is an intelligent freelance marketplace and event management platform designed to revolutionize how freelancers and clients connect, collaborate, and succeed. Built with cutting-edge microservices architecture and a user-first approach, Matchy addresses critical pain points in the $1.5 trillion global freelance economy.

> **Vision:** To create an intelligent, transparent, and efficient ecosystem that empowers freelancers to build sustainable careers while enabling clients to discover and collaborate with the perfect talent for their projects.

---

## 💡 Core Innovations

### 🏗️ Microservices Architecture
- **API Gateway** `(port 9090)` — Single entry point with intelligent routing
- **Eureka Server** `(port 8761)` — Service discovery and registration
- **Backend Services** `(port 8081)` — Event, user, profile, subscription management
- **Angular Frontend** `(port 4200)` — Modern, responsive UI with dark mode

### 🎯 Event Management System
- Create, update, and delete events with real-time updates
- Online and offline event support with location mapping
- Registration workflow with approval system
- Real-time statistics and analytics dashboard
- Notification system for pending registrations

### 🎨 Modern UI/UX
- Soft purple theme with full dark mode support
- Animated components with smooth transitions
- Responsive design for all screen sizes
- Glassmorphism effects and modern aesthetics

### 📊 Analytics & Reporting
- Event statistics with fill rate tracking
- Registration breakdown by status
- Export functionality — CSV, Excel, PDF
- Visual charts and progress indicators

---

## ✨ Features

**For Users**
- Browse and register for events (online/offline)
- View event details with location maps
- Track registration status in real time
- Responsive event cards with animations

**For Administrators**
- Complete event CRUD operations
- Registration management (approve / reject / delete)
- Real-time statistics dashboard
- Notification bell for pending registrations
- Export data in multiple formats

**Platform**
- Service discovery with Eureka
- API Gateway for centralized routing
- CORS configuration for security
- Health monitoring and metrics
- Dark mode with theme persistence
- Auto-refresh notifications every 30 seconds

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Angular 18, TypeScript, SCSS, RxJS, Angular Router |
| **Backend** | Spring Boot 3.2, Spring Data JPA, MySQL 8 |
| **Infrastructure** | Spring Cloud Gateway, Netflix Eureka, Spring Actuator |
| **DevOps** | Maven, Git, Docker (ready) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Angular Frontend  :4200         │
│   Frontoffice · Backoffice · Dark Mode  │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│          API Gateway  :9090             │
│     Routing · CORS · Load Balancing     │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│         Eureka Server  :8761            │
│          Service Discovery              │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│       Backend Microservices  :8081      │
│  user. profile-project · event · profile · subscription │
│      milestone · content-certification │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│          MySQL Database  :3307          │
│  Users · Events · Projects · Milestones │
└─────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Java 17+
- MySQL 8.0+
- Maven 3.6+
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/raouaagara/Esprit-PIDEV-4SAE7-2026-Matchy.git
cd Esprit-PIDEV-4SAE7-2026-Matchy
```

**2. Database setup**
```sql
CREATE DATABASE matchy_db;
```

**3. Start Eureka Server**
```bash
cd eureka-server
mvn spring-boot:run
# → http://localhost:8761
```

**4. Start Backend**
```bash
cd backend
mvn spring-boot:run
# → http://localhost:8081
```

**5. Start API Gateway**
```bash
cd api-gateway
mvn spring-boot:run
# → http://localhost:9090
```

**6. Start Frontend**
```bash
npm install
npm start
# → http://localhost:4200
```

> **Windows shortcut:** run `start-all.bat`

---

## 🔑 Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:4200 | — |
| Backoffice | http://localhost:4200/backoffice/login | admin@matchy.tn / password |
| API Gateway | http://localhost:9090 | — |
| Backend API | http://localhost:8081 | — |
| Eureka Dashboard | http://localhost:8761 | — |
| MySQL | localhost:3307 | root / (empty) |

---

## 👥 Contributors

| Name | GitHub |
|------|--------|
| Raouaa Gara | [@raouaagara](https://github.com/raouaagara) |
| Amine Abdellah | [@amine52a](https://github.com/amine52a) |
| Soumaya Mchita | [@soumaya-afk](https://github.com/soumaya-afk) |
| Asma Ibrahim | [@asmaibr](https://github.com/asmaibr) |
| Sourour Alaimi | [@alaimi-sourour](https://github.com/alaimi-sourour) |

---

## 🎓 Academic Context

**Institution:** Esprit School of Engineering — Tunisia  
**Program:** PIDEV — 4SAE7  
**Academic Year:** 2025–2026  
**Supervisors:** Mr. Alaa Rami · Ms. Chahnez Sardouk

---

## 🔮 Future Enhancements

- [ ] AI-powered job matching with compatibility scores
- [ ] Skill verification and certification programs
- [ ] Integrated payment system with escrow
- [ ] Real-time chat and collaboration tools
- [ ] Mobile application (iOS & Android)
- [ ] Multi-language support
- [ ] OAuth 2.0 social login

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by the Matchy Team · Esprit School of Engineering · 2025–2026
</div>

# Matchy 🤝 – Smart Freelance and Event Management Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)]()
[![Academic Year](https://img.shields.io/badge/academic%20year-2025%2F2026-green.svg)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Innovations](#core-innovations)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributors](#contributors)
- [Academic Context](#academic-context)
- [Acknowledgments](#acknowledgments)

---

## Overview

This project was developed as part of the **PIDEV – 4th Year Engineering Program** at **Esprit School of Engineering** (Academic Year 2025–2026).

Matchy is an intelligent freelance marketplace and event management platform designed to revolutionize how freelancers and clients connect, collaborate, and succeed. Built with cutting-edge microservices architecture and a user-first approach, Matchy addresses critical pain points in the $1.5 trillion global freelance economy.

**Vision:** To create an intelligent, transparent, and efficient ecosystem that empowers freelancers to build sustainable careers while enabling clients to discover and collaborate with the perfect talent for their projects.

---

## 💡 Core Innovations

### 1. 🏗️ Microservices Architecture
- **API Gateway** (Port 9090) - Single entry point with intelligent routing
- **Eureka Server** (Port 8761) - Service discovery and registration
- **Backend Services** (Port 8081) - Event management, user management, registrations
- **Angular Frontend** (Port 4200) - Modern, responsive UI with dark mode

### 2. 🎯 Event Management System
- Create, update, and delete events with real-time updates
- Online and offline event support with location mapping
- Event registration workflow with approval system
- Real-time statistics and analytics dashboard
- Notification system for pending registrations

### 3. 🎨 Modern UI/UX
- Soft purple theme with dark mode support
- Animated components with smooth transitions
- Responsive design for all screen sizes
- Glassmorphism effects and modern aesthetics

### 4. 🔄 Real-time Updates
- Event refresh service for instant updates across components
- Auto-refresh notifications every 30 seconds
- Live statistics and participant tracking

### 5. 📊 Analytics & Reporting
- Event statistics with fill rate tracking
- Registration breakdown by status
- Export functionality (CSV, Excel, PDF)
- Visual charts and progress indicators

---

## ✨ Features

### For Users
- Browse and register for events (online/offline)
- View event details with location maps
- Track registration status
- Responsive event cards with animations

### For Administrators
- Complete event CRUD operations
- Registration management (approve/reject/delete)
- Real-time statistics dashboard
- Location tracking for offline events
- Notification bell for pending registrations
- Export data in multiple formats

### Platform Features
- Service discovery with Eureka
- API Gateway for centralized routing
- CORS configuration for security
- Request/response logging
- Health monitoring and metrics
- Dark mode with theme persistence

---

## 🛠️ Tech Stack

### Frontend
- **Angular 18** - Modern web framework with modular architecture
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with variables
- **RxJS** - Reactive programming
- **Angular Router** - Lazy loading modules

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Data JPA** - Database access
- **MySQL** - Relational database
- **Spring Cloud Gateway** - API Gateway
- **Netflix Eureka** - Service discovery
- **Spring Boot Actuator** - Monitoring

### DevOps & Tools
- **Maven** - Build automation
- **Git** - Version control
- **Docker** - Containerization (ready)

---

## 🏗️ Architecture

### Microservices Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Angular Frontend (4200)                    │
│  • Event Management  • Registration  • Dark Mode            │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway (9090)                        │
│  • Request Routing  • Load Balancing  • CORS               │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Eureka Server (8761)                       │
│  • Service Discovery  • Health Monitoring                   │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                 Matchy Backend (8081)                       │
│  • Event Service  • User Service  • Registration Service    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL Database (3307)                    │
│  • Events  • Users  • Registrations                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
matchy-angular/
├── src/app/
│   ├── frontoffice/                  # Public-facing module
│   │   ├── home/                     # Landing page
│   │   ├── events/                   # Event browsing & registration
│   │   ├── layout/                   # Navbar + Footer
│   │   └── frontoffice.module.ts
│   │
│   ├── backoffice/                   # Admin module
│   │   ├── dashboard/                # Admin dashboard
│   │   ├── events/                   # Event management (CRUD)
│   │   ├── registrations/            # Registration management
│   │   ├── users/                    # User management
│   │   ├── layout/                   # Sidebar + Header
│   │   └── backoffice.module.ts
│   │
│   ├── shared/                       # Shared components
│   │   ├── components/
│   │   │   ├── notification-bell/    # Real-time notifications
│   │   │   ├── location-icon/        # Event location viewer
│   │   │   ├── location-map/         # Map modal
│   │   │   ├── event-statistics-panel/ # Statistics panel
│   │   │   ├── confirmation-dialog/  # Animated dialogs
│   │   │   └── theme-toggle/         # Dark mode toggle
│   │   ├── services/
│   │   └── pipes/
│   │
│   └── core/                         # Core services & models
│       ├── services/
│       │   ├── evenement.service.ts
│       │   ├── registration.service.ts
│       │   ├── event-refresh.service.ts
│       │   ├── theme.service.ts
│       │   └── export.service.ts
│       └── models/
│
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/matchy/
│   │   ├── controller/               # REST controllers
│   │   ├── service/                  # Business logic
│   │   ├── repository/               # Data access
│   │   ├── entity/                   # JPA entities
│   │   ├── dto/                      # Data transfer objects
│   │   └── config/                   # Configuration
│   └── pom.xml
│
├── eureka-server/                    # Service discovery
│   ├── src/main/java/com/matchy/eureka/
│   └── pom.xml
│
├── api-gateway/                      # API Gateway
│   ├── src/main/java/com/matchy/gateway/
│   │   ├── config/                   # Gateway routes & CORS
│   │   └── filter/                   # Request/response logging
│   └── pom.xml
│
└── Documentation/                    # Comprehensive guides
    ├── API_GATEWAY_GUIDE.md
    ├── EUREKA_SETUP_GUIDE.md
    ├── REGISTRATION_FEATURE_GUIDE.md
    ├── DARK_MODE_GUIDE.md
    └── LOCATION_MAP_GUIDE.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Java** 17+
- **MySQL** 8.0+
- **Maven** 3.6+
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/raouaagara/Esprit-PIDEV-4SAE7-2026-Matchy.git
cd Esprit-PIDEV-4SAE7-2026-Matchy
```

#### 2. Database Setup
```bash
# Start MySQL (XAMPP or standalone)
# Create database
mysql -u root -p
CREATE DATABASE matchy_db;

# Run SQL scripts
mysql -u root -p matchy_db < backend/create_database.sql
mysql -u root -p matchy_db < backend/insert_sample_data.sql
mysql -u root -p matchy_db < backend/insert_sample_users.sql
```

#### 3. Start Backend Services

**Terminal 1 - Eureka Server:**
```bash
cd eureka-server
mvn spring-boot:run
# Access: http://localhost:8761
```

**Terminal 2 - Backend Application:**
```bash
cd backend
mvn spring-boot:run
# Access: http://localhost:8081
```

**Terminal 3 - API Gateway:**
```bash
cd api-gateway
mvn spring-boot:run
# Access: http://localhost:9090
```

#### 4. Start Frontend
**Terminal 4 - Angular:**
```bash
npm install
npm start
# Access: http://localhost:4200
```

### Quick Start Script (Windows)
```bash
# Use the provided batch file
start-dev.bat
```

---

## 🔑 Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:4200 | - |
| Backoffice Login | http://localhost:4200/backoffice/login | admin@matchy.tn / password |
| API Gateway | http://localhost:9090 | - |
| Backend API | http://localhost:8081 | - |
| Eureka Dashboard | http://localhost:8761 | - |
| MySQL | localhost:3307 | root / (empty) |

---

## 📚 Documentation

Comprehensive guides are available in the project:

- **[API_GATEWAY_GUIDE.md](API_GATEWAY_GUIDE.md)** - API Gateway setup and usage
- **[EUREKA_SETUP_GUIDE.md](EUREKA_SETUP_GUIDE.md)** - Service discovery configuration
- **[REGISTRATION_FEATURE_GUIDE.md](REGISTRATION_FEATURE_GUIDE.md)** - Event registration system
- **[DARK_MODE_GUIDE.md](DARK_MODE_GUIDE.md)** - Theme implementation
- **[LOCATION_MAP_GUIDE.md](LOCATION_MAP_GUIDE.md)** - Location features
- **[API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)** - API testing instructions

---

## 👥 Contributors

| Name | GitHub | Role |
|------|--------|------|
| Raouaa GARA | [@raouaagara](https://github.com/raouaagara) | Team Lead |
| Amine Abdellah | [@amine52a](https://github.com/amine52a) | Backend Developer |
| Soumaya Mchita | [@soumaya-afk](https://github.com/soumaya-afk) | Frontend Developer |
| Asma Ibrahim | [@asmaibr](https://github.com/asmaibr) | Full Stack Developer |
| Sourour Alaimi | [@alaimi-sourour](https://github.com/alaimi-sourour) | UI/UX Designer |
| Salma Haouari | [@salmahaouarii](https://github.com/salmahaouarii) | QA Engineer |

---

## 🎓 Academic Context

**Institution:** Esprit School of Engineering – Tunisia  
**Program:** PIDEV – 4SAE7  
**Academic Year:** 2025–2026  
**Supervisors:** Mr. Alaa RAMI, Ms. Chahnez SARDOUK

---

## 🙏 Acknowledgments

- **Esprit School of Engineering** for the academic framework and support
- **Mr. Alaa RAMI** and **Ms. Chahnez SARDOUK** for their supervision and guidance
- All contributors and teammates for their dedication and hard work
- The open-source community for the amazing tools and libraries

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔮 Future Enhancements

- [ ] AI-powered job matching with compatibility scores
- [ ] Skill verification and certification programs
- [ ] Integrated payment system with escrow
- [ ] Real-time chat and collaboration tools
- [ ] Mobile application (iOS & Android)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] OAuth 2.0 social login

---

Built with ❤️ by the Matchy Team | Esprit School of Engineering | Academic Year 2025–2026

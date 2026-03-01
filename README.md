# Matchy 🤝 – Smart Freelance and Matching Platform

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
- [Contributors](#contributors)
- [Academic Context](#academic-context)
- [Getting Started](#getting-started)
- [Acknowledgments](#acknowledgments)

---

## Overview

This project was developed as part of the **PIDEV – 4th Year Engineering Program** at **Esprit School of Engineering** (Academic Year 2025–2026).

Matchy is an intelligent freelance marketplace designed to revolutionize how freelancers and clients connect, collaborate, and succeed. Built with cutting-edge AI technology and a user-first approach, Matchy addresses critical pain points in the $1.5 trillion global freelance economy.

**Vision:** To create an intelligent, transparent, and efficient ecosystem that empowers freelancers to build sustainable careers while enabling clients to discover and collaborate with the perfect talent for their projects.

---

## 💡 Core Innovations

### 1. 🤖 AI-Powered Smart Matching
Machine learning algorithms analyze skills, experience, work history, communication style, and past outcomes to calculate real-time compatibility scores and predict project success.

### 2. 🔄 Integrated Workflow
End-to-end platform covering discovery, hiring, project management, collaboration, time tracking, invoicing, and relationship management in one seamless experience.

### 3. 📈 Career Development Intelligence
Personalized skill gap analysis, market demand insights, learning path recommendations, and career progression tracking powered by data analytics.

### 4. ✅ Robust Quality Assurance
Multi-layer verification including identity checks, skill assessments, portfolio authentication, peer reviews, and continuous performance monitoring.

### 5. 💰 Fair Economic Model
Transparent, tiered pricing (8-12% vs industry standard 15-20%), with value-added services justifying fees.

### 6. 🤝 Relationship-First Design
Features specifically designed to facilitate long-term collaborations, team building, and preferred freelancer networks.

---

## ✨ Features

### For Freelancers
- AI-powered job matching with compatibility scores
- Comprehensive profile and portfolio showcase
- Integrated project management tools
- Skill verification and certification programs
- Career development resources and analytics
- Secure escrow payment system

### For Clients
- Smart talent discovery with success prediction
- Multi-layer quality assurance
- Milestone-based project tracking
- Automated contract generation
- Team management capabilities

### For Platform
- Advanced review and reputation system
- 24/7 support ticket management
- Fraud detection and prevention
- Analytics and reporting dashboard

---

## Tech Stack

### Frontend
- Angular, TypeScript, HTML5, CSS3

### Backend
- Spring Boot, Java
- Spring Security / JWT, OAuth 2.0

### Database
- MySQL

### AI/ML
- TensorFlow, Scikit-learn, NLP libraries

### DevOps
- Docker, Kubernetes, CI/CD pipelines


## Architecture

The application follows a **client-server architecture** with a RESTful API backend (Spring Boot) consumed by an Angular SPA frontend. AI/ML services are integrated as microservices for smart matching and career analytics.

---

## Contributors

| Name | GitHub |
|------|--------|
| Raouaa GARA | [@raouaagara](https://github.com/raouaagara) |
| Amine Abdellah | [@amine52a](https://github.com/amine52a) |
| Soumaya Mchita | [@soumaya-afk](https://github.com/soumaya-afk) |
| Asma Ibrahim | [@asmaibr](https://github.com/asmaibr) |
| Sourour Alaimi | [@alaimi-sourour](https://github.com/alaimi-sourour) |
| Salma Haouari | [@salmahaouarii](https://github.com/salmahaouarii) |

## Academic Context

Developed at **Esprit School of Engineering – Tunisia**  
**PIDEV** – 4SAE7 | 2025–2026

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java 17+
- MySQL 8.0+
- Docker (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/raouaagara/Esprit-PIDEV-4SAE7-2026-Matchy.git
cd Esprit-PIDEV-4SAE7-2026-Matchy

# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
./mvnw spring-boot:run
```

### Environment Variables

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=matchy
DB_USER=your_user
DB_PASSWORD=your_password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

---

## Acknowledgments

- **Esprit School of Engineering** for the academic framework and support
- Mr. Alaa RAMI and Ms. Chahnez SARDOUK for their supervision
- All contributors and teammates

---

Built with ❤️ by the Matchy Team | Esprit School of Engineering | Academic Year 2025–2026

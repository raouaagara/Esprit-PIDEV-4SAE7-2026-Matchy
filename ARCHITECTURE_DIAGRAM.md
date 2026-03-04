# Matchy Platform - Microservices Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           Angular Frontend (Port 4200)                     │  │
│  │  - User Interface                                          │  │
│  │  - Authentication                                          │  │
│  │  - Project Management                                      │  │
│  │  - Dashboard & Analytics                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              │ HTTP Requests                      │
│                              ▼                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │         Spring Cloud Gateway (Port 8080)                   │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Routing & Load Balancing                           │  │  │
│  │  │  - /api/** → PI Service                             │  │  │
│  │  │  - /pi/** → PI Service (with rewrite)               │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Cross-Cutting Concerns                             │  │  │
│  │  │  - CORS Handling                                    │  │  │
│  │  │  - Request Logging                                  │  │  │
│  │  │  - Rate Limiting (Future)                           │  │  │
│  │  │  - JWT Validation (Future)                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              │ Service Discovery                  │
│                              ▼                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SERVICE DISCOVERY LAYER                        │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │      Netflix Eureka Server (Port 8761)                     │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Service Registry                                   │  │  │
│  │  │  - Service Registration                             │  │  │
│  │  │  - Health Monitoring                                │  │  │
│  │  │  - Service Discovery                                │  │  │
│  │  │  - Load Balancing Info                              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Registered Services:                               │  │  │
│  │  │  ✓ PI (Main Backend)                                │  │  │
│  │  │  ✓ API-GATEWAY                                      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              │ Service Lookup                     │
│                              ▼                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           PI Service (Port 9090)                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Controllers                                        │  │  │
│  │  │  - AuthController                                   │  │  │
│  │  │  - ProjectController                                │  │  │
│  │  │  - MilestoneController                              │  │  │
│  │  │  - ApplicationController                            │  │  │
│  │  │  - SubmissionController                             │  │  │
│  │  │  - ReviewController                                 │  │  │
│  │  │  - NotificationController                           │  │  │
│  │  │  - PaymentController                                │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Services                                           │  │  │
│  │  │  - Business Logic                                   │  │  │
│  │  │  - Data Validation                                  │  │  │
│  │  │  - Transaction Management                           │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Security                                           │  │  │
│  │  │  - JWT Authentication                               │  │  │
│  │  │  - Role-based Authorization                         │  │  │
│  │  │  - Password Encryption                              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              │ JPA/Hibernate                      │
│                              ▼                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           MySQL Database (Port 3306)                       │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Tables:                                            │  │  │
│  │  │  - users                                            │  │  │
│  │  │  - projects                                         │  │  │
│  │  │  - milestones                                       │  │  │
│  │  │  - applications                                     │  │  │
│  │  │  - submissions                                      │  │  │
│  │  │  - reviews                                          │  │  │
│  │  │  - notifications                                    │  │  │
│  │  │  - payments                                         │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Login Flow
```
User (Browser)
    │
    │ POST /api/auth/login
    ▼
Angular App (4200)
    │
    │ HTTP Request
    ▼
API Gateway (8080)
    │
    │ Route: /api/** → PI
    │ Query Eureka for PI instances
    ▼
Eureka Server (8761)
    │
    │ Returns: PI @ localhost:9090
    ▼
API Gateway
    │
    │ Forward request
    ▼
PI Service (9090)
    │
    ├─→ AuthController
    ├─→ UserService
    ├─→ JwtUtil (generate token)
    └─→ UserRepository
         │
         ▼
    MySQL Database
         │
         │ Return user data
         ▼
    Response with JWT token
         │
         ▼
    API Gateway
         │
         ▼
    Angular App
         │
         ▼
    User sees Dashboard
```

### 2. Browse Projects Flow
```
User clicks "Browse Projects"
    │
    ▼
Angular App
    │
    │ GET /api/projects/all?status=OPEN
    │ Headers: Authorization: Bearer <token>
    ▼
API Gateway
    │
    │ CORS Check ✓
    │ Route to PI Service
    ▼
PI Service
    │
    ├─→ ProjectController
    ├─→ ProjectService
    └─→ ProjectRepository
         │
         ▼
    MySQL Database
         │
         │ Return projects
         ▼
    JSON Response
         │
         ▼
    API Gateway
         │
         ▼
    Angular App
         │
         ▼
    Display Projects Grid
```

## Service Communication

```
┌──────────────┐
│   Gateway    │
└──────┬───────┘
       │
       │ 1. Query: "Where is PI?"
       ▼
┌──────────────┐
│    Eureka    │
└──────┬───────┘
       │
       │ 2. Response: "PI @ localhost:9090"
       ▼
┌──────────────┐
│   Gateway    │
└──────┬───────┘
       │
       │ 3. Forward request
       ▼
┌──────────────┐
│  PI Service  │
└──────────────┘
```

## Scalability Example

```
Current Setup (1 instance):
┌─────────┐
│ Gateway │
└────┬────┘
     │
     ▼
┌─────────┐
│ PI:9090 │
└─────────┘

Future Setup (3 instances):
┌─────────┐
│ Gateway │
└────┬────┘
     │
     ├─→ ┌─────────┐
     │   │ PI:9090 │
     │   └─────────┘
     │
     ├─→ ┌─────────┐
     │   │ PI:9091 │
     │   └─────────┘
     │
     └─→ ┌─────────┐
         │ PI:9092 │
         └─────────┘

Gateway automatically load balances!
```

## Port Summary

| Service | Port | Protocol | Purpose |
|---------|------|----------|---------|
| Angular | 4200 | HTTP | User Interface |
| Gateway | 8080 | HTTP | API Entry Point |
| Eureka | 8761 | HTTP | Service Registry |
| PI Service | 9090 | HTTP | Business Logic |
| MySQL | 3306 | TCP | Database |

## Technology Stack

### Frontend
- Angular 17
- TypeScript
- RxJS
- Angular Material

### API Gateway
- Spring Cloud Gateway
- Spring Boot 3.1.5
- Reactive WebFlux

### Service Discovery
- Netflix Eureka Server
- Spring Cloud Netflix

### Backend Service
- Spring Boot 3.1.5
- Spring Data JPA
- Spring Security
- JWT Authentication
- MySQL

## Benefits

✅ **Scalability**: Easy to add more service instances
✅ **Resilience**: Services can fail independently
✅ **Flexibility**: Easy to add new services
✅ **Monitoring**: Centralized service monitoring
✅ **Load Balancing**: Automatic request distribution
✅ **Service Discovery**: No hardcoded URLs
✅ **Single Entry Point**: Simplified client configuration
✅ **CORS Management**: Centralized CORS handling

## Future Enhancements

1. **Config Server**: Centralized configuration management
2. **Circuit Breaker**: Resilience4j for fault tolerance
3. **Distributed Tracing**: Zipkin/Sleuth for request tracking
4. **API Documentation**: Swagger/OpenAPI aggregation
5. **Rate Limiting**: Request throttling in gateway
6. **Caching**: Redis for distributed caching
7. **Message Queue**: RabbitMQ/Kafka for async communication
8. **Monitoring**: Prometheus + Grafana

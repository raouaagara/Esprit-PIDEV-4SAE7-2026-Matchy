# Matchy - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                             │
│                   http://localhost:4200                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  ANGULAR FRONTEND                            │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Components  │  │   Services   │  │    Models    │     │
│  │              │  │              │  │              │     │
│  │  - Projects  │  │  - Auth      │  │  - User      │     │
│  │  - Milestones│  │  - Project   │  │  - Project   │     │
│  │  - Login     │  │  - Milestone │  │  - Milestone │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         HTTP Interceptor (JWT Token)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API Calls
                            │ Authorization: Bearer {token}
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              SPRING BOOT BACKEND                             │
│                http://localhost:9090/api                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Security Layer                          │  │
│  │  - JWT Authentication                                │  │
│  │  - CORS Configuration                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Controllers  │  │  Services    │  │ Repositories │     │
│  │              │  │              │  │              │     │
│  │  - Auth      │  │  (Business   │  │  - User      │     │
│  │  - Project   │  │   Logic)     │  │  - Project   │     │
│  │  - Milestone │  │              │  │  - Milestone │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              JPA/Hibernate                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ JDBC
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL DATABASE                            │
│                   localhost:3306/PITASK                      │
│                                                              │
│  Tables:                                                     │
│  - users                                                     │
│  - projects                                                  │
│  - milestones                                                │
│  - applications                                              │
│  - reviews                                                   │
│  - submissions                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. Authentication Flow

```
User Login
    │
    ├─► Angular Login Component
    │       │
    │       ├─► AuthService.login()
    │       │       │
    │       │       └─► POST /api/auth/login
    │       │               │
    │       │               ▼
    │       │       Backend AuthController
    │       │               │
    │       │               ├─► Validate credentials
    │       │               ├─► Generate JWT token
    │       │               └─► Return token + user data
    │       │
    │       ├─► Store token in localStorage
    │       ├─► Update currentUser$ BehaviorSubject
    │       └─► Navigate to dashboard
    │
    └─► All subsequent requests include:
            Authorization: Bearer {token}
```

### 2. Project CRUD Flow

```
View Projects
    │
    ├─► Projects Component ngOnInit()
    │       │
    │       ├─► ProjectService.getCompanyProjects(userId)
    │       │       │
    │       │       ├─► HTTP Interceptor adds JWT token
    │       │       │
    │       │       └─► GET /api/projects/company/{id}
    │       │               │
    │       │               ▼
    │       │       Backend ProjectController
    │       │               │
    │       │               ├─► Verify JWT token
    │       │               ├─► Query database
    │       │               └─► Return projects array
    │       │
    │       ├─► Update component state
    │       └─► Render projects in table
    │
    └─► User can:
            - Search/Filter
            - Delete project
            - View details
```

## 📦 Data Models

### User Entity
```
User
├── id: Long
├── email: String
├── password: String (encrypted)
├── firstName: String
├── lastName: String
├── userType: FREELANCER | COMPANY
├── companyName: String (optional)
├── expertise: String (optional)
├── hourlyRate: Double (optional)
├── phone: String (optional)
├── address: String (optional)
└── isActive: Boolean
```

### Project Entity
```
Project
├── id: Long
├── title: String
├── description: String
├── totalBudget: Double
├── deadline: LocalDate
├── status: OPEN | IN_PROGRESS | COMPLETED | CANCELLED
├── company: User (ManyToOne)
├── createdAt: LocalDateTime
└── milestones: List<Milestone> (OneToMany)
```

### Milestone Entity
```
Milestone
├── id: Long
├── title: String
├── description: String
├── budget: Double
├── deadline: LocalDate
├── status: PENDING | IN_PROGRESS | COMPLETED | CANCELLED
└── project: Project (ManyToOne)
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Flow                             │
└─────────────────────────────────────────────────────────────┘

1. User Login
   └─► Backend validates credentials
       └─► Generate JWT token with user email
           └─► Return token to frontend

2. Frontend stores token
   └─► localStorage.setItem('token', token)

3. HTTP Interceptor
   └─► Intercepts all HTTP requests
       └─► Adds header: Authorization: Bearer {token}

4. Backend Security Filter
   └─► Validates JWT token
       └─► Extracts user email
           └─► Allows/Denies request

5. CORS Configuration
   └─► Allows requests from http://localhost:4200
       └─► Allows credentials
           └─► Allows all headers and methods
```

## 🎨 Frontend Architecture

```
matchy-angular/
│
├── src/
│   ├── app/
│   │   ├── frontoffice/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts       ← Authentication
│   │   │   │   ├── project.service.ts    ← Project CRUD
│   │   │   │   └── milestone.service.ts  ← Milestone CRUD
│   │   │   │
│   │   │   ├── models/
│   │   │   │   └── models.ts             ← TypeScript interfaces
│   │   │   │
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts   ← JWT injection
│   │   │   │
│   │   │   └── guards/
│   │   │       └── auth.guard.ts         ← Route protection
│   │   │
│   │   └── backoffice/
│   │       ├── projects/                 ← Projects management
│   │       ├── projects-milestones/      ← Projects with milestones
│   │       ├── dashboard/                ← Statistics
│   │       └── layout/
│   │           └── bo-login/             ← Login page
│   │
│   └── environments/
│       ├── environment.ts                ← Dev config (port 9090)
│       └── environment.prod.ts           ← Prod config
```

## 🔧 Backend Architecture

```
PI/
│
├── src/main/java/tn/esprit/pi/
│   │
│   ├── controller/
│   │   ├── AuthController.java           ← /api/auth/*
│   │   ├── ProjectController.java        ← /api/projects/*
│   │   └── MilestoneController.java      ← /api/milestones/*
│   │
│   ├── entity/
│   │   ├── User.java                     ← User model
│   │   ├── Project.java                  ← Project model
│   │   └── Milestone.java                ← Milestone model
│   │
│   ├── repository/
│   │   ├── UserRepository.java           ← User DB access
│   │   ├── ProjectRepository.java        ← Project DB access
│   │   └── MilestoneRepository.java      ← Milestone DB access
│   │
│   ├── dto/
│   │   ├── LoginRequest.java             ← Request DTOs
│   │   ├── RegisterRequest.java
│   │   └── AuthResponse.java             ← Response DTOs
│   │
│   ├── security/
│   │   └── JwtUtil.java                  ← JWT generation/validation
│   │
│   └── config/
│       ├── SecurityConfig.java           ← Security settings
│       └── CorsConfig.java               ← CORS settings
│
└── src/main/resources/
    └── application.properties            ← Configuration
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `POST /api/projects/create` - Create project
- `GET /api/projects/company/{id}` - Get company projects
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/update/{id}` - Update project
- `DELETE /api/projects/delete/{id}` - Delete project
- `GET /api/projects/{id}/milestones` - Get project milestones

### Milestones
- `POST /api/milestones/create` - Create milestone
- `GET /api/milestones/project/{id}` - Get project milestones
- `GET /api/milestones/available/{id}` - Get available milestones
- `GET /api/milestones/{id}` - Get milestone by ID
- `PUT /api/milestones/update/{id}` - Update milestone
- `DELETE /api/milestones/delete/{id}` - Delete milestone

## 🔄 State Management

```
┌─────────────────────────────────────────────────────────────┐
│              Angular State Management                        │
└─────────────────────────────────────────────────────────────┘

AuthService
    │
    ├── currentUserSubject: BehaviorSubject<AuthResponse | null>
    │       │
    │       ├── Emits user data on login
    │       ├── Emits null on logout
    │       └── Components subscribe to currentUser$
    │
    └── localStorage
            ├── token: JWT token
            └── currentUser: User data JSON

Components
    │
    ├── Subscribe to currentUser$
    ├── React to state changes
    └── Update UI automatically
```

## 🎯 Key Design Patterns

1. **Service Layer Pattern**
   - Services handle all API communication
   - Components focus on UI logic

2. **Observer Pattern**
   - BehaviorSubject for reactive state
   - Components subscribe to observables

3. **Interceptor Pattern**
   - HTTP interceptor for cross-cutting concerns
   - Automatic JWT token injection

4. **Repository Pattern**
   - Spring Data JPA repositories
   - Clean data access layer

5. **DTO Pattern**
   - Separate DTOs for requests/responses
   - Decoupled from entities

## 📊 Performance Considerations

- **Lazy Loading**: Modules loaded on demand
- **HTTP Caching**: Can be added for frequently accessed data
- **Database Indexing**: On foreign keys and search fields
- **Connection Pooling**: Spring Boot default configuration
- **Async Operations**: RxJS observables for non-blocking UI

## 🔒 Security Best Practices

✅ JWT tokens for stateless authentication
✅ Password encryption with BCrypt
✅ CORS properly configured
✅ SQL injection prevention (JPA/Hibernate)
✅ XSS protection (Angular sanitization)
✅ HTTPS ready (configure in production)

## 🚀 Scalability

The architecture supports:
- Horizontal scaling (multiple backend instances)
- Load balancing (add reverse proxy)
- Database replication (master-slave)
- Caching layer (Redis)
- CDN for static assets
- Microservices migration (if needed)

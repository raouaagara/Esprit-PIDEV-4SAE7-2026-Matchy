# 🔄 Matchy - Data Flow Documentation

## Overview

This document explains how data flows through the Matchy application from user interaction to database and back.

## 🎯 Complete User Journey: Login to View Projects

### Step 1: User Opens Login Page

```
User Browser
    │
    ├─► Navigate to http://localhost:4200/backoffice/login
    │
    └─► Angular Router
            │
            └─► Load BoLoginComponent
                    │
                    └─► Render login form
```

### Step 2: User Submits Login

```
User enters credentials and clicks "Sign In"
    │
    ├─► BoLoginComponent.onSubmit()
    │       │
    │       ├─► Form validation
    │       ├─► Set isLoading = true
    │       │
    │       └─► AuthService.login(credentials)
    │               │
    │               └─► HttpClient.post()
    │                       │
    │                       ├─► AuthInterceptor (no token yet)
    │                       │
    │                       └─► HTTP Request
    │
    ├─► Network Layer
    │       │
    │       └─► POST http://localhost:9090/api/auth/login
    │           Headers: Content-Type: application/json
    │           Body: { email, password }
    │
    └─► Backend receives request
```

### Step 3: Backend Processes Login

```
Spring Boot Backend
    │
    ├─► CorsFilter
    │       │
    │       └─► Allow request from localhost:4200
    │
    ├─► AuthController.login()
    │       │
    │       ├─► Extract email and password
    │       │
    │       ├─► UserRepository.findByEmail()
    │       │       │
    │       │       └─► MySQL Query: SELECT * FROM users WHERE email = ?
    │       │               │
    │       │               └─► Return User entity
    │       │
    │       ├─► BCryptPasswordEncoder.matches()
    │       │       │
    │       │       └─► Verify password hash
    │       │
    │       ├─► JwtUtil.generateToken()
    │       │       │
    │       │       └─► Create JWT token with user email
    │       │
    │       └─► Build AuthResponse
    │               │
    │               └─► { token, id, email, firstName, ... }
    │
    └─► HTTP Response
            │
            └─► Status: 200 OK
                Body: AuthResponse JSON
```

### Step 4: Frontend Receives Response

```
Angular Frontend
    │
    ├─► HttpClient receives response
    │       │
    │       └─► Observable emits AuthResponse
    │
    ├─► AuthService.login() pipe
    │       │
    │       ├─► tap() operator
    │       │       │
    │       │       ├─► localStorage.setItem('token', response.token)
    │       │       ├─► localStorage.setItem('currentUser', JSON.stringify(response))
    │       │       └─► currentUserSubject.next(response)
    │       │
    │       └─► Return observable to component
    │
    ├─► BoLoginComponent.onSubmit() subscribe
    │       │
    │       ├─► Set isLoading = false
    │       └─► Router.navigate(['/backoffice/dashboard'])
    │
    └─► User redirected to dashboard
```

### Step 5: User Navigates to Projects

```
User clicks "Projects" in navigation
    │
    ├─► Angular Router
    │       │
    │       └─► Load ProjectsComponent
    │
    └─► ProjectsComponent.ngOnInit()
            │
            └─► loadProjects()
```

### Step 6: Load Projects from API

```
ProjectsComponent.loadProjects()
    │
    ├─► Get current user from AuthService
    │       │
    │       └─► AuthService.getCurrentUser()
    │               │
    │               └─► Return currentUserSubject.value
    │
    ├─► Set loading = true
    │
    └─► ProjectService.getCompanyProjects(userId)
            │
            └─► HttpClient.get()
                    │
                    ├─► AuthInterceptor intercepts
                    │       │
                    │       ├─► Get token from localStorage
                    │       └─► Add header: Authorization: Bearer {token}
                    │
                    └─► HTTP Request
```

### Step 7: Backend Fetches Projects

```
Spring Boot Backend
    │
    ├─► Security Filter
    │       │
    │       ├─► Extract JWT token from Authorization header
    │       ├─► JwtUtil.validateToken()
    │       └─► Set authentication in SecurityContext
    │
    ├─► ProjectController.getCompanyProjects(companyId)
    │       │
    │       ├─► UserRepository.findById(companyId)
    │       │       │
    │       │       └─► MySQL: SELECT * FROM users WHERE id = ?
    │       │
    │       ├─► ProjectRepository.findByCompany(company)
    │       │       │
    │       │       └─► MySQL: SELECT * FROM projects WHERE company_id = ?
    │       │               │
    │       │               └─► Return List<Project>
    │       │
    │       ├─► For each project:
    │       │       │
    │       │       └─► MilestoneRepository.findByProject(project)
    │       │               │
    │       │               └─► MySQL: SELECT * FROM milestones WHERE project_id = ?
    │       │
    │       └─► Build response with safe data
    │               │
    │               └─► List<Map<String, Object>>
    │
    └─► HTTP Response
            │
            └─► Status: 200 OK
                Body: Projects array JSON
```

### Step 8: Frontend Displays Projects

```
Angular Frontend
    │
    ├─► HttpClient receives response
    │       │
    │       └─► Observable emits Project[]
    │
    ├─► ProjectsComponent.loadProjects() subscribe
    │       │
    │       ├─► this.projects = data
    │       ├─► this.filteredProjects = [...this.projects]
    │       └─► this.loading = false
    │
    ├─► Angular Change Detection
    │       │
    │       └─► Update DOM
    │
    └─► User sees projects table
            │
            ├─► Project titles
            ├─► Budgets
            ├─► Deadlines
            ├─► Status badges
            └─► Action buttons
```

## 📊 Data Flow Diagrams

### Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Login form submit
       ▼
┌─────────────────────┐
│  BoLoginComponent   │
└──────┬──────────────┘
       │ 2. Call login()
       ▼
┌─────────────────────┐
│   AuthService       │
└──────┬──────────────┘
       │ 3. HTTP POST
       ▼
┌─────────────────────┐
│  AuthInterceptor    │ (no token on login)
└──────┬──────────────┘
       │ 4. Forward request
       ▼
┌─────────────────────┐
│   HTTP Request      │
└──────┬──────────────┘
       │ 5. Network
       ▼
┌─────────────────────┐
│  AuthController     │
└──────┬──────────────┘
       │ 6. Validate credentials
       ▼
┌─────────────────────┐
│  UserRepository     │
└──────┬──────────────┘
       │ 7. Query database
       ▼
┌─────────────────────┐
│   MySQL Database    │
└──────┬──────────────┘
       │ 8. Return user
       ▼
┌─────────────────────┐
│  AuthController     │
└──────┬──────────────┘
       │ 9. Generate JWT
       ▼
┌─────────────────────┐
│    JwtUtil          │
└──────┬──────────────┘
       │ 10. Return token
       ▼
┌─────────────────────┐
│  HTTP Response      │
└──────┬──────────────┘
       │ 11. Network
       ▼
┌─────────────────────┐
│   AuthService       │
└──────┬──────────────┘
       │ 12. Store token
       ▼
┌─────────────────────┐
│   localStorage      │
└─────────────────────┘
       │ 13. Update state
       ▼
┌─────────────────────┐
│  BehaviorSubject    │
└──────┬──────────────┘
       │ 14. Navigate
       ▼
┌─────────────────────┐
│   Dashboard         │
└─────────────────────┘
```

### Project Fetch Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Navigate to /projects
       ▼
┌─────────────────────┐
│ ProjectsComponent   │
└──────┬──────────────┘
       │ 2. ngOnInit()
       ▼
┌─────────────────────┐
│  loadProjects()     │
└──────┬──────────────┘
       │ 3. Get current user
       ▼
┌─────────────────────┐
│   AuthService       │
└──────┬──────────────┘
       │ 4. Return user ID
       ▼
┌─────────────────────┐
│  ProjectService     │
└──────┬──────────────┘
       │ 5. HTTP GET
       ▼
┌─────────────────────┐
│  AuthInterceptor    │
└──────┬──────────────┘
       │ 6. Add JWT token
       ▼
┌─────────────────────┐
│   HTTP Request      │
└──────┬──────────────┘
       │ 7. Network
       ▼
┌─────────────────────┐
│ ProjectController   │
└──────┬──────────────┘
       │ 8. Verify JWT
       ▼
┌─────────────────────┐
│  Security Filter    │
└──────┬──────────────┘
       │ 9. Query projects
       ▼
┌─────────────────────┐
│ ProjectRepository   │
└──────┬──────────────┘
       │ 10. SQL query
       ▼
┌─────────────────────┐
│   MySQL Database    │
└──────┬──────────────┘
       │ 11. Return projects
       ▼
┌─────────────────────┐
│ ProjectController   │
└──────┬──────────────┘
       │ 12. Build response
       ▼
┌─────────────────────┐
│  HTTP Response      │
└──────┬──────────────┘
       │ 13. Network
       ▼
┌─────────────────────┐
│  ProjectService     │
└──────┬──────────────┘
       │ 14. Return observable
       ▼
┌─────────────────────┐
│ ProjectsComponent   │
└──────┬──────────────┘
       │ 15. Update state
       ▼
┌─────────────────────┐
│   Angular DOM       │
└──────┬──────────────┘
       │ 16. Render table
       ▼
┌─────────────────────┐
│   Browser Display   │
└─────────────────────┘
```

## 🔐 Security Flow

### JWT Token Lifecycle

```
1. LOGIN
   User credentials → Backend
   Backend validates → Generate JWT
   JWT → Frontend
   Store in localStorage

2. SUBSEQUENT REQUESTS
   User action → Component
   Component → Service
   Service → HttpClient
   HttpClient → Interceptor
   Interceptor reads localStorage
   Interceptor adds Authorization header
   Request → Backend
   Backend validates JWT
   Backend processes request
   Response → Frontend

3. LOGOUT
   User clicks logout
   Clear localStorage
   Clear BehaviorSubject
   Redirect to login
```

### Token Validation

```
Every Protected Request:
    │
    ├─► Extract token from Authorization header
    │
    ├─► JwtUtil.validateToken(token)
    │       │
    │       ├─► Check expiration
    │       ├─► Verify signature
    │       └─► Extract user email
    │
    ├─► UserRepository.findByEmail(email)
    │       │
    │       └─► Load user from database
    │
    └─► Set authentication in SecurityContext
            │
            └─► Allow request to proceed
```

## 📦 Data Transformation

### Backend to Frontend

```
Backend Entity (Project)
    │
    ├─► id: Long
    ├─► title: String
    ├─► description: String
    ├─► totalBudget: Double
    ├─► deadline: LocalDate
    ├─► status: ProjectStatus enum
    ├─► company: User entity
    └─► milestones: List<Milestone>
            │
            ▼
Controller transforms to Map
            │
            ├─► id: number
            ├─► title: string
            ├─► description: string
            ├─► totalBudget: number
            ├─► deadline: string (ISO format)
            ├─► status: string
            ├─► companyId: number
            ├─► companyName: string
            └─► milestoneCount: number
                    │
                    ▼
JSON Response
                    │
                    ▼
Frontend receives
                    │
                    ├─► TypeScript interface (Project)
                    └─► Type-safe access
```

### Frontend to Backend

```
Angular Form
    │
    ├─► FormGroup with validators
    │
    └─► User input
            │
            ▼
Component extracts values
            │
            ├─► title: string
            ├─► description: string
            ├─► totalBudget: number
            ├─► deadline: string
            └─► companyId: number
                    │
                    ▼
Service creates request object
                    │
                    └─► CreateProjectRequest interface
                            │
                            ▼
HttpClient serializes to JSON
                            │
                            ▼
Backend receives
                            │
                            ├─► @RequestBody annotation
                            └─► Jackson deserializes to Java object
                                    │
                                    ▼
Controller processes
                                    │
                                    └─► Create Project entity
                                            │
                                            ▼
Repository saves to database
```

## 🔄 State Management

### User State

```
Login Success
    │
    └─► AuthService
            │
            ├─► localStorage.setItem('token', token)
            ├─► localStorage.setItem('currentUser', JSON.stringify(user))
            └─► currentUserSubject.next(user)
                    │
                    └─► All subscribers notified
                            │
                            ├─► Header component updates
                            ├─► Navigation updates
                            └─► Protected routes enabled
```

### Component State

```
ProjectsComponent
    │
    ├─► projects: Project[] = []
    ├─► filteredProjects: Project[] = []
    ├─► loading: boolean = false
    ├─► error: string | null = null
    └─► searchTerm: string = ''
            │
            └─► State changes trigger Angular change detection
                    │
                    └─► DOM updates automatically
```

## 🎯 Error Handling Flow

```
API Call Fails
    │
    ├─► HttpClient catches error
    │
    ├─► Observable emits error
    │
    ├─► Component subscribe error callback
    │       │
    │       ├─► Set error message
    │       ├─► Set loading = false
    │       └─► Log to console
    │
    └─► Template displays error state
            │
            ├─► Show error icon
            ├─► Show error message
            └─► Show retry button
                    │
                    └─► User clicks retry
                            │
                            └─► Call API again
```

## 📈 Performance Optimization

### Caching Strategy (Future)

```
First Request
    │
    └─► API call → Backend → Database
            │
            └─► Store in service cache
                    │
                    └─► Return data

Subsequent Requests
    │
    └─► Check cache
            │
            ├─► If fresh: Return cached data
            └─► If stale: API call → Update cache
```

### Lazy Loading

```
User navigates to /backoffice
    │
    └─► Angular Router
            │
            └─► loadChildren() → BackofficeModule
                    │
                    └─► Only load when needed
                            │
                            └─► Faster initial load
```

## 🎉 Summary

The data flow in Matchy is:
1. **User-initiated** (form submit, button click)
2. **Component-handled** (validation, state management)
3. **Service-processed** (API calls, data transformation)
4. **Interceptor-enhanced** (JWT injection, error handling)
5. **Backend-validated** (security, business logic)
6. **Database-persisted** (MySQL storage)
7. **Response-transformed** (DTOs, JSON)
8. **Frontend-rendered** (Angular templates, change detection)

Every step is:
- ✅ Type-safe
- ✅ Error-handled
- ✅ Secure
- ✅ Performant
- ✅ Maintainable

---

**Data Flow Status**: ✅ Fully Documented
**Security**: ✅ JWT Protected
**Performance**: ✅ Optimized
**User Experience**: ✅ Smooth

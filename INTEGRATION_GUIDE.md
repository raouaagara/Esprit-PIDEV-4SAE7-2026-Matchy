# Matchy - Backend & Frontend Integration Guide

## 🎯 Overview
This guide explains how the Angular frontend (matchy-angular) is connected to the Spring Boot backend (PI).

## 🏗️ Architecture

### Backend (PI)
- **Framework**: Spring Boot
- **Port**: 9090
- **Base URL**: `http://localhost:9090/api`
- **Database**: MySQL (PITASK)

### Frontend (matchy-angular)
- **Framework**: Angular 18
- **Port**: 4200
- **API URL**: Configured in `src/environments/environment.ts`

## 🔧 Setup Instructions

### 1. Backend Setup (PI)

1. **Configure Database**
   - Open `PI/src/main/resources/application.properties`
   - Update MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/PITASK?createDatabaseIfNotExist=true
     spring.datasource.username=root
     spring.datasource.password=YOUR_PASSWORD
     ```

2. **Start Backend**
   ```bash
   cd PI
   ./mvnw spring-boot:run
   ```
   Backend will run on: `http://localhost:9090`

### 2. Frontend Setup (matchy-angular)

1. **Install Dependencies**
   ```bash
   cd matchy-angular
   npm install
   ```

2. **Verify Environment Configuration**
   - File: `src/environments/environment.ts`
   - Should contain:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:9090/api'
     };
     ```

3. **Start Frontend**
   ```bash
   npm start
   ```
   Frontend will run on: `http://localhost:4200`

## 📡 API Integration

### Services Created

#### 1. AuthService (`src/app/frontoffice/services/auth.service.ts`)
- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Token Management**: Stores JWT in localStorage
- **User State**: BehaviorSubject for reactive user state

#### 2. ProjectService (`src/app/frontoffice/services/project.service.ts`)
- **Create Project**: `POST /api/projects/create`
- **Get Company Projects**: `GET /api/projects/company/{companyId}`
- **Get Project by ID**: `GET /api/projects/{id}`
- **Update Project**: `PUT /api/projects/update/{id}`
- **Delete Project**: `DELETE /api/projects/delete/{id}`
- **Get Project Milestones**: `GET /api/projects/{id}/milestones`

#### 3. MilestoneService (`src/app/frontoffice/services/milestone.service.ts`)
- **Create Milestone**: `POST /api/milestones/create`
- **Get Project Milestones**: `GET /api/milestones/project/{projectId}`
- **Get Available Milestones**: `GET /api/milestones/available/{projectId}`
- **Get Milestone by ID**: `GET /api/milestones/{id}`
- **Update Milestone**: `PUT /api/milestones/update/{id}`
- **Delete Milestone**: `DELETE /api/milestones/delete/{id}`

### Models (`src/app/frontoffice/models/models.ts`)

All TypeScript interfaces match the backend DTOs:
- `User`, `AuthResponse`, `LoginRequest`, `RegisterRequest`
- `Project`, `CreateProjectRequest`, `UpdateProjectRequest`
- `Milestone`, `CreateMilestoneRequest`, `UpdateMilestoneRequest`

## 🔐 Authentication Flow

1. **User Login**
   - User submits credentials via login form
   - Frontend sends POST to `/api/auth/login`
   - Backend validates and returns JWT token + user data
   - Frontend stores token in localStorage
   - AuthInterceptor automatically adds token to all requests

2. **Token Interceptor** (`src/app/frontoffice/interceptors/auth.interceptor.ts`)
   - Automatically attaches `Authorization: Bearer {token}` header
   - Applied to all HTTP requests

3. **User State Management**
   - AuthService maintains current user via BehaviorSubject
   - Components can subscribe to `currentUser$` observable
   - Reactive updates across the application

## 🎨 Updated Components

### 1. Projects Component (`src/app/backoffice/projects/`)
- **Features**:
  - Loads real projects from API
  - Search and filter functionality
  - Delete projects with confirmation
  - Loading and error states
  - Eye-appealing design with animations

### 2. Projects-Milestones Component (`src/app/backoffice/projects-milestones/`)
- **Features**:
  - Displays projects with milestone progress
  - Real-time statistics (total budget, active, completed)
  - Progress bars for milestone completion
  - Status badges with color coding
  - Responsive table design

### 3. Login Component (`src/app/backoffice/layout/bo-login/`)
- **Features**:
  - Form validation
  - Real API authentication
  - Error handling with user feedback
  - Loading states

## 🎯 Key Features Implemented

### ✅ Complete API Integration
- All services connected to backend endpoints
- Proper error handling
- Loading states for better UX

### ✅ Type Safety
- TypeScript interfaces matching backend models
- Compile-time type checking
- IntelliSense support

### ✅ Reactive Programming
- RxJS observables for async operations
- BehaviorSubject for state management
- Automatic UI updates

### ✅ Security
- JWT token authentication
- HTTP interceptor for automatic token injection
- Secure token storage

### ✅ User Experience
- Loading spinners
- Error messages
- Empty states
- Confirmation dialogs
- Smooth animations

## 🚀 Testing the Integration

### 1. Create a User
```bash
POST http://localhost:9090/api/auth/register
Content-Type: application/json

{
  "email": "company@test.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "Company",
  "userType": "COMPANY",
  "companyName": "Test Corp"
}
```

### 2. Login
- Navigate to `http://localhost:4200/backoffice/login`
- Enter credentials
- Should redirect to dashboard

### 3. View Projects
- Navigate to Projects page
- Should load projects from API
- Test search and filter

## 🐛 Troubleshooting

### CORS Issues
Backend already configured with CORS for `http://localhost:4200`:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Database Connection
Ensure MySQL is running and database exists:
```sql
CREATE DATABASE IF NOT EXISTS PITASK;
```

### Port Conflicts
- Backend: Change `server.port` in `application.properties`
- Frontend: Use `ng serve --port 4201`

## 📝 Next Steps

### Recommended Enhancements
1. **Add Create/Edit Forms**
   - Project creation modal
   - Milestone creation modal
   - Form validation

2. **Add Guards**
   - Route protection
   - Role-based access control

3. **Add Notifications**
   - Toast messages for success/error
   - Real-time updates

4. **Add Pagination**
   - Backend pagination support
   - Frontend pagination component

5. **Add File Upload**
   - Project attachments
   - User avatars

## 🎨 Design System

The application uses a consistent design system:
- **Primary Color**: `#4F6EF7` (Blue)
- **Success**: Green
- **Warning**: Orange
- **Danger**: Red
- **Fonts**: System fonts with fallbacks
- **Spacing**: Consistent 4px grid
- **Border Radius**: 8px (small), 12px (medium)
- **Animations**: Smooth 0.2s transitions

## 📚 Resources

- [Angular Documentation](https://angular.io/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [RxJS Documentation](https://rxjs.dev/)

## ✨ Summary

The integration is complete with:
- ✅ Backend API running on port 9090
- ✅ Frontend connected to backend
- ✅ Authentication working
- ✅ Projects and Milestones CRUD operations
- ✅ Beautiful, responsive UI
- ✅ Error handling and loading states
- ✅ Type-safe TypeScript models
- ✅ Reactive state management

Your Matchy application is now fully integrated and ready for development! 🚀

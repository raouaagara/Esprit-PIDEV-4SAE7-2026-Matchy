# Registration Feature - Implementation Guide

## Overview
Complete event registration system with admin approval workflow for the Matchy platform.

## Features Implemented

### Backend (Spring Boot)

#### 1. Entities
- **User** (`User.java`)
  - Fields: id, firstName, lastName, email, password, role (USER/ADMIN)
  - One-to-many relationship with Registration

- **Registration** (`Registration.java`)
  - Fields: id, firstName, lastName, email, user, evenement, status, createdAt, updatedAt
  - Status: PENDING, APPROVED, REJECTED
  - Many-to-one relationships with User and Evenement

- **Evenement** (Updated)
  - Added one-to-many relationship with Registration
  - Tracks currentParticipants count

#### 2. DTOs
- `RegistrationCreateDTO` - For creating new registrations
- `RegistrationDTO` - For API responses
- `UserDTO` - For user data transfer

#### 3. Repositories
- `RegistrationRepository` - Custom queries for filtering by status, event, user
- `UserRepository` - User management queries

#### 4. Services
- `RegistrationService` - Business logic for registration management
  - Create registration (with duplicate check)
  - Approve/Reject registration
  - Update event participant counter automatically
  - Capacity validation

#### 5. REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registrations` | Create new registration |
| GET | `/api/registrations` | Get all registrations |
| GET | `/api/registrations/{id}` | Get registration by ID |
| GET | `/api/registrations/evenement/{id}` | Get registrations for event |
| GET | `/api/registrations/user/{id}` | Get user's registrations |
| GET | `/api/registrations/status/{status}` | Filter by status |
| PUT | `/api/registrations/{id}/approve` | Approve registration |
| PUT | `/api/registrations/{id}/reject` | Reject registration |
| DELETE | `/api/registrations/{id}` | Delete registration |
| GET | `/api/registrations/evenement/{id}/approved-count` | Get approved count |

### Frontend (Angular)

#### 1. Models
- `registration.model.ts` - Registration interfaces and enums
- `user.model.ts` - User interfaces and enums

#### 2. Services
- `RegistrationService` - HTTP client for registration API
- `UserService` - HTTP client for user API

#### 3. Components

**User Side:**
- `RegistrationModalComponent` - Registration form modal
  - Reactive form with validation
  - Success/error messaging
  - Auto-close after successful submission

**Admin Side:**
- `RegistrationsComponent` - Admin dashboard for managing registrations
  - Filter tabs (All, Pending, Approved, Rejected)
  - Approve/Reject buttons
  - Real-time counter updates
  - User information display

#### 4. Integration
- Updated `EventsComponent` to open registration modal on "Join" button click
- Added registration route to backoffice routing
- Added "Registrations" menu item to admin sidebar

## User Flow

### 1. User Registration Flow
```
User clicks "Join" on event
  ↓
Registration modal opens
  ↓
User fills form (firstName, lastName, email)
  ↓
Form validation
  ↓
Submit to backend (status = PENDING)
  ↓
Success message displayed
  ↓
Modal closes after 2 seconds
```

### 2. Admin Approval Flow
```
Admin navigates to Registrations page
  ↓
Views pending registrations (notification badge)
  ↓
Reviews user details
  ↓
Clicks "Approve" or "Reject"
  ↓
Backend updates status
  ↓
If approved: currentParticipants counter increases
  ↓
Frontend refreshes list
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Registrations Table
```sql
CREATE TABLE registrations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_id BIGINT NOT NULL,
  evenement_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (evenement_id) REFERENCES evenements(id)
);
```

## Setup Instructions

### 1. Backend Setup

1. Start MySQL (XAMPP on port 3307)
2. Database will be auto-created by Spring Boot
3. Run the backend:
```bash
cd backend
mvn spring-boot:run
```

4. (Optional) Insert sample data:
```bash
# Connect to MySQL and run:
source backend/insert_sample_users.sql
```

### 2. Frontend Setup

1. Install dependencies (if not already done):
```bash
npm install
```

2. Start the Angular dev server:
```bash
npm start
```

3. Access the application:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8081/api

## Testing the Feature

### Test User Registration

1. Navigate to Events page: http://localhost:4200/events
2. Click "Join" on any event
3. Fill in the registration form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
4. Submit the form
5. Verify success message appears

### Test Admin Approval

1. Navigate to admin registrations: http://localhost:4200/backoffice/registrations
2. You should see the pending registration
3. Click "Approve" button
4. Verify:
   - Status changes to APPROVED
   - Event's participant counter increases
   - Registration moves to "Approved" tab

### API Testing with cURL

**Create Registration:**
```bash
curl -X POST http://localhost:8081/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userId": 1,
    "evenementId": 1
  }'
```

**Get All Registrations:**
```bash
curl http://localhost:8081/api/registrations
```

**Approve Registration:**
```bash
curl -X PUT http://localhost:8081/api/registrations/1/approve
```

**Get Pending Registrations:**
```bash
curl http://localhost:8081/api/registrations/status/PENDING
```

## Business Logic

### Validation Rules

1. **Duplicate Prevention**: User cannot register for the same event twice
2. **Capacity Check**: Cannot approve if event is at max capacity
3. **Email Validation**: Email must be valid format
4. **Required Fields**: firstName, lastName, email are mandatory

### Counter Management

- `currentParticipants` increases when registration is APPROVED
- `currentParticipants` decreases when:
  - APPROVED registration is REJECTED
  - APPROVED registration is DELETED
- Counter never goes below 0

### Status Transitions

```
PENDING → APPROVED ✓
PENDING → REJECTED ✓
APPROVED → REJECTED ✓
REJECTED → APPROVED ✗ (must create new registration)
```

## Styling

### User Modal
- Dark theme matching frontoffice design
- Smooth animations (fadeIn, slideUp)
- Form validation with error messages
- Success/error alerts

### Admin Dashboard
- Light theme matching backoffice design
- Color-coded status badges:
  - PENDING: Orange (#ffa502)
  - APPROVED: Green (#2ed573)
  - REJECTED: Red (#ff4757)
- Filter tabs with counters
- Hover effects on table rows

## Future Enhancements

1. **Email Notifications**
   - Send email when registration is approved/rejected
   - Reminder emails before event

2. **Real-time Updates**
   - WebSocket integration for live notifications
   - Auto-refresh admin dashboard

3. **User Dashboard**
   - View my registrations
   - Cancel registration
   - Registration history

4. **Advanced Features**
   - Waiting list when event is full
   - QR code for event check-in
   - Certificate generation after event

5. **Analytics**
   - Registration trends
   - Popular events
   - Conversion rates

## Troubleshooting

### Issue: Registration not appearing in admin dashboard
- Check backend console for errors
- Verify database connection
- Check if registration was created: `GET /api/registrations`

### Issue: Participant counter not updating
- Verify registration status is APPROVED
- Check backend logs for service errors
- Refresh the events page

### Issue: Modal not opening
- Check browser console for errors
- Verify RegistrationModalComponent is declared in module
- Check if event ID is being passed correctly

## File Structure

```
backend/
├── src/main/java/com/matchy/
│   ├── entity/
│   │   ├── User.java
│   │   ├── Registration.java
│   │   ├── RegistrationStatus.java
│   │   └── UserRole.java
│   ├── dto/
│   │   ├── RegistrationDTO.java
│   │   ├── RegistrationCreateDTO.java
│   │   └── UserDTO.java
│   ├── repository/
│   │   ├── RegistrationRepository.java
│   │   └── UserRepository.java
│   ├── service/
│   │   ├── RegistrationService.java
│   │   └── impl/RegistrationServiceImpl.java
│   └── controller/
│       ├── RegistrationController.java
│       └── UserController.java
└── insert_sample_users.sql

frontend/
├── src/app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── registration.model.ts
│   │   │   └── user.model.ts
│   │   └── services/
│   │       ├── registration.service.ts
│   │       └── user.service.ts
│   ├── frontoffice/
│   │   └── events/
│   │       └── registration-modal/
│   │           ├── registration-modal.component.ts
│   │           ├── registration-modal.component.html
│   │           └── registration-modal.component.scss
│   └── backoffice/
│       └── registrations/
│           ├── registrations.component.ts
│           ├── registrations.component.html
│           └── registrations.component.scss
```

## Summary

The registration feature is now fully implemented with:
- ✅ Complete backend API with validation
- ✅ User registration modal with form validation
- ✅ Admin dashboard for approval workflow
- ✅ Automatic participant counter updates
- ✅ Status-based filtering
- ✅ Duplicate prevention
- ✅ Capacity management
- ✅ Clean UI/UX matching existing design

The system is ready for testing and can be extended with additional features as needed.

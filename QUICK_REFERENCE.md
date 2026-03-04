# Quick Reference Guide - Matchy Freelance Platform

## URLs

### Frontoffice (Freelancers)
- Home: `http://localhost:4200/`
- Browse Projects: `http://localhost:4200/projects`
- Project Details: `http://localhost:4200/projects/{id}`
- My Projects: `http://localhost:4200/projects-milestones`
- Profile Settings: `http://localhost:4200/profile-settings`

### Backoffice (Companies)
- Login: `http://localhost:4200/backoffice/login`
- Dashboard: `http://localhost:4200/backoffice/dashboard`
- Projects: `http://localhost:4200/backoffice/projects`
- Project Details: `http://localhost:4200/backoffice/projects/{id}`
- Users: `http://localhost:4200/backoffice/users`

## API Endpoints

### Projects
```
GET    /api/projects/open              - Get all open projects
GET    /api/projects/company/{id}      - Get company's projects
GET    /api/projects/{id}              - Get project by ID
POST   /api/projects/create            - Create new project
PUT    /api/projects/update/{id}       - Update project
DELETE /api/projects/delete/{id}       - Delete project
```

### Milestones
```
GET    /api/milestones/project/{id}    - Get project milestones
GET    /api/milestones/available/{id}  - Get available milestones
GET    /api/milestones/{id}            - Get milestone by ID
POST   /api/milestones/create          - Create milestone
PUT    /api/milestones/update/{id}     - Update milestone
DELETE /api/milestones/delete/{id}     - Delete milestone
```

### Applications
```
POST   /api/applications/apply                      - Apply to milestone
GET    /api/applications/freelancer/{id}            - Get freelancer applications
GET    /api/applications/company/{id}               - Get company applications
GET    /api/applications/milestone/{id}             - Get milestone applications
PUT    /api/applications/{id}/schedule-interview    - Schedule interview
PUT    /api/applications/{id}/confirm-interview     - Confirm interview
PUT    /api/applications/{id}/final-decision        - Accept/Reject
```

### Submissions
```
POST   /api/submissions/submit              - Submit work
GET    /api/submissions/freelancer/{id}     - Get freelancer submissions
GET    /api/submissions/company/{id}        - Get company submissions
GET    /api/submissions/milestone/{id}      - Get milestone submissions
```

### Reviews
```
POST   /api/reviews/create                  - Create review
GET    /api/reviews/submission/{id}         - Get review by submission
```

### Notifications
```
GET    /api/notifications/user/{id}                - Get all notifications
GET    /api/notifications/user/{id}/unread         - Get unread notifications
GET    /api/notifications/user/{id}/unread-count   - Get unread count
PUT    /api/notifications/{id}/read                - Mark as read
PUT    /api/notifications/user/{id}/read-all       - Mark all as read
```

## Status Values

### Project Status
- `OPEN` - Accepting applications
- `IN_PROGRESS` - Work in progress
- `COMPLETED` - All work done
- `CANCELLED` - Project cancelled

### Milestone Status
- `PENDING` - Available for applications
- `IN_PROGRESS` - Assigned and being worked on
- `COMPLETED` - Work submitted
- `PAID` - Reviewed and paid

### Application Status
- `PENDING` - Waiting for company review
- `INTERVIEW_SCHEDULED` - Interview scheduled
- `INTERVIEW_CONFIRMED` - Freelancer confirmed
- `ACCEPTED` - Application accepted
- `REJECTED` - Application rejected

### Submission Status
- `SUBMITTED` - Work submitted
- `UNDER_REVIEW` - Being reviewed
- `APPROVED` - Approved and paid
- `REJECTED` - Needs revision

### Review Status
- `PENDING` - Not reviewed yet
- `APPROVED` - Work approved
- `REJECTED` - Revision requested

## User Types

### FREELANCER
- Can browse projects
- Can apply to milestones
- Can submit work
- Receives notifications

### COMPANY
- Can create projects
- Can add milestones
- Can review applications
- Can schedule interviews
- Can review submissions
- Receives notifications

## Common Tasks

### As a Freelancer:

**Apply to a Milestone**
1. Go to Browse Projects
2. Click on a project
3. Find a PENDING milestone
4. Click "Apply to this Milestone"
5. Fill cover letter and budget
6. Submit

**Submit Work**
1. Go to My Projects
2. Find assigned milestone
3. Click "Submit Work"
4. Fill title, description, attachment
5. Submit

### As a Company:

**Create Project with Milestones**
1. Go to Projects
2. Click "+ New Project"
3. Fill project details
4. Click "Create"
5. Click "View" on project
6. Click "+ Add Milestone"
7. Fill milestone details
8. Click "Create"

**Review Application**
1. Go to Projects
2. Click "View" on project
3. Click "Applications" on milestone
4. Review cover letter and budget
5. Click "Schedule Interview" or "Accept"/"Reject"

**Review Submission**
1. Go to Projects
2. Click "View" on project
3. Click "Submissions" on milestone
4. Review work
5. Click "Review Work"
6. Rate and approve/reject

## Database Tables

### Main Tables
- `users` - All users (freelancers and companies)
- `projects` - All projects
- `milestones` - Project milestones
- `applications` - Freelancer applications
- `submissions` - Work submissions
- `reviews` - Submission reviews
- `notifications` - User notifications

## Environment Variables

### Backend (application.properties)
```properties
server.port=9090
spring.datasource.url=jdbc:mysql://localhost:3306/PITASK
spring.datasource.username=root
spring.datasource.password=your_password
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/api'
};
```

## Common Issues & Solutions

### Backend won't start
- Check MySQL is running
- Verify database credentials
- Run: `./mvnw clean install -DskipTests`

### Frontend won't compile
- Delete `node_modules`
- Run: `npm install`
- Run: `npm start`

### CORS errors
- Verify `@CrossOrigin(origins = "http://localhost:4200")` in controllers
- Check frontend is running on port 4200
- Check backend is running on port 9090

### 401 Unauthorized
- Check JWT token is valid
- Verify token is in localStorage
- Try logging in again

### Application not submitting
- Check freelancer is logged in
- Verify milestone status is PENDING
- Check all required fields are filled
- Check backend logs for errors

## Testing Credentials

### Create Test Users:

**Company User**
```json
{
  "email": "company@test.com",
  "password": "password123",
  "firstName": "Tech",
  "lastName": "Company",
  "userType": "COMPANY",
  "companyName": "Tech Solutions Inc"
}
```

**Freelancer User**
```json
{
  "email": "freelancer@test.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Developer",
  "userType": "FREELANCER",
  "expertise": "Full Stack Development",
  "hourlyRate": 50
}
```

## Notification Types

- `APPLICATION_RECEIVED` - Company notified when freelancer applies
- `APPLICATION_ACCEPTED` - Freelancer notified when accepted
- `APPLICATION_REJECTED` - Freelancer notified when rejected
- `INTERVIEW_SCHEDULED` - Freelancer notified of interview
- `INTERVIEW_CONFIRMED` - Company notified of confirmation
- `SUBMISSION_RECEIVED` - Company notified of work submission
- `SUBMISSION_REVIEWED` - Freelancer notified of review
- `MILESTONE_ASSIGNED` - Freelancer notified of assignment
- `PROJECT_UPDATE` - General project updates

## File Structure

### Backend
```
PI/
├── src/main/java/tn/esprit/pi/
│   ├── controller/
│   │   ├── ProjectController.java
│   │   ├── MilestoneController.java
│   │   ├── ApplicationController.java
│   │   ├── SubmissionController.java
│   │   ├── ReviewController.java
│   │   └── NotificationController.java
│   ├── entity/
│   │   ├── Project.java
│   │   ├── Milestone.java
│   │   ├── Application.java
│   │   ├── Submission.java
│   │   ├── Review.java
│   │   └── Notification.java
│   ├── repository/
│   ├── service/
│   └── dto/
└── src/main/resources/
    └── application.properties
```

### Frontend
```
matchy-angular/src/app/
├── frontoffice/
│   ├── browse-projects/
│   ├── project-view/
│   ├── browse-milestones/
│   ├── services/
│   │   ├── project.service.ts
│   │   ├── milestone.service.ts
│   │   ├── application.service.ts
│   │   ├── submission.service.ts
│   │   ├── review.service.ts
│   │   └── notification.service.ts
│   └── models/
│       └── models.ts
└── backoffice/
    ├── projects/
    ├── project-details/
    └── ...
```

## Quick Commands

### Start Backend
```bash
cd PI
./mvnw spring-boot:run -DskipTests
```

### Start Frontend
```bash
cd matchy-angular
npm start
```

### Build Backend
```bash
cd PI
./mvnw clean install -DskipTests
```

### Build Frontend
```bash
cd matchy-angular
npm run build
```

### Run Tests
```bash
# Backend
cd PI
./mvnw test

# Frontend
cd matchy-angular
npm test
```

## Support

For issues or questions:
1. Check backend logs in console
2. Check frontend console in browser (F12)
3. Check network tab for API errors
4. Verify database connections
5. Check this documentation

---

**Last Updated:** February 2026
**Version:** 1.0.0
**Status:** Production Ready ✅

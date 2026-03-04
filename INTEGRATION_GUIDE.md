# Frontend-Backend Integration Guide

## ✅ What's Been Implemented

### Backend (Spring Boot)
- **Entity**: Evenement with full CRUD operations
- **Database**: MySQL (matchy_db) with 10 sample events
- **API Endpoints**: All REST endpoints working on `http://localhost:8081/api`
- **CORS**: Configured for Angular frontend

### Frontend (Angular)
- **Service**: EvenementService with all API methods
- **Models**: TypeScript interfaces matching backend DTOs
- **Components Updated**:
  - Frontoffice Events: Displays events from backend
  - Backoffice Events: Admin management with delete functionality

## 🚀 How to Run

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: `http://localhost:8081`

### 2. Start Frontend
```bash
npm start
```
Frontend runs on: `http://localhost:4200`

### 3. Verify Connection
- Open browser: `http://localhost:4200`
- Navigate to Events page
- You should see 10 events loaded from the database

## 📋 Features Implemented

### Frontoffice (User View)
- ✅ Display all events from backend
- ✅ Filter events by type
- ✅ Participate in events (Join button)
- ✅ View event details
- ✅ Real-time attendance tracking

### Backoffice (Admin View)
- ✅ Display all events in table format
- ✅ Search events
- ✅ Filter by type
- ✅ Delete events
- ✅ View attendance statistics

## 🔗 API Endpoints Used

| Method | Endpoint | Description | Component |
|--------|----------|-------------|-----------|
| GET | `/api/evenements` | Get all events | Both |
| GET | `/api/evenements/{id}` | Get event by ID | - |
| POST | `/api/evenements/{id}/participate` | Join event | Frontoffice |
| DELETE | `/api/evenements/{id}` | Delete event | Backoffice |

## 📊 Sample Data

The database contains 10 events:
- 2 Certifications
- 2 Workshops
- 2 Training sessions
- 2 Freelance opportunities
- 1 Networking event
- 1 Recommendation

## 🎯 Next Steps

1. **Add Create/Edit Event Form** in backoffice
2. **Implement User Authentication** (JWT)
3. **Add Role-Based Access Control** (Admin/User)
4. **Build Next Entity** (Users, Projects, Courses)
5. **Add Pagination** for large datasets
6. **Implement Search & Filters** enhancement

## 🐛 Troubleshooting

### Backend not connecting to MySQL
- Check XAMPP MySQL is running
- Verify port is 3307 in `application.properties`
- Database `matchy_db` should exist

### Frontend not loading events
- Check backend is running on port 8081
- Open browser console for errors
- Verify API URL in `environment.ts`

### CORS errors
- Backend CORS is configured for `localhost:4200`
- Check `CorsConfig.java` if using different port

## 📝 Files Modified

### Backend
- `src/main/java/com/matchy/entity/Evenement.java`
- `src/main/java/com/matchy/controller/EvenementController.java`
- `src/main/java/com/matchy/service/EvenementService.java`
- `src/main/resources/application.properties`

### Frontend
- `src/app/core/services/evenement.service.ts` (new)
- `src/app/core/models/evenement.model.ts` (new)
- `src/app/frontoffice/events/events.component.ts`
- `src/app/backoffice/events/events.component.ts`
- `src/environments/environment.ts`

## ✨ Success Indicators

- ✅ Backend running without errors
- ✅ Database tables created
- ✅ Sample data inserted
- ✅ API endpoints responding
- ✅ Frontend loading events from backend
- ✅ Participate button working
- ✅ Delete button working (backoffice)

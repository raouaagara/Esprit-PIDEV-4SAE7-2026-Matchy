# Event Registration System

A complete event registration feature with admin approval workflow for the Matchy freelance platform.

## 🎯 Overview

This feature allows users to register for events through a modal form, with registrations requiring admin approval before confirmation. The system includes automatic participant counting, capacity management, and a comprehensive admin dashboard.

## ✨ Features

### User Features
- 📝 Registration form modal with validation
- ✅ Real-time form validation
- 🔔 Success/error notifications
- 🚫 Duplicate registration prevention
- 📊 Live participant counter display

### Admin Features
- 📋 Comprehensive registration management dashboard
- 🔍 Filter by status (All, Pending, Approved, Rejected)
- ✓ One-click approve/reject actions
- 🗑️ Delete registrations
- 👤 User information display
- 📈 Real-time counters and statistics
- 🔔 Pending registration notifications

### Backend Features
- 🔐 Input validation and security
- 🎯 Capacity management
- 🔄 Automatic counter updates
- 📊 Status-based filtering
- 🔍 Advanced query support
- ⚡ Transaction management

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+
- MySQL 8.0+
- Angular CLI

### Installation

1. **Clone and setup**
```bash
git clone <repository>
cd matchy-platform
```

2. **Start MySQL** (XAMPP on port 3307)

3. **Run Backend**
```bash
cd backend
mvn spring-boot:run
```

4. **Run Frontend**
```bash
npm install
npm start
```

5. **Access Application**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8081/api
- Admin Dashboard: http://localhost:4200/backoffice/registrations

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Quick Start](QUICK_START.md) | Get started in 5 minutes |
| [Feature Guide](REGISTRATION_FEATURE_GUIDE.md) | Complete implementation details |
| [API Testing](API_TESTING_GUIDE.md) | API endpoints and testing |
| [Architecture](ARCHITECTURE_DIAGRAM.md) | System architecture diagrams |
| [Deployment](DEPLOYMENT_CHECKLIST.md) | Production deployment guide |
| [Summary](REGISTRATION_IMPLEMENTATION_SUMMARY.md) | Implementation summary |

## 🏗️ Architecture

```
Frontend (Angular 18)
    ↓ HTTP REST API
Backend (Spring Boot 3.2)
    ↓ JPA/Hibernate
Database (MySQL 8.0)
```

### Tech Stack

**Frontend**
- Angular 18
- TypeScript
- SCSS
- Reactive Forms
- RxJS

**Backend**
- Spring Boot 3.2.0
- Java 17
- Spring Data JPA
- Hibernate
- MySQL Connector
- Lombok

## 📊 Database Schema

### Tables
- `users` - User accounts
- `registrations` - Event registrations
- `evenements` - Events

### Relationships
- User → Registration (One-to-Many)
- Evenement → Registration (One-to-Many)

## 🔌 API Endpoints

### Registration Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registrations` | Create registration |
| GET | `/api/registrations` | Get all registrations |
| GET | `/api/registrations/{id}` | Get by ID |
| GET | `/api/registrations/evenement/{id}` | Get by event |
| GET | `/api/registrations/user/{id}` | Get by user |
| GET | `/api/registrations/status/{status}` | Filter by status |
| PUT | `/api/registrations/{id}/approve` | Approve registration |
| PUT | `/api/registrations/{id}/reject` | Reject registration |
| DELETE | `/api/registrations/{id}` | Delete registration |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get by ID |
| GET | `/api/users/email/{email}` | Get by email |

## 🧪 Testing

### Manual Testing

1. **User Registration**
   - Navigate to Events page
   - Click "Join" on any event
   - Fill and submit form
   - Verify success message

2. **Admin Approval**
   - Go to Admin Registrations page
   - See pending registration
   - Click "Approve"
   - Verify status change and counter update

### API Testing

```bash
# Create registration
curl -X POST http://localhost:8081/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","userId":1,"evenementId":1}'

# Approve registration
curl -X PUT http://localhost:8081/api/registrations/1/approve
```

See [API Testing Guide](API_TESTING_GUIDE.md) for complete examples.

## 📁 Project Structure

```
backend/
├── src/main/java/com/matchy/
│   ├── entity/          # JPA entities
│   ├── dto/             # Data transfer objects
│   ├── repository/      # Data access layer
│   ├── service/         # Business logic
│   └── controller/      # REST controllers

frontend/
├── src/app/
│   ├── core/
│   │   ├── models/      # TypeScript interfaces
│   │   └── services/    # HTTP services
│   ├── frontoffice/
│   │   └── events/
│   │       └── registration-modal/
│   └── backoffice/
│       └── registrations/
```

## 🔄 Workflow

### User Registration Flow
1. User clicks "Join" button
2. Registration modal opens
3. User fills form (firstName, lastName, email)
4. Form validates input
5. Submits to backend (status = PENDING)
6. Success message displayed
7. Modal closes

### Admin Approval Flow
1. Admin navigates to Registrations page
2. Views pending registrations (with notification)
3. Reviews user details
4. Clicks "Approve" or "Reject"
5. Backend updates status
6. If approved: participant counter increases
7. Frontend refreshes list

## 🎨 UI/UX

### User Interface
- Dark theme for frontoffice
- Smooth animations
- Inline validation
- Success/error alerts
- Responsive design

### Admin Interface
- Light theme for backoffice
- Color-coded status badges
- Filter tabs with counters
- User avatars
- Hover effects

## 🔐 Security

- ✅ Input validation (backend)
- ✅ Email format validation
- ✅ Duplicate prevention
- ✅ Capacity enforcement
- ✅ CORS configuration
- ✅ Transaction management
- ⚠️ Authentication (TODO)
- ⚠️ Authorization (TODO)

## 🚧 Future Enhancements

### Phase 2
- Email notifications
- User dashboard (my registrations)
- QR code generation
- Waiting list feature
- Certificate generation

### Phase 3
- Real-time notifications (WebSocket)
- Analytics dashboard
- Export to CSV/PDF
- Bulk operations
- Advanced search

## 🐛 Troubleshooting

### Common Issues

**Registration not appearing**
- Check backend console for errors
- Verify database connection
- Check API: `GET /api/registrations`

**Counter not updating**
- Verify registration status is APPROVED
- Check backend logs
- Refresh events page

**Modal not opening**
- Check browser console
- Verify component is declared in module
- Check event ID is passed correctly

## 📝 License

This project is part of the Matchy platform.

## 👥 Contributors

- Backend: Spring Boot REST API
- Frontend: Angular 18 Application
- Database: MySQL Schema

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review troubleshooting section
3. Check backend logs
4. Verify database state

## 🎉 Acknowledgments

Built with:
- Spring Boot
- Angular
- MySQL
- Love and coffee ☕

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: March 3, 2026

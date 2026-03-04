# Quick Start - Registration Feature

## 🚀 Start the Application

### Option 1: Automated (Windows)
```bash
start-dev.bat
```

### Option 2: Manual
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend  
npm start
```

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4200 |
| Events Page | http://localhost:4200/events |
| Admin Dashboard | http://localhost:4200/backoffice/dashboard |
| Admin Registrations | http://localhost:4200/backoffice/registrations |
| Backend API | http://localhost:8081/api |

## 🧪 Quick Test (5 minutes)

### Step 1: Create Test User (Optional)
```bash
curl -X POST http://localhost:8081/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Step 2: User Registration
1. Go to http://localhost:4200/events
2. Click "Join" on any event
3. Fill form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
4. Click "Submit Registration"
5. See success message ✅

### Step 3: Admin Approval
1. Go to http://localhost:4200/backoffice/registrations
2. See pending registration with 🔔 notification
3. Click "✓ Approve" button
4. Verify status changes to APPROVED
5. Check event counter increased

## 📊 Key Features

### User Side
- ✅ Registration form modal
- ✅ Form validation
- ✅ Success/error messages
- ✅ Duplicate prevention

### Admin Side
- ✅ View all registrations
- ✅ Filter by status (All/Pending/Approved/Rejected)
- ✅ Approve/Reject buttons
- ✅ Real-time counters
- ✅ User details display

## 🔗 API Quick Reference

```bash
# Create Registration
POST /api/registrations
Body: {"firstName":"John","lastName":"Doe","email":"john@test.com","userId":1,"evenementId":1}

# Get All Registrations
GET /api/registrations

# Get Pending
GET /api/registrations/status/PENDING

# Approve
PUT /api/registrations/{id}/approve

# Reject
PUT /api/registrations/{id}/reject
```

## 📁 Key Files

### Backend
- `backend/src/main/java/com/matchy/entity/Registration.java`
- `backend/src/main/java/com/matchy/controller/RegistrationController.java`
- `backend/src/main/java/com/matchy/service/impl/RegistrationServiceImpl.java`

### Frontend
- `src/app/frontoffice/events/registration-modal/`
- `src/app/backoffice/registrations/`
- `src/app/core/services/registration.service.ts`

## 🆘 Troubleshooting

### Backend won't start
- Check MySQL is running (XAMPP)
- Verify port 8081 is free
- Check `application.properties` database config

### Frontend won't start
- Run `npm install`
- Check port 4200 is free
- Clear Angular cache: `rm -rf .angular`

### Registration not appearing
- Check browser console for errors
- Verify backend is running
- Check API: http://localhost:8081/api/registrations

## 📚 Documentation

- **Complete Guide**: `REGISTRATION_FEATURE_GUIDE.md`
- **API Testing**: `API_TESTING_GUIDE.md`
- **Summary**: `REGISTRATION_IMPLEMENTATION_SUMMARY.md`

## ✅ Checklist

Before testing:
- [ ] MySQL/XAMPP running on port 3307
- [ ] Backend started (port 8081)
- [ ] Frontend started (port 4200)
- [ ] At least one event exists in database

## 🎯 Success Indicators

You'll know it's working when:
1. ✅ Registration modal opens on "Join" click
2. ✅ Form submits successfully
3. ✅ Registration appears in admin dashboard
4. ✅ Approve button changes status
5. ✅ Event counter increases

## 💡 Tips

- Use Chrome DevTools Network tab to debug API calls
- Check backend console for SQL queries and errors
- Use Postman for API testing
- Sample data: `backend/insert_sample_users.sql`

---

**Need Help?** Check the detailed guides in the documentation files.

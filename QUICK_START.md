# 🚀 Matchy - Quick Start Guide

## Prerequisites
- ✅ Java 17+ installed
- ✅ Node.js 18+ installed
- ✅ MySQL running on localhost:3306
- ✅ Maven installed (or use included mvnw)

## 1️⃣ Database Setup (30 seconds)

```sql
CREATE DATABASE IF NOT EXISTS PITASK;
```

Update `PI/src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

## 2️⃣ Start Backend (1 minute)

```bash
cd PI
./mvnw spring-boot:run
```

✅ Backend running at: `http://localhost:9090`

## 3️⃣ Start Frontend (2 minutes)

```bash
cd matchy-angular
npm install    # First time only
npm start
```

✅ Frontend running at: `http://localhost:4200`

## 4️⃣ Create Test User (30 seconds)

```bash
curl -X POST http://localhost:9090/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "Company",
    "userType": "COMPANY",
    "companyName": "Test Corp"
  }'
```

## 5️⃣ Login & Test

1. Open: `http://localhost:4200/backoffice/login`
2. Login with:
   - Email: `test@company.com`
   - Password: `password123`
3. Navigate to Projects page
4. See your projects (empty at first)

## 🎯 What You Can Do Now

### Via UI (Angular App)
- ✅ Login/Register users
- ✅ View projects list
- ✅ View projects with milestones
- ✅ Delete projects
- ✅ Search and filter

### Via API (See API_TESTS.md)
- ✅ Create projects
- ✅ Create milestones
- ✅ Update project/milestone status
- ✅ Full CRUD operations

## 📁 Key Files

### Backend
- `PI/src/main/java/tn/esprit/pi/controller/` - API endpoints
- `PI/src/main/java/tn/esprit/pi/entity/` - Database models
- `PI/src/main/resources/application.properties` - Configuration

### Frontend
- `matchy-angular/src/app/frontoffice/services/` - API services
- `matchy-angular/src/app/frontoffice/models/models.ts` - TypeScript models
- `matchy-angular/src/app/backoffice/projects/` - Projects component
- `matchy-angular/src/environments/environment.ts` - API URL config

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials
- Check port 9090 is free

### Frontend won't start
- Run `npm install` first
- Check port 4200 is free
- Clear node_modules and reinstall if needed

### CORS errors
- Verify backend is running on port 9090
- Check CORS config in `CorsConfig.java`

### 401 Unauthorized
- Login again to get fresh token
- Check token is being sent in headers

## 📚 Next Steps

1. Read `INTEGRATION_GUIDE.md` for detailed documentation
2. Check `API_TESTS.md` for API testing
3. Review `CHANGES_SUMMARY.md` for what was implemented

## 🎉 You're Ready!

Your Matchy application is now fully integrated and running!

- Backend: ✅ Running
- Frontend: ✅ Running
- Database: ✅ Connected
- API: ✅ Working
- UI: ✅ Beautiful

Happy coding! 🚀

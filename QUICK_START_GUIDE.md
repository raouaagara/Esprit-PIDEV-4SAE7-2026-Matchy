# Matchy Platform - Quick Start Guide

## 🚀 Automated Startup (Recommended)

### Windows
Double-click: `start-all-services.bat`

This will automatically start all services in the correct order:
1. Eureka Server (8761)
2. PI Service (9090)
3. API Gateway (8080)
4. Angular Frontend (4200)

## 📋 Manual Startup

### Option 1: Individual Scripts
```bash
# Terminal 1
start-eureka.bat

# Terminal 2 (wait 30 seconds)
start-pi-service.bat

# Terminal 3 (wait 20 seconds)
start-gateway.bat

# Terminal 4 (wait 20 seconds)
cd matchy-angular
ng serve
```

### Option 2: Manual Commands
```bash
# Terminal 1: Eureka Server
cd eureka-server
./mvnw spring-boot:run

# Terminal 2: PI Service
cd PI
./mvnw spring-boot:run -DskipTests

# Terminal 3: API Gateway
cd api-gateway
./mvnw spring-boot:run

# Terminal 4: Frontend
cd matchy-angular
ng serve
```

## 🔍 Verify Everything is Running

### 1. Check Eureka Dashboard
Open: http://localhost:8761

You should see:
- ✅ PI (1 instance)
- ✅ API-GATEWAY (1 instance)

### 2. Test API Gateway
```bash
curl http://localhost:8080/api/auth/test
```

### 3. Test Direct Access
```bash
curl http://localhost:9090/api/auth/test
```

### 4. Open Frontend
http://localhost:4200

## 🎯 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | Angular Application |
| API Gateway | http://localhost:8080 | Single Entry Point |
| PI Service | http://localhost:9090 | Direct Backend Access |
| Eureka Dashboard | http://localhost:8761 | Service Registry |

## 🔧 Configuration

### Using API Gateway (Recommended for Production)
Update `matchy-angular/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'  // Through Gateway
};
```

### Using Direct Access (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090'  // Direct to PI Service
};
```

## ⚠️ Important Notes

1. **Startup Order Matters**: Always start Eureka first!
2. **Wait Times**: Allow 30 seconds for Eureka, 20 seconds for each service
3. **Port Conflicts**: Make sure ports 8761, 8080, 9090, 4200 are free
4. **Database**: Ensure MySQL is running on port 3306

## 🛑 Stopping Services

### Stop All
Press `Ctrl+C` in each terminal window

### Kill Processes (if needed)
```bash
# Windows
taskkill /F /IM java.exe
taskkill /F /IM node.exe

# Then restart services
```

## 📊 Monitoring

### Eureka Dashboard
- URL: http://localhost:8761
- Shows all registered services
- Health status and instance info

### Gateway Actuator Endpoints
- Health: http://localhost:8080/actuator/health
- Routes: http://localhost:8080/actuator/gateway/routes
- Metrics: http://localhost:8080/actuator/metrics

## 🐛 Troubleshooting

### Service Not Showing in Eureka
1. Wait 30 seconds for registration
2. Check service logs for errors
3. Verify `eureka.client.enabled=true`
4. Restart the service

### Gateway Not Routing
1. Check PI service is registered in Eureka
2. Verify service name is `PI` (case-sensitive)
3. Check gateway logs for errors
4. Test direct access to PI service first

### Frontend Can't Connect
1. Check CORS configuration in gateway
2. Verify apiUrl in environment.ts
3. Check browser console for errors
4. Test API endpoints with curl first

### Port Already in Use
```bash
# Windows - Find and kill process
netstat -ano | findstr :8761
taskkill /PID <process_id> /F
```

## 📁 Project Structure

```
TASKK/
├── eureka-server/          # Service Discovery (8761)
├── api-gateway/            # API Gateway (8080)
├── PI/                     # Main Backend (9090)
├── matchy-angular/         # Frontend (4200)
├── start-all-services.bat  # Automated startup
├── start-eureka.bat        # Start Eureka only
├── start-gateway.bat       # Start Gateway only
├── start-pi-service.bat    # Start PI Service only
├── MICROSERVICES_SETUP.md  # Detailed documentation
└── QUICK_START_GUIDE.md    # This file
```

## ✅ Success Checklist

- [ ] Eureka Dashboard shows 2 services
- [ ] Gateway health endpoint responds
- [ ] PI service endpoints work through gateway
- [ ] Frontend loads successfully
- [ ] Login/Register works
- [ ] Projects page loads data
- [ ] No CORS errors in browser console

## 🎓 Next Steps

1. ✅ All services running
2. Test all features through gateway
3. Monitor Eureka dashboard
4. Check service logs for errors
5. Update frontend to use gateway URL
6. Test production-like setup

## 💡 Tips

- Use `start-all-services.bat` for quick testing
- Keep Eureka dashboard open to monitor services
- Check logs in each terminal for errors
- Use gateway URL for production-like testing
- Use direct URL for faster development

## 📞 Need Help?

Check the detailed documentation:
- `MICROSERVICES_SETUP.md` - Complete architecture guide
- Service logs in each terminal window
- Eureka dashboard for service status

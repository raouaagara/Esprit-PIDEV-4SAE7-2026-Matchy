# Matchy - User & Project Management

## Structure
```
matchy-final/
├── eureka-server/    ← Service Discovery  (port 8761)
├── api-gateway/      ← Gateway + JWT      (port 8080)
├── backend/          ← Microservices      (port 8081+)
├── frontend/         ← Angular 18         (port 4200)
├── start-all.bat     ← Windows
└── start-all.sh      ← Linux/Mac
```

Startup Order
1. eureka-server (wait ~20s)
2. api-gateway
3. backend
4. frontend (npm install && ng serve)


## URLs
- Frontend  : http://localhost:4200
- Gateway   : http://localhost:8080
- Eureka    : http://localhost:8761 (admin/admin123)
- Backend   : http://localhost:8081


# Matchy - Architecture Complète

## Structure
```
matchy-final/
├── eureka-server/    ← Service Discovery  (port 8761)
├── api-gateway/      ← Gateway + JWT      (port 8080)
├── backend/          ← Monolithique       (port 8081)
├── frontend/         ← Angular 18         (port 4200)
├── start-all.bat     ← Windows
└── start-all.sh      ← Linux/Mac
```

## Ordre de démarrage
1. eureka-server  (attendre ~20s)
2. api-gateway
3. backend
4. frontend (npm install && ng serve)

## Comptes
- admin@matchy.tn / admin123
- sara@matchy.tn / client123
- karim@matchy.tn / freelancer123

## URLs
- Frontend  : http://localhost:4200
- Gateway   : http://localhost:8080
- Eureka    : http://localhost:8761 (admin/admin123)
- Backend   : http://localhost:8081


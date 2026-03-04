# Matchy Platform - Microservices Architecture

## Architecture Overview

```
┌─────────────────┐
│  Angular App    │
│  (Port 4200)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Gateway    │
│  (Port 8080)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Eureka Server   │
│  (Port 8761)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PI Service    │
│  (Port 9090)    │
└─────────────────┘
```

## Services

### 1. Eureka Server (Service Discovery)
- **Port**: 8761
- **Purpose**: Service registry and discovery
- **Dashboard**: http://localhost:8761
- **Location**: `eureka-server/`

### 2. API Gateway
- **Port**: 8080
- **Purpose**: Single entry point, routing, load balancing
- **Routes**:
  - `/api/**` → PI Service
  - `/pi/**` → PI Service (with path rewriting)
- **Location**: `api-gateway/`

### 3. PI Service (Main Backend)
- **Port**: 9090
- **Purpose**: Core business logic, database operations
- **Endpoints**: All `/api/**` endpoints
- **Location**: `PI/`

## Startup Order (IMPORTANT!)

Start services in this exact order:

### Step 1: Start Eureka Server
```bash
cd eureka-server
./mvnw spring-boot:run
```
Wait until you see: "Started EurekaServerApplication"
Dashboard: http://localhost:8761

### Step 2: Start PI Service
```bash
cd PI
./mvnw spring-boot:run -DskipTests
```
Wait until you see: "Registered with Eureka"

### Step 3: Start API Gateway
```bash
cd api-gateway
./mvnw spring-boot:run
```
Wait until you see: "Started ApiGatewayApplication"

### Step 4: Start Angular Frontend
```bash
cd matchy-angular
ng serve
```

## Access Points

### Development (Direct Access)
- Frontend: http://localhost:4200
- PI Service: http://localhost:9090/api/**
- Eureka Dashboard: http://localhost:8761

### Production (Through Gateway)
- Frontend: http://localhost:4200
- API Gateway: http://localhost:8080/api/**
- All requests route through gateway

## Configuration Changes

### Frontend Configuration
Update `matchy-angular/src/environments/environment.ts`:

```typescript
// For direct access (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090'
};

// For gateway access (production-like)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Testing the Setup

### 1. Check Eureka Dashboard
Visit: http://localhost:8761
You should see:
- PI service registered
- API-GATEWAY service registered

### 2. Test Direct Access
```bash
curl http://localhost:9090/api/auth/test
```

### 3. Test Gateway Access
```bash
curl http://localhost:8080/api/auth/test
```

### 4. Test from Frontend
The Angular app should work with either:
- Direct: `apiUrl: 'http://localhost:9090'`
- Gateway: `apiUrl: 'http://localhost:8080'`

## Troubleshooting

### Service Not Registering with Eureka
1. Check Eureka is running on port 8761
2. Check `eureka.client.enabled=true` in application.properties
3. Wait 30 seconds for registration
4. Check Eureka dashboard

### Gateway Not Routing
1. Verify PI service is registered in Eureka
2. Check gateway logs for routing errors
3. Verify service name matches: `PI` (case-sensitive)

### CORS Issues
- Gateway handles CORS for all services
- Allowed origin: http://localhost:4200
- Update `CorsConfig.java` if needed

## Benefits of This Architecture

✅ **Service Discovery**: Services find each other automatically
✅ **Load Balancing**: Gateway distributes requests
✅ **Single Entry Point**: All requests through gateway
✅ **Scalability**: Easy to add more service instances
✅ **Monitoring**: Centralized monitoring through Eureka
✅ **Security**: Gateway can handle authentication
✅ **Resilience**: Circuit breakers and fallbacks

## Next Steps

1. Add more microservices (Payment, Notification, etc.)
2. Implement Circuit Breaker with Resilience4j
3. Add Spring Cloud Config for centralized configuration
4. Implement API rate limiting in gateway
5. Add distributed tracing with Zipkin
6. Implement JWT validation in gateway

## Quick Start Script

Create `start-all.sh` (Linux/Mac) or `start-all.bat` (Windows):

```bash
# Start Eureka
start cmd /k "cd eureka-server && mvnw spring-boot:run"
timeout /t 30

# Start PI Service
start cmd /k "cd PI && mvnw spring-boot:run -DskipTests"
timeout /t 20

# Start Gateway
start cmd /k "cd api-gateway && mvnw spring-boot:run"
timeout /t 20

# Start Frontend
start cmd /k "cd matchy-angular && ng serve"
```

## Monitoring

### Eureka Dashboard
- URL: http://localhost:8761
- Shows all registered services
- Health status
- Instance information

### Gateway Actuator
- Health: http://localhost:8080/actuator/health
- Routes: http://localhost:8080/actuator/gateway/routes
- Metrics: http://localhost:8080/actuator/metrics

## Production Deployment

For production, consider:
1. Use environment-specific configurations
2. Enable security on Eureka dashboard
3. Use HTTPS for all services
4. Implement proper authentication in gateway
5. Use external configuration server
6. Set up proper logging and monitoring
7. Use container orchestration (Docker, Kubernetes)

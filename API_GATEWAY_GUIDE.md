# 🚪 API Gateway Setup Guide

## Overview

The API Gateway acts as a single entry point for all client requests, providing routing, load balancing, security, and monitoring capabilities.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Angular)                        │
│                   http://localhost:4200                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ All API Requests
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                            │
│                   http://localhost:8080                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Request Routing                                   │  │
│  │  • Load Balancing                                    │  │
│  │  • CORS Handling                                     │  │
│  │  • Request/Response Logging                          │  │
│  │  • Service Discovery Integration                     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Discovers services via Eureka
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Eureka Server                            │
│                   http://localhost:8761                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Routes to registered services
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Matchy Backend                            │
│                   http://localhost:8081                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • User Service      (/api/users)                    │  │
│  │  • Event Service     (/api/evenements)               │  │
│  │  • Registration Svc  (/api/registrations)            │  │
│  │  • Health Check      (/api/health)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## What is an API Gateway?

An **API Gateway** is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.

### Key Benefits

1. **Single Entry Point** - One URL for all services
2. **Service Discovery** - Automatically finds services via Eureka
3. **Load Balancing** - Distributes requests across service instances
4. **CORS Management** - Centralized CORS configuration
5. **Request Logging** - Monitor all incoming/outgoing requests
6. **Security** - Add authentication/authorization at gateway level
7. **Rate Limiting** - Control request rates (future enhancement)
8. **Circuit Breaker** - Handle service failures gracefully (future enhancement)

## Project Structure

```
api-gateway/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/matchy/gateway/
│       │       ├── ApiGatewayApplication.java      # Main application
│       │       ├── config/
│       │       │   ├── GatewayConfig.java          # Route configuration
│       │       │   └── CorsConfig.java             # CORS configuration
│       │       └── filter/
│       │           └── LoggingFilter.java          # Request/Response logging
│       └── resources/
│           └── application.yml                     # Gateway configuration
└── pom.xml                                         # Maven dependencies
```

## Configuration Details

### Port Configuration
- **API Gateway:** 9090 (New entry point)
- **Backend API:** 8081 (Internal, accessed via gateway)
- **Eureka Server:** 8761 (Service discovery)
- **Frontend:** 4200 (Angular application)

### Route Configuration

The gateway defines routes for all backend endpoints:

| Route Name | Path | Target Service | Description |
|------------|------|----------------|-------------|
| user-service | /api/users/** | MATCHY-BACKEND | User management |
| event-service | /api/evenements/** | MATCHY-BACKEND | Event management |
| registration-service | /api/registrations/** | MATCHY-BACKEND | Registration management |
| health-check | /api/health/** | MATCHY-BACKEND | Health monitoring |
| actuator | /actuator/** | MATCHY-BACKEND | Actuator endpoints |

### Load Balancing

The gateway uses `lb://MATCHY-BACKEND` URI scheme:
- `lb://` - Load balancer protocol
- `MATCHY-BACKEND` - Service name from Eureka

This enables automatic load balancing when multiple instances are running.

## How to Run

### Step 1: Ensure Prerequisites are Running

Make sure these services are running in order:

1. **MySQL Database** (Port 3307)
2. **Eureka Server** (Port 8761)
3. **Backend Application** (Port 8081)

### Step 2: Start API Gateway

```bash
cd api-gateway
mvn spring-boot:run
```

**Expected Output:**
```
Started ApiGatewayApplication in X seconds
Netty started on port 8080
Registering application API-GATEWAY with eureka with status UP
```

### Step 3: Verify Registration

Open Eureka Dashboard: http://localhost:8761

You should see two services registered:
- **MATCHY-BACKEND** (Port 8081)
- **API-GATEWAY** (Port 8080)

## Testing the Gateway

### Option 1: Direct Backend Access (Old Way)
```bash
# Direct to backend - Still works
curl http://localhost:8081/api/users
```

### Option 2: Through API Gateway (New Way - Recommended)
```bash
# Through gateway - Recommended
curl http://localhost:9090/api/users
```

### Test All Routes

```bash
# Test Users endpoint
curl http://localhost:9090/api/users

# Test Events endpoint
curl http://localhost:9090/api/evenements

# Test Registrations endpoint
curl http://localhost:9090/api/registrations

# Test Health endpoint
curl http://localhost:9090/api/health

# Test Actuator health
curl http://localhost:9090/actuator/health
```

### Test Gateway-Specific Endpoints

```bash
# Gateway health
curl http://localhost:9090/actuator/health

# Gateway info
curl http://localhost:9090/actuator/info

# Gateway routes (shows all configured routes)
curl http://localhost:9090/actuator/gateway/routes
```

## Request Flow Example

### Example: Get All Events

**1. Client Request (Angular)**
```typescript
// Frontend makes request to gateway
http.get('http://localhost:9090/api/evenements')
```

**2. Gateway Processing**
```
🔵 Gateway receives: GET /api/evenements
   ↓
   Checks route configuration
   ↓
   Matches "event-service" route
   ↓
   Queries Eureka for MATCHY-BACKEND instances
   ↓
   Selects instance (load balancing)
   ↓
   Adds headers: X-Gateway: API-Gateway
   ↓
   Forwards to: http://localhost:8081/api/evenements
```

**3. Backend Processing**
```
Backend receives request
   ↓
Processes request
   ↓
Returns response
```

**4. Gateway Response**
```
Gateway receives response from backend
   ↓
   Adds header: X-Powered-By: Matchy-Gateway
   ↓
   Logs response
   ↓
   Returns to client
🟢 Gateway response: 200 OK
```

## Logging

The gateway logs all requests and responses:

```
2026-03-04 21:30:00 - 🔵 Gateway Request: GET http://localhost:9090/api/evenements
2026-03-04 21:30:00 - 🟢 Gateway Response: http://localhost:9090/api/evenements - Status: 200 OK
```

## Update Frontend Configuration

### Current Configuration (Direct to Backend)
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api'  // Direct to backend
};
```

### New Configuration (Through Gateway)
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090/api'  // Through API Gateway
};
```

**Benefits of using Gateway:**
- Single entry point
- Automatic load balancing
- Centralized CORS
- Request logging
- Future: Authentication, rate limiting, circuit breaker

## Gateway Features

### 1. Service Discovery Integration
- Automatically discovers services from Eureka
- No hard-coded URLs
- Dynamic service routing

### 2. Load Balancing
- Round-robin load balancing (default)
- Distributes requests across multiple instances
- Automatic failover

### 3. CORS Handling
- Centralized CORS configuration
- Allows requests from Angular frontend
- Supports all HTTP methods

### 4. Request/Response Logging
- Logs all incoming requests
- Logs all outgoing responses
- Helps with debugging and monitoring

### 5. Custom Headers
- Adds `X-Gateway: API-Gateway` to requests
- Adds `X-Powered-By: Matchy-Gateway` to responses
- Helps identify gateway-routed requests

## Actuator Endpoints

The gateway exposes several actuator endpoints:

| Endpoint | Description |
|----------|-------------|
| /actuator/health | Gateway health status |
| /actuator/info | Gateway information |
| /actuator/metrics | Gateway metrics |
| /actuator/gateway/routes | All configured routes |
| /actuator/gateway/globalfilters | Global filters |
| /actuator/gateway/routefilters | Route-specific filters |

### View All Routes
```bash
curl http://localhost:9090/actuator/gateway/routes | json_pp
```

**Response:**
```json
[
  {
    "route_id": "user-service",
    "uri": "lb://MATCHY-BACKEND",
    "order": 0,
    "predicate": "Paths: [/api/users/**], match trailing slash: true"
  },
  {
    "route_id": "event-service",
    "uri": "lb://MATCHY-BACKEND",
    "order": 0,
    "predicate": "Paths: [/api/evenements/**], match trailing slash: true"
  }
]
```

## Startup Order

**Critical:** Always start services in this order:

1. **MySQL Database** (Port 3307)
2. **Eureka Server** (Port 8761)
3. **Backend Application** (Port 8081)
4. **API Gateway** (Port 8080) ← NEW
5. **Frontend Application** (Port 4200)

## Troubleshooting

### Gateway Not Starting

**Problem:** Port 9090 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :9090
taskkill /PID <PID> /F

# Or change port in application.yml
server:
  port: 9091
```

### Gateway Not Finding Backend

**Problem:** `503 Service Unavailable`

**Solutions:**
1. Check Eureka Server is running
2. Verify backend is registered in Eureka
3. Check service name matches: `MATCHY-BACKEND`
4. Wait 30 seconds for service discovery

### CORS Errors

**Problem:** CORS policy blocking requests

**Solutions:**
1. Verify CORS configuration in `CorsConfig.java`
2. Check allowed origins include `http://localhost:4200`
3. Ensure `allowCredentials: true`
4. Check browser console for specific CORS error

### Routes Not Working

**Problem:** 404 Not Found

**Solutions:**
1. Check route configuration in `GatewayConfig.java`
2. Verify path matches: `/api/users/**`
3. Test actuator endpoint: `/actuator/gateway/routes`
4. Check gateway logs for routing errors

## Advanced Features (Future Enhancements)

### 1. Authentication & Authorization
```java
// Add JWT validation filter
@Component
public class AuthenticationFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Validate JWT token
        // Add user info to headers
        return chain.filter(exchange);
    }
}
```

### 2. Rate Limiting
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://MATCHY-BACKEND
          predicates:
            - Path=/api/users/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
```

### 3. Circuit Breaker
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://MATCHY-BACKEND
          predicates:
            - Path=/api/users/**
          filters:
            - name: CircuitBreaker
              args:
                name: backendCircuitBreaker
                fallbackUri: forward:/fallback
```

### 4. Request/Response Modification
```java
.route("user-service", r -> r
    .path("/api/users/**")
    .filters(f -> f
        .modifyRequestBody(String.class, String.class, 
            (exchange, body) -> Mono.just(body.toUpperCase()))
        .modifyResponseBody(String.class, String.class,
            (exchange, body) -> Mono.just(body.toLowerCase())))
    .uri("lb://MATCHY-BACKEND"))
```

## Monitoring

### Gateway Metrics

```bash
# Request count
curl http://localhost:9090/actuator/metrics/gateway.requests

# Response time
curl http://localhost:9090/actuator/metrics/gateway.requests.duration
```

### Health Check

```bash
curl http://localhost:9090/actuator/health
```

**Response:**
```json
{
  "status": "UP",
  "components": {
    "discoveryComposite": {
      "status": "UP",
      "components": {
        "eureka": {
          "status": "UP",
          "details": {
            "applications": {
              "MATCHY-BACKEND": 1
            }
          }
        }
      }
    },
    "ping": {"status": "UP"}
  }
}
```

## Benefits Summary

### For Development
- ✅ Single entry point for all APIs
- ✅ Easier debugging with centralized logging
- ✅ Simplified CORS configuration
- ✅ Service discovery integration

### For Production
- ✅ Load balancing across multiple instances
- ✅ Centralized security (authentication/authorization)
- ✅ Rate limiting and throttling
- ✅ Circuit breaker for fault tolerance
- ✅ Request/response transformation
- ✅ Monitoring and metrics

### For Microservices
- ✅ Ready for service splitting
- ✅ No frontend changes when adding services
- ✅ Dynamic service routing
- ✅ Version management (A/B testing)

## Migration Path

### Phase 1: Current Setup (Monolithic)
```
Frontend → API Gateway → Backend (Monolithic)
```

### Phase 2: Split Services (Future)
```
Frontend → API Gateway → User Service (8082)
                      → Event Service (8083)
                      → Registration Service (8084)
```

The gateway configuration remains the same! Just update service names in routes.

## Ports Summary

| Service | Port | URL | Status |
|---------|------|-----|--------|
| API Gateway | 9090 | http://localhost:9090 | NEW ✨ |
| Backend API | 8081 | http://localhost:8081 | Running |
| Eureka Server | 8761 | http://localhost:8761 | Running |
| Frontend | 4200 | http://localhost:4200 | Running |
| MySQL | 3307 | localhost:3307 | Running |

## Next Steps

1. ✅ Start API Gateway
2. ✅ Verify registration in Eureka
3. ✅ Test all routes through gateway
4. 🔄 Update frontend to use gateway URL (optional)
5. 🔄 Add authentication filter (future)
6. 🔄 Add rate limiting (future)
7. 🔄 Add circuit breaker (future)

## Resources

- [Spring Cloud Gateway Documentation](https://spring.io/projects/spring-cloud-gateway)
- [Gateway Filters](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories)
- [Eureka Integration](https://spring.io/guides/gs/service-registration-and-discovery/)

---

**Created:** March 4, 2026  
**Version:** 1.0.0  
**Status:** Ready to Deploy

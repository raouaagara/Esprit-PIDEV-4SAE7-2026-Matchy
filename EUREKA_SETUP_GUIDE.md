# Eureka Server Setup Guide

## Overview
This guide explains how to run the Eureka Server for service discovery and register your Matchy backend application with it.

## Architecture

```
┌─────────────────────┐
│   Eureka Server     │
│   (Port: 8761)      │
│  Service Discovery  │
└──────────┬──────────┘
           │
           │ Registers with
           │
┌──────────▼──────────┐
│  Matchy Backend     │
│   (Port: 8081)      │
│  - User Service     │
│  - Event Service    │
│  - Registration Svc │
└─────────────────────┘
```

## What is Eureka?

**Eureka** is a service discovery server developed by Netflix. It allows microservices to:
- Register themselves automatically
- Discover other services
- Load balance requests
- Handle service failures gracefully

## Project Structure

```
matchy-angular/
├── eureka-server/              # Eureka Server (NEW)
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/matchy/eureka/
│   │       │       └── EurekaServerApplication.java
│   │       └── resources/
│   │           └── application.yml
│   └── pom.xml
│
└── backend/                    # Matchy Backend (UPDATED)
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/matchy/
    │       │       └── MatchyApplication.java  (Added @EnableDiscoveryClient)
    │       └── resources/
    │           └── application.properties  (Added Eureka config)
    └── pom.xml  (Added Eureka Client dependency)
```

## Configuration Details

### Eureka Server Configuration

**Port:** 8761 (Default Eureka port)

**Key Settings:**
- `register-with-eureka: false` - Server doesn't register itself
- `fetch-registry: false` - Server doesn't fetch registry
- `enable-self-preservation: false` - Disabled for development

### Backend Application Configuration

**Application Name:** `matchy-backend`

**Eureka Settings:**
- Registers with Eureka Server at `http://localhost:8761/eureka/`
- Sends heartbeat every 30 seconds
- Lease expires after 90 seconds of no heartbeat

**Actuator Endpoints:**
- `/actuator/health` - Health check
- `/actuator/info` - Application info
- `/actuator/metrics` - Metrics

## How to Run

### Step 1: Start Eureka Server

```bash
cd eureka-server
mvn spring-boot:run
```

**Expected Output:**
```
Started EurekaServerApplication in X seconds
Eureka Server running on http://localhost:8761
```

**Access Eureka Dashboard:**
Open browser: `http://localhost:8761`

### Step 2: Start Backend Application

```bash
cd backend
mvn spring-boot:run
```

**Expected Output:**
```
DiscoveryClient_MATCHY-BACKEND/... - registration status: 204
Started MatchyApplication in X seconds
```

### Step 3: Verify Registration

1. Open Eureka Dashboard: `http://localhost:8761`
2. Look for "Instances currently registered with Eureka"
3. You should see: **MATCHY-BACKEND** with status **UP**

## Eureka Dashboard

The Eureka Dashboard shows:

### System Status
- Environment
- Data center
- Current time
- Uptime
- Lease expiration enabled
- Renews threshold
- Renews (last min)

### DS Replicas
- List of Eureka replicas (none in standalone mode)

### Instances Currently Registered
- **Application Name:** MATCHY-BACKEND
- **AMI ID:** n/a
- **Availability Zone:** (default)
- **Status:** UP (1) - (1 instance)
- **Instance Info:**
  - Instance ID: `localhost:matchy-backend:8081`
  - Status: UP
  - Homepage URL: `http://localhost:8081/`
  - Health Check URL: `http://localhost:8081/actuator/health`

### General Info
- Total memory
- Environment
- CPU cores

### Instance Info
- IP Address
- Status
- Metadata

## Testing Service Discovery

### 1. Check Backend Health
```bash
curl http://localhost:8081/actuator/health
```

**Response:**
```json
{
  "status": "UP",
  "components": {
    "db": {"status": "UP"},
    "diskSpace": {"status": "UP"},
    "ping": {"status": "UP"}
  }
}
```

### 2. Check Application Info
```bash
curl http://localhost:8081/actuator/info
```

**Response:**
```json
{
  "app": {
    "name": "Matchy Backend",
    "description": "Event Management and Registration Service",
    "version": "1.0.0"
  }
}
```

### 3. Query Eureka for Services
```bash
curl http://localhost:8761/eureka/apps
```

Returns XML with all registered services.

### 4. Query Specific Service
```bash
curl http://localhost:8761/eureka/apps/MATCHY-BACKEND
```

Returns details about the Matchy Backend service.

## Startup Order

**Important:** Always start services in this order:

1. **Eureka Server** (Port 8761)
2. **Backend Application** (Port 8081)
3. **Frontend Application** (Port 4200)

## Troubleshooting

### Backend Not Registering

**Problem:** Backend doesn't appear in Eureka Dashboard

**Solutions:**
1. Check Eureka Server is running on port 8761
2. Verify `eureka.client.service-url.defaultZone` in application.properties
3. Check backend logs for connection errors
4. Wait 30 seconds (registration interval)

### Connection Refused

**Problem:** `Connection refused: localhost:8761`

**Solutions:**
1. Start Eureka Server first
2. Check firewall settings
3. Verify port 8761 is not in use

### Service Shows as DOWN

**Problem:** Service registered but status is DOWN

**Solutions:**
1. Check backend application is running
2. Verify health endpoint: `http://localhost:8081/actuator/health`
3. Check database connection
4. Review backend logs

### Maven Build Errors

**Problem:** Dependency resolution errors

**Solutions:**
1. Update Maven: `mvn clean install`
2. Clear Maven cache: `rm -rf ~/.m2/repository/org/springframework/cloud`
3. Check internet connection
4. Verify Spring Cloud version compatibility

## Benefits of This Setup

### Current Benefits
1. **Service Monitoring** - See service status in real-time
2. **Health Checks** - Automatic health monitoring
3. **Service Metadata** - View service information
4. **Preparation** - Ready for microservices migration

### Future Benefits (When Splitting to Microservices)
1. **Service Discovery** - Services find each other automatically
2. **Load Balancing** - Distribute requests across instances
3. **Fault Tolerance** - Handle service failures gracefully
4. **Dynamic Scaling** - Add/remove instances easily
5. **No Hard-coded URLs** - Services discover each other by name

## Next Steps

### Option A: Keep Current Setup
- Continue with monolithic architecture
- Use Eureka for monitoring and health checks
- Prepare for future microservices

### Option B: Split into Microservices
When ready, you can split into:
1. **User Service** (Port 8082)
2. **Event Service** (Port 8083)
3. **Registration Service** (Port 8084)
4. **API Gateway** (Port 8080)

All services will register with Eureka automatically.

## Configuration Files

### Eureka Server - application.yml
```yaml
server:
  port: 8761

spring:
  application:
    name: eureka-server

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```

### Backend - application.properties
```properties
spring.application.name=matchy-backend
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
```

## Ports Summary

| Service | Port | URL |
|---------|------|-----|
| Eureka Server | 8761 | http://localhost:8761 |
| Backend API | 8081 | http://localhost:8081 |
| Frontend | 4200 | http://localhost:4200 |
| MySQL | 3307 | localhost:3307 |

## Monitoring

### Eureka Dashboard
- URL: `http://localhost:8761`
- Shows all registered services
- Real-time status updates
- Instance metadata

### Actuator Endpoints
- Health: `http://localhost:8081/actuator/health`
- Info: `http://localhost:8081/actuator/info`
- Metrics: `http://localhost:8081/actuator/metrics`

## Production Considerations

When deploying to production:

1. **Enable Security**
   - Add Spring Security
   - Protect Eureka Dashboard
   - Secure actuator endpoints

2. **High Availability**
   - Run multiple Eureka Server instances
   - Configure peer awareness
   - Use load balancer

3. **Enable Self-Preservation**
   - Set `enable-self-preservation: true`
   - Prevents mass de-registration

4. **Configure Timeouts**
   - Adjust lease renewal intervals
   - Set appropriate timeouts
   - Configure retry logic

5. **Use HTTPS**
   - Enable SSL/TLS
   - Use secure URLs
   - Configure certificates

## Resources

- [Spring Cloud Netflix Eureka](https://spring.io/projects/spring-cloud-netflix)
- [Eureka Wiki](https://github.com/Netflix/eureka/wiki)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Microservices Patterns](https://microservices.io/patterns/service-registry.html)

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify configuration files
4. Check port availability
5. Ensure correct startup order

---

**Note:** This setup prepares your application for microservices architecture while maintaining your current monolithic structure. You can migrate to full microservices gradually when needed.

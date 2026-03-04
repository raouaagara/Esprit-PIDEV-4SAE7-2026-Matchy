# Matchy Freelance Platform - Microservices Edition

A modern freelance platform built with Spring Boot microservices architecture and Angular frontend.

## 🎯 Features

- **User Management**: Company and Freelancer roles
- **Project Management**: Create, browse, and manage projects
- **Milestone System**: Break projects into manageable milestones
- **Application Workflow**: Apply, interview, accept/reject
- **Work Submission**: Submit and review completed work
- **Payment Tracking**: Monitor payments and earnings
- **Notifications**: Real-time notifications for all actions
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works on all devices

## 🏗️ Architecture

### Microservices
- **Eureka Server** (8761): Service discovery and registration
- **API Gateway** (8080): Single entry point, routing, CORS
- **PI Service** (9090): Main business logic and database operations

### Frontend
- **Angular App** (4200): Modern, responsive UI

### Database
- **MySQL** (3306): Persistent data storage

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.8+
- Angular CLI 17+

### Automated Startup (Windows)
```bash
# Double-click or run:
start-all-services.bat
```

This starts all services in the correct order automatically!

### Manual Startup
```bash
# Terminal 1: Eureka Server
cd eureka-server
./mvnw spring-boot:run

# Terminal 2: PI Service (wait 30 seconds)
cd PI
./mvnw spring-boot:run -DskipTests

# Terminal 3: API Gateway (wait 20 seconds)
cd api-gateway
./mvnw spring-boot:run

# Terminal 4: Frontend (wait 20 seconds)
cd matchy-angular
ng serve
```

## 📚 Documentation

- **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)** - Get started in 5 minutes
- **[MICROSERVICES_SETUP.md](MICROSERVICES_SETUP.md)** - Detailed setup and configuration
- **[ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md)** - Visual architecture overview

## 🔗 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:4200 | Angular application |
| API Gateway | http://localhost:8080 | API entry point |
| Eureka Dashboard | http://localhost:8761 | Service registry |
| PI Service | http://localhost:9090 | Direct backend access |

## 🧪 Testing

### Verify Services
```bash
# Check Eureka Dashboard
open http://localhost:8761

# Test Gateway
curl http://localhost:8080/api/auth/test

# Test Direct Access
curl http://localhost:9090/api/auth/test
```

### Test User Accounts
```
Company Account:
- Email: company@test.com
- Password: password123

Freelancer Account:
- Email: freelancer@test.com
- Password: password123
```

## 📁 Project Structure

```
TASKK/
├── eureka-server/              # Service Discovery
│   ├── src/
│   └── pom.xml
├── api-gateway/                # API Gateway
│   ├── src/
│   └── pom.xml
├── PI/                         # Main Backend Service
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── tn/esprit/pi/
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── entity/
│   │       │       ├── dto/
│   │       │       └── security/
│   │       └── resources/
│   └── pom.xml
├── matchy-angular/             # Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── frontoffice/   # Freelancer interface
│   │   │   ├── backoffice/    # Company interface
│   │   │   └── shared/        # Shared components
│   │   └── styles/
│   └── package.json
├── start-all-services.bat      # Automated startup
├── start-eureka.bat
├── start-gateway.bat
├── start-pi-service.bat
└── README_MICROSERVICES.md     # This file
```

## 🛠️ Configuration

### Frontend API URL
Edit `matchy-angular/src/environments/environment.ts`:

```typescript
// Development (direct access)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:9090'
};

// Production (through gateway)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Database Configuration
Edit `PI/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/PITASK
spring.datasource.username=root
spring.datasource.password=your_password
```

## 🔐 Security

- JWT-based authentication
- Role-based authorization (COMPANY, FREELANCER)
- Password encryption with BCrypt
- CORS configuration in API Gateway
- Secure token storage in localStorage

## 📊 Monitoring

### Eureka Dashboard
- URL: http://localhost:8761
- View all registered services
- Monitor service health
- Check instance information

### Gateway Actuator
```bash
# Health check
curl http://localhost:8080/actuator/health

# View routes
curl http://localhost:8080/actuator/gateway/routes

# Metrics
curl http://localhost:8080/actuator/metrics
```

## 🐛 Troubleshooting

### Services Not Registering
1. Ensure Eureka is running first
2. Wait 30 seconds for registration
3. Check service logs for errors
4. Verify `eureka.client.enabled=true`

### Gateway Not Routing
1. Check Eureka dashboard shows PI service
2. Verify service name is `PI` (case-sensitive)
3. Check gateway logs
4. Test direct access to PI service

### CORS Errors
1. Verify gateway CORS configuration
2. Check allowed origins include `http://localhost:4200`
3. Ensure requests go through gateway

### Port Conflicts
```bash
# Windows - Find process using port
netstat -ano | findstr :8761

# Kill process
taskkill /PID <process_id> /F
```

## 🚀 Deployment

### Development
Use direct access to services for faster development:
- Frontend → PI Service (9090)

### Staging/Production
Use gateway for production-like setup:
- Frontend → API Gateway (8080) → Services

### Docker (Future)
```bash
docker-compose up
```

## 📈 Scalability

### Current Setup
- 1 Eureka instance
- 1 Gateway instance
- 1 PI Service instance

### Scale PI Service
```bash
# Start multiple instances
java -jar PI.jar --server.port=9090
java -jar PI.jar --server.port=9091
java -jar PI.jar --server.port=9092

# Gateway automatically load balances!
```

## 🎓 Learning Resources

- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Netflix Eureka](https://github.com/Netflix/eureka)
- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
- [Angular Documentation](https://angular.io/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- Backend: Spring Boot Microservices
- Frontend: Angular 17
- Database: MySQL 8
- Architecture: Microservices with Eureka & Gateway

## 🎉 Success Checklist

- [ ] All services start without errors
- [ ] Eureka dashboard shows 2 registered services
- [ ] Gateway routes requests correctly
- [ ] Frontend connects to backend
- [ ] Login/Register works
- [ ] Projects can be created and browsed
- [ ] Applications workflow functions
- [ ] Notifications appear
- [ ] Dark mode works
- [ ] No CORS errors

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review service logs
3. Check Eureka dashboard
4. Verify configuration files

## 🔄 Updates

### Version 2.0 - Microservices Architecture
- ✅ Added Eureka Server for service discovery
- ✅ Added API Gateway for routing
- ✅ Configured PI Service as Eureka client
- ✅ Implemented CORS in gateway
- ✅ Created automated startup scripts
- ✅ Added comprehensive documentation

### Version 1.0 - Monolithic Application
- ✅ User authentication and authorization
- ✅ Project and milestone management
- ✅ Application workflow
- ✅ Work submission and review
- ✅ Payment tracking
- ✅ Notifications system
- ✅ Dark mode support

## 🎯 Roadmap

- [ ] Add Config Server for centralized configuration
- [ ] Implement Circuit Breaker with Resilience4j
- [ ] Add distributed tracing with Zipkin
- [ ] Implement API rate limiting
- [ ] Add Redis caching
- [ ] Implement message queue (RabbitMQ/Kafka)
- [ ] Add Prometheus + Grafana monitoring
- [ ] Create Docker containers
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline

---

**Happy Coding! 🚀**

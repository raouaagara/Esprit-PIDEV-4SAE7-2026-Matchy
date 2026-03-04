@echo off
echo ========================================
echo Starting API Gateway (Port 8080)
echo ========================================
echo Make sure Eureka Server is running first!
timeout /t 5
cd api-gateway
call mvnw.cmd spring-boot:run

@echo off
echo ========================================
echo Starting Matchy Microservices Platform
echo ========================================
echo.
echo This will start all services in order:
echo 1. Eureka Server (Port 8761)
echo 2. PI Service (Port 9090)
echo 3. API Gateway (Port 8080)
echo 4. Angular Frontend (Port 4200)
echo.
echo Press any key to continue...
pause > nul

echo.
echo [1/4] Starting Eureka Server...
start "Eureka Server" cmd /k "cd eureka-server && mvnw.cmd spring-boot:run"
echo Waiting 30 seconds for Eureka to start...
timeout /t 30 /nobreak

echo.
echo [2/4] Starting PI Service...
start "PI Service" cmd /k "cd PI && mvnw.cmd spring-boot:run -DskipTests"
echo Waiting 25 seconds for PI Service to register...
timeout /t 25 /nobreak

echo.
echo [3/4] Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvnw.cmd spring-boot:run"
echo Waiting 20 seconds for Gateway to start...
timeout /t 20 /nobreak

echo.
echo [4/4] Starting Angular Frontend...
start "Angular Frontend" cmd /k "cd matchy-angular && ng serve"

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Access points:
echo - Eureka Dashboard: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - PI Service: http://localhost:9090
echo - Frontend: http://localhost:4200
echo.
echo Check each window for startup status.
echo Press any key to exit this window...
pause > nul

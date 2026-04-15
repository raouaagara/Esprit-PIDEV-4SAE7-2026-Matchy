@echo off
echo ===============================================
echo   MATCHY - Demarrage microservices (3 services)
echo ===============================================

:: 1. user-service
echo [1/3] Demarrage user-service (port 8081)...
start "user-service" cmd /k "cd /d %~dp0user-service && mvn spring-boot:run"
timeout /t 10 /nobreak >nul

:: 2. profile_project_service
echo [2/3] Demarrage profile_project_service (port 8082)...
start "profile_project_service" cmd /k "cd /d %~dp0profile_project_service && mvn spring-boot:run"
timeout /t 10 /nobreak >nul

:: 3. api-gateway
echo [3/3] Demarrage api-gateway (port 8080)...
start "api-gateway" cmd /k "cd /d %~dp0api-gateway && mvn spring-boot:run"

echo.
echo ============================================
echo   Services en cours de demarrage
echo   API Gateway:             http://localhost:8080
echo   user-service:            http://localhost:8081
echo   profile_project_service: http://localhost:8082
echo ============================================

@echo off
echo ========================================
echo   Matchy Platform - Development Setup
echo ========================================
echo.

echo Starting Backend (Spring Boot)...
start "Matchy Backend" cmd /k "cd backend && mvn spring-boot:run"

timeout /t 5 /nobreak >nul

echo Starting Frontend (Angular)...
start "Matchy Frontend" cmd /k "npm start"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:4200
echo.
echo Press any key to exit this window...
pause >nul

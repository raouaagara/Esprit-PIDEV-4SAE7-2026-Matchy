@echo off
REM Matchy Development Startup Script for Windows
echo Starting Matchy Development Environment...
echo.

REM Check if backend is running
echo Checking backend status...
curl -s http://localhost:9090/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo Backend is already running on port 9090
) else (
    echo Backend is not running. Please start it manually:
    echo    cd PI
    echo    mvnw.cmd spring-boot:run
    echo.
)

REM Start frontend
echo Starting Angular frontend...
cd matchy-angular
call npm start

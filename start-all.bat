@echo off
:: =============================================
::  MATCHY - Démarrage sous Windows
:: =============================================

echo.
echo ╔══════════════════════════════════════╗
echo ║   MATCHY - Démarrage des services    ║
echo ╠══════════════════════════════════════╣
echo ║  1. Eureka Server    → port 8761     ║
echo ║  2. API Gateway      → port 8080     ║
echo ║  3. Backend (mono)   → port 8081     ║
echo ╚══════════════════════════════════════╝
echo.

:: 1. Eureka Server
echo [1/3] Démarrage Eureka Server (port 8761)...
start "Eureka Server" cmd /k "cd /d %~dp0eureka-server && mvn spring-boot:run"
echo Attente 20 secondes...
timeout /t 20 /nobreak >nul
echo OK - Eureka démarré !

:: 2. API Gateway
echo.
echo [2/3] Démarrage API Gateway (port 8080)...
start "API Gateway" cmd /k "cd /d %~dp0api-gateway && mvn spring-boot:run"
echo Attente 15 secondes...
timeout /t 15 /nobreak >nul
echo OK - Gateway démarrée !

:: 3. Backend
echo.
echo [3/3] Démarrage Backend (port 8081)...
start "Backend" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"
echo Attente 15 secondes...
timeout /t 15 /nobreak >nul
echo OK - Backend démarré !

echo.
echo ╔══════════════════════════════════════════════════╗
echo ║       TOUS LES SERVICES SONT DÉMARRÉS !          ║
echo ╠══════════════════════════════════════════════════╣
echo ║  Eureka   : http://localhost:8761  (admin/admin123)
echo ║  Gateway  : http://localhost:8080/api
echo ║  Backend  : http://localhost:8081
echo ╠══════════════════════════════════════════════════╣
echo ║  Lancer le frontend dans un autre terminal :
echo ║  cd frontend ^&^& npm install ^&^& ng serve
echo ╚══════════════════════════════════════════════════╝
echo.
pause

@echo off
echo ========================================
echo Starting Matchy Backend (Port 9090)
echo ========================================
echo.
cd PI
echo Starting Spring Boot application...
echo Please wait, this may take 30-60 seconds...
echo.
.\mvnw.cmd spring-boot:run -DskipTests

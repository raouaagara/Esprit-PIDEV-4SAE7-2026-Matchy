@echo off
echo ========================================
echo Starting PI Service (Port 9090)
echo ========================================
echo Make sure Eureka Server is running first!
timeout /t 5
cd PI
call mvnw.cmd spring-boot:run -DskipTests

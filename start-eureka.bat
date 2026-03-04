@echo off
echo ========================================
echo Starting Eureka Server (Port 8761)
echo ========================================
cd eureka-server
call mvnw.cmd spring-boot:run

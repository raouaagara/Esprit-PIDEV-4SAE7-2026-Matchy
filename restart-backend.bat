@echo off
echo =========================================
echo Restarting Matchy Backend
echo =========================================

cd PI

echo.
echo Step 1: Cleaning previous build...
call mvnw.cmd clean

echo.
echo Step 2: Compiling...
call mvnw.cmd compile -DskipTests

echo.
echo Step 3: Starting backend...
echo Backend will start on http://localhost:9090
echo Press Ctrl+C to stop
echo.

call mvnw.cmd spring-boot:run -DskipTests

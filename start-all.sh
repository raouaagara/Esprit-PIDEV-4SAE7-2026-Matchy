#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "================================================"
echo "  MATCHY - Demarrage microservices (3 services)"
echo "================================================"

# 1. user-service
echo ">>> [1/3] user-service (port 8081)..."
cd "$BASE_DIR/user-service"
mvn spring-boot:run -q &
sleep 10

# 2. profile_project_service
echo ">>> [2/3] profile_project_service (port 8082)..."
cd "$BASE_DIR/profile_project_service"
mvn spring-boot:run -q &
sleep 10

# 3. api-gateway
echo ">>> [3/3] api-gateway (port 8080)..."
cd "$BASE_DIR/api-gateway"
mvn spring-boot:run -q &

echo ""
echo "Tous les services sont démarrés !"
echo "API Gateway:          http://localhost:8080"
echo "user-service:         http://localhost:8081"
echo "profile_project_service: http://localhost:8082"

wait

#!/bin/bash
# =============================================
#  MATCHY - Démarrage complet de l'application
# =============================================

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   MATCHY - Démarrage des services    ║"
echo "╠══════════════════════════════════════╣"
echo "║  1. Eureka Server    → port 8761     ║"
echo "║  2. API Gateway      → port 8080     ║"
echo "║  3. Backend (mono)   → port 8081     ║"
echo "║  4. Frontend Angular → port 4200     ║"
echo "╚══════════════════════════════════════╝"
echo ""

# 1. Eureka Server
echo ">>> [1/4] Démarrage Eureka Server (port 8761)..."
cd "$BASE_DIR/eureka-server"
mvn spring-boot:run -q &
EUREKA_PID=$!
echo "    Eureka PID=$EUREKA_PID - Attente 20s..."
sleep 20
echo "    ✅ Eureka démarré !"

# 2. API Gateway
echo ""
echo ">>> [2/4] Démarrage API Gateway (port 8080)..."
cd "$BASE_DIR/api-gateway"
mvn spring-boot:run -q &
GW_PID=$!
echo "    Gateway PID=$GW_PID - Attente 15s..."
sleep 15
echo "    ✅ API Gateway démarrée !"

# 3. Backend
echo ""
echo ">>> [3/4] Démarrage Backend (port 8081)..."
cd "$BASE_DIR/backend"
mvn spring-boot:run -q &
BACKEND_PID=$!
echo "    Backend PID=$BACKEND_PID - Attente 15s..."
sleep 15
echo "    ✅ Backend démarré !"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║          ✅ TOUS LES SERVICES DÉMARRÉS !         ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Eureka Dashboard : http://localhost:8761         ║"
echo "║                     (admin / admin123)            ║"
echo "║  API Gateway      : http://localhost:8080/api     ║"
echo "║  Backend direct   : http://localhost:8081         ║"
echo "║  H2 Console       : http://localhost:8081/h2-con  ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Frontend : cd frontend && npm install && ng serve║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Comptes demo:                                    ║"
echo "║  Admin      : admin@matchy.tn / admin123          ║"
echo "║  Client     : sara@matchy.tn / client123          ║"
echo "║  Freelancer : karim@matchy.tn / freelancer123     ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

wait

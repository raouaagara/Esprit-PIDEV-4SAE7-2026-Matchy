#!/bin/bash

# Matchy Development Startup Script
echo "🚀 Starting Matchy Development Environment..."
echo ""

# Check if backend is running
echo "📡 Checking backend status..."
if curl -s http://localhost:9090/actuator/health > /dev/null 2>&1; then
    echo "✅ Backend is already running on port 9090"
else
    echo "⚠️  Backend is not running. Please start it manually:"
    echo "   cd PI && ./mvnw spring-boot:run"
    echo ""
fi

# Start frontend
echo "🎨 Starting Angular frontend..."
cd matchy-angular
npm start

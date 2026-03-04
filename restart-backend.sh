#!/bin/bash

echo "========================================="
echo "Restarting Matchy Backend"
echo "========================================="

cd PI

echo ""
echo "Step 1: Cleaning previous build..."
./mvnw clean

echo ""
echo "Step 2: Compiling..."
./mvnw compile -DskipTests

echo ""
echo "Step 3: Starting backend..."
echo "Backend will start on http://localhost:9090"
echo "Press Ctrl+C to stop"
echo ""

./mvnw spring-boot:run -DskipTests

#!/bin/bash

echo "🛑 Parando Portal Direx..."

# Matar processos do Spring Boot
pkill -f "spring-boot:run"

# Matar processos do Angular
pkill -f "ng serve"

echo "✅ Aplicação parada!"

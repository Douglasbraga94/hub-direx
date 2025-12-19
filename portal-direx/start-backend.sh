#!/bin/bash

echo "🚀 Iniciando Backend Spring Boot..."
echo ""

cd backend

# Carregar variáveis do .env
export $(cat ../.env | grep -v '^#' | xargs)

# Executar o Spring Boot
./mvnw spring-boot:run

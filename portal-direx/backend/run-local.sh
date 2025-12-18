#!/bin/bash

# Script para executar o backend localmente (fora do Docker)

echo "🚀 Iniciando Portal Direx Backend localmente..."

# Carregar variáveis de ambiente do .env
if [ -f ../.env ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

# Verificar se Maven está instalado
if ! command -v ./mvnw &> /dev/null; then
    echo "❌ Maven Wrapper não encontrado"
    exit 1
fi

# Limpar e compilar
echo "📦 Compilando projeto..."
./mvnw clean package -DskipTests

# Executar aplicação
echo "✅ Iniciando aplicação na porta ${BACKEND_PORT:-8080}..."
java -jar target/portal-direx-backend-1.0.0.jar

# Se preferir executar diretamente com Maven (modo desenvolvimento)
# ./mvnw spring-boot:run

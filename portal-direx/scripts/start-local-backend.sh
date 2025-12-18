#!/bin/bash

# Script para iniciar apenas o backend localmente

echo "======================================"
echo "   PORTAL DIREX - Backend Local"
echo "======================================"
echo ""

cd "$(dirname "$0")/.."

# Verificar se o .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📝 Copie o .env.example para .env e configure suas variáveis"
    exit 1
fi

# Carregar variáveis
export $(cat .env | grep -v '^#' | xargs)

echo "✅ Variáveis de ambiente carregadas"
echo "📊 Banco: ${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "👤 Usuário: ${DB_USER}"
echo ""

# Ir para a pasta do backend
cd backend

# Verificar se já foi compilado
if [ ! -f target/portal-direx-backend-1.0.0.jar ]; then
    echo "📦 Compilando projeto..."
    ./mvnw clean package -DskipTests
fi

echo ""
echo "🚀 Iniciando backend na porta ${BACKEND_PORT:-8080}..."
echo ""

# Executar
java -jar target/portal-direx-backend-1.0.0.jar

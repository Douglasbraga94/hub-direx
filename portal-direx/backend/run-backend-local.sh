#!/bin/bash

echo "========================================"
echo "  Portal Direx - Backend Local"
echo "========================================"
echo ""

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não está instalado!"
    echo "Instale com: brew install maven"
    exit 1
fi

# Carregar variáveis do .env
if [ -f "../.env" ]; then
    echo "📄 Carregando variáveis de ambiente do .env..."
    export $(grep -v '^#' ../.env | xargs)
else
    echo "❌ Arquivo .env não encontrado!"
    exit 1
fi

echo "✅ Variáveis carregadas:"
echo "   DB_HOST: $DB_HOST"
echo "   DB_NAME: $DB_NAME"
echo "   DB_USER: $DB_USER"
echo ""

# Compilar
echo "🔨 Compilando o projeto..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar o projeto!"
    exit 1
fi

echo ""
echo "✅ Compilação concluída!"
echo ""
echo "🚀 Iniciando o backend..."
echo "   URL: http://localhost:8080"
echo "   Pressione Ctrl+C para parar"
echo ""
echo "========================================"
echo ""

# Executar
java -jar target/portal-direx-backend-1.0.0.jar

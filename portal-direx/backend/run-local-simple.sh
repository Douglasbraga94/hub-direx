#!/bin/bash

# Script simples para rodar o backend localmente

echo "=================================="
echo "Portal Direx - Backend Local"
echo "=================================="
echo ""

# Carregar variáveis do .env
if [ -f "../.env" ]; then
    echo "Carregando variáveis de ambiente do .env..."
    export $(cat ../.env | grep -v '^#' | grep -v '^$' | xargs)
    echo "✓ Variáveis carregadas"
else
    echo "⚠ Arquivo .env não encontrado!"
    echo "Execute: cp ../.env.example ../.env"
    exit 1
fi

echo ""
echo "Configuração do Banco:"
echo "  Host: $DB_HOST"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Port: $DB_PORT"
echo ""

# Verificar se tem Maven instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven não está instalado!"
    echo ""
    echo "Instale o Maven:"
    echo "  macOS: brew install maven"
    echo "  Linux: sudo apt install maven"
    exit 1
fi

echo "Iniciando o backend..."
echo "Acesse: http://localhost:8080"
echo ""
echo "Pressione Ctrl+C para parar"
echo "=================================="
echo ""

# Executar Spring Boot
mvn spring-boot:run

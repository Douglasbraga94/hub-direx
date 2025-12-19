#!/bin/bash

echo "🚀 Portal Direx - Quick Start"
echo "=============================="

# Parar containers antigos
echo "📦 Parando containers antigos..."
docker-compose down

# Limpar cache
echo "🧹 Limpando cache do Docker..."
docker builder prune -f

# Build com timeout
echo "🔨 Construindo imagens (isso pode levar 5-10 minutos)..."
timeout 600 docker-compose build || {
    echo "❌ Build travou ou excedeu 10 minutos"
    echo "💡 Tente rodar localmente com: cd backend && mvn spring-boot:run"
    exit 1
}

# Subir containers
echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar inicialização
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Status
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "✅ Portal Direx iniciado!"
echo "🌐 Frontend: http://localhost"
echo "🔌 Backend: http://localhost:8080"
echo ""
echo "📝 Para ver logs: docker-compose logs -f"

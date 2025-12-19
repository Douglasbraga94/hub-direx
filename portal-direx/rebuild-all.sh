#!/bin/bash

echo "================================================"
echo "🧹 LIMPANDO CACHE DO DOCKER..."
echo "================================================"

# Parar todos os containers
docker-compose down

# Remover containers antigos do portal-direx
docker rm -f portal-direx-backend portal-direx-frontend 2>/dev/null || true

# Remover imagens antigas
docker rmi portal-direx-backend portal-direx-frontend 2>/dev/null || true

# Limpar cache de build
docker builder prune -f

echo ""
echo "================================================"
echo "🔨 RECONSTRUINDO BACKEND..."
echo "================================================"
docker-compose build --no-cache backend

echo ""
echo "================================================"
echo "🔨 RECONSTRUINDO FRONTEND..."
echo "================================================"
docker-compose build --no-cache frontend

echo ""
echo "================================================"
echo "🚀 INICIANDO CONTAINERS..."
echo "================================================"
docker-compose up -d

echo ""
echo "================================================"
echo "✅ CONCLUÍDO!"
echo "================================================"
echo ""
echo "📊 Status dos containers:"
docker-compose ps
echo ""
echo "📝 Para ver os logs:"
echo "   Backend:  docker-compose logs -f backend"
echo "   Frontend: docker-compose logs -f frontend"
echo ""
echo "🌐 Acessar aplicação:"
echo "   Frontend: http://localhost"
echo "   Backend:  http://localhost:8080"
echo ""

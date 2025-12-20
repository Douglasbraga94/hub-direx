#!/bin/bash

echo "🔄 Iniciando rebuild completo do backend..."

# Parar todos os containers
echo "⏹️  Parando containers..."
docker-compose down

# Remover a imagem antiga do backend
echo "🗑️  Removendo imagem antiga do backend..."
docker rmi -f portal-direx-backend 2>/dev/null || true

# Limpar volumes órfãos
echo "🧹 Limpando volumes órfãos..."
docker volume prune -f

# Limpar cache de build
echo "🧹 Limpando cache de build..."
docker builder prune -f

# Reconstruir apenas o backend sem cache
echo "🔨 Reconstruindo backend sem cache..."
docker-compose build --no-cache backend

# Subir os containers
echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar 10 segundos
echo "⏳ Aguardando 10 segundos para containers iniciarem..."
sleep 10

# Mostrar status
echo ""
echo "📊 Status dos containers:"
docker-compose ps

echo ""
echo "📋 Últimos logs do backend:"
docker-compose logs --tail=30 backend

echo ""
echo "✅ Rebuild completo finalizado!"
echo "💡 Para ver logs em tempo real: docker-compose logs -f backend"

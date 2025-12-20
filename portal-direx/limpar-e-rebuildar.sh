#!/bin/bash

echo "======================================"
echo "LIMPEZA TOTAL E REBUILD DO BACKEND"
echo "======================================"

# Parar todos os containers
echo "1. Parando containers..."
docker-compose down

# Remover imagem do backend
echo "2. Removendo imagem do backend..."
docker rmi portal-direx-backend 2>/dev/null || true

# Limpar diretório target do Maven no backend
echo "3. Limpando diretório target do Maven..."
rm -rf backend/target

# Limpar cache do Maven dentro do Docker
echo "4. Removendo volumes do Docker..."
docker volume prune -f

# Limpar build cache do Docker
echo "5. Limpando build cache..."
docker builder prune -af

# Rebuild sem cache
echo "6. Reconstruindo backend do zero (isso pode demorar)..."
docker-compose build --no-cache --progress=plain backend

# Subir os containers
echo "7. Iniciando containers..."
docker-compose up -d

echo ""
echo "✓ Rebuild completo!"
echo "✓ Verifique os logs com: docker-compose logs -f backend"
echo ""

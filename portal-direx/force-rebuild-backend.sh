#!/bin/bash

echo "🔄 Forçando rebuild completo do backend..."

# Parar todos os containers
echo "1️⃣ Parando containers..."
docker-compose down

# Remover a imagem do backend
echo "2️⃣ Removendo imagem antiga do backend..."
docker rmi -f portal-direx-backend 2>/dev/null || true
docker rmi -f portal-direx/backend 2>/dev/null || true

# Limpar cache de build
echo "3️⃣ Limpando cache de build..."
docker builder prune -f

# Reconstruir sem cache
echo "4️⃣ Reconstruindo backend sem cache..."
docker-compose build --no-cache backend

# Subir os containers
echo "5️⃣ Iniciando containers..."
docker-compose up -d

# Mostrar logs
echo "6️⃣ Mostrando logs do backend..."
docker-compose logs -f backend

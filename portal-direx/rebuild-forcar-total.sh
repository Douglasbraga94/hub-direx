#!/bin/bash

echo "======================================"
echo "🧹 LIMPEZA TOTAL E REBUILD FORÇADO"
echo "======================================"

# 1. Parar todos os containers
echo "1. Parando containers..."
docker-compose down

# 2. Remover containers existentes
echo "2. Removendo containers..."
docker rm -f portal-direx-backend portal-direx-frontend 2>/dev/null || true

# 3. Remover imagens
echo "3. Removendo imagens antigas..."
docker rmi -f portal-direx-backend portal-direx-frontend 2>/dev/null || true
docker rmi -f portal-direx_backend portal-direx_frontend 2>/dev/null || true

# 4. Limpar todo o cache de build do Docker
echo "4. Limpando cache de build..."
docker builder prune -af

# 5. Limpar volumes órfãos
echo "5. Limpando volumes..."
docker volume prune -f

# 6. Verificar se os arquivos Java estão corretos localmente
echo "6. Verificando arquivos Java..."
if grep -q "public class Sistema" backend/src/main/java/com/portaldirex/model/Sistema.java; then
    echo "✅ Sistema.java está correto"
else
    echo "❌ ERRO: Sistema.java não contém a classe Sistema!"
    exit 1
fi

if grep -q "public class Usuario" backend/src/main/java/com/portaldirex/model/Usuario.java; then
    echo "✅ Usuario.java está correto"
else
    echo "❌ ERRO: Usuario.java não contém a classe Usuario!"
    exit 1
fi

# 7. Limpar target local se existir
echo "7. Limpando target local..."
rm -rf backend/target

# 8. Rebuild completo SEM cache
echo "8. Reconstruindo backend (pode demorar)..."
docker-compose build --no-cache --progress=plain backend

echo ""
echo "======================================"
echo "✅ BUILD COMPLETO!"
echo "======================================"
echo ""
echo "Agora execute: docker-compose up -d"
echo ""

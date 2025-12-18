#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento

echo "🚀 Iniciando Portal Direx em modo DESENVOLVIMENTO..."

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker Desktop primeiro."
    exit 1
fi

# Usar arquivo de desenvolvimento
if [ -f .env.development ]; then
    echo "📋 Usando configurações de desenvolvimento..."
    cp .env.development .env
else
    echo "⚠️  Arquivo .env.development não encontrado. Usando .env.example..."
    cp .env.example .env
fi

# Parar containers antigos se existirem
echo "🛑 Parando containers antigos..."
docker-compose down

# Construir e iniciar
echo "🔨 Construindo e iniciando serviços..."
docker-compose up -d --build

# Aguardar serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Verificar status
echo ""
echo "📊 Status dos serviços:"
docker-compose ps

echo ""
echo "✅ Portal Direx iniciado com sucesso!"
echo ""
echo "🌐 Frontend: http://localhost:4200"
echo "🔌 Backend: http://localhost:8080/api"
echo "🗄️  Database: localhost:3306"
echo ""
echo "📝 Para ver logs: docker-compose logs -f"
echo "🛑 Para parar: docker-compose down"

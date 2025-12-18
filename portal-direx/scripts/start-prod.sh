#!/bin/bash

# Script para iniciar o ambiente de produção

echo "🚀 Iniciando Portal Direx em modo PRODUÇÃO..."

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📋 Copie o .env.example e configure com valores de produção:"
    echo "   cp .env.example .env"
    exit 1
fi

# Validar variáveis críticas
echo "🔒 Validando configurações de segurança..."

# Ler variáveis
source .env

# Verificar senha do banco
if [ "$DB_ROOT_PASSWORD" = "root_password_super_secreto_123" ]; then
    echo "⚠️  ATENÇÃO: Você está usando a senha padrão do banco!"
    echo "   Configure uma senha forte no arquivo .env"
    read -p "Deseja continuar mesmo assim? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar JWT secret
if [ "$JWT_SECRET" = "sua_chave_secreta_jwt_muito_segura_com_pelo_menos_256_bits_de_entropia" ]; then
    echo "⚠️  ATENÇÃO: Você está usando o JWT_SECRET padrão!"
    echo "   Gere uma chave segura: openssl rand -base64 64"
    read -p "Deseja continuar mesmo assim? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Fazer backup se banco já existe
if docker volume ls | grep -q portal-direx_mysql_data; then
    echo "💾 Fazendo backup do banco de dados..."
    docker-compose up -d db
    sleep 5
    docker exec portal-direx-db mysqldump -u root -p$DB_ROOT_PASSWORD $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql
    echo "✅ Backup salvo!"
    docker-compose down
fi

# Construir e iniciar
echo "🔨 Construindo e iniciando serviços em modo produção..."
docker-compose up -d --build

# Aguardar serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 15

# Verificar status
echo ""
echo "📊 Status dos serviços:"
docker-compose ps

# Verificar health
echo ""
echo "🏥 Verificando saúde dos serviços..."
sleep 5

if docker-compose ps | grep -q "healthy"; then
    echo "✅ Todos os serviços estão saudáveis!"
else
    echo "⚠️  Alguns serviços podem estar com problemas. Verifique os logs:"
    echo "   docker-compose logs"
fi

echo ""
echo "✅ Portal Direx iniciado em PRODUÇÃO!"
echo ""
echo "🌐 Frontend: http://localhost:${FRONTEND_PORT:-80}"
echo "🔌 Backend: http://localhost:${BACKEND_PORT:-8080}/api"
echo ""
echo "📝 Para ver logs: docker-compose logs -f"
echo "🛑 Para parar: docker-compose down"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Configure HTTPS em produção (use reverse proxy)"
echo "   - Configure backups automáticos do banco"
echo "   - Monitore os logs regularmente"

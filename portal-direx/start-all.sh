#!/bin/bash

echo "🔥 Portal Direx - Iniciando aplicação completa"
echo "=============================================="
echo ""

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "Copie o .env.example para .env e configure suas credenciais"
    exit 1
fi

echo "1️⃣  Iniciando Backend (porta 8080)..."
./start-backend.sh &
BACKEND_PID=$!

echo ""
echo "⏳ Aguardando backend iniciar..."
sleep 10

echo ""
echo "2️⃣  Iniciando Frontend (porta 4200)..."
./start-frontend.sh &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicação rodando!"
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend:  http://localhost:8080"
echo ""
echo "Para parar: Ctrl+C ou ./stop-all.sh"

# Esperar pelos processos
wait $BACKEND_PID $FRONTEND_PID

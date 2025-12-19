#!/bin/bash

echo "🚀 Iniciando Frontend Angular..."
echo ""

cd frontend

# Instalar dependências se não existir node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Executar o Angular
npm start

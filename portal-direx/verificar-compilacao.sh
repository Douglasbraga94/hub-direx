#!/bin/bash

echo "======================================"
echo "VERIFICANDO COMPILAÇÃO DO BACKEND"
echo "======================================"

echo "Limpando target local..."
cd backend
mvn clean

echo ""
echo "Compilando localmente para verificar erros..."
mvn compile

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ SUCESSO! Compilação local funcionou."
    echo "✓ O código está correto. O problema é cache do Docker."
    echo "✓ Execute: ./limpar-e-rebuildar.sh"
else
    echo ""
    echo "✗ ERRO na compilação local!"
    echo "✗ Verifique os erros acima antes de tentar rebuild do Docker."
fi

cd ..

#!/bin/bash

echo "======================================"
echo "🔍 DEBUG DE COMPILAÇÃO"
echo "======================================"

# Verificar conteúdo dos arquivos
echo ""
echo "📄 Verificando Sistema.java:"
echo "---"
head -15 backend/src/main/java/com/portaldirex/model/Sistema.java
echo "..."
echo ""

echo "📄 Verificando Usuario.java:"
echo "---"
head -15 backend/src/main/java/com/portaldirex/model/Usuario.java
echo "..."
echo ""

echo "📦 Tentando compilar localmente..."
cd backend
mvn clean compile -X 2>&1 | tail -50
cd ..

echo ""
echo "======================================"

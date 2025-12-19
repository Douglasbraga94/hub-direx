#!/bin/bash

# Script para gerar certificado SSL autoassinado para desenvolvimento
# Para produção, use certificados válidos (Let's Encrypt, etc.)

echo "🔐 Gerando certificado SSL autoassinado para desenvolvimento..."

# Criar diretório para certificados
mkdir -p ssl

# Gerar certificado autoassinado válido por 365 dias
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem \
  -out ssl/cert.pem \
  -subj "/C=BR/ST=Estado/L=Cidade/O=PortalDirex/CN=localhost"

echo "✅ Certificados SSL gerados em ./ssl/"
echo ""
echo "⚠️  ATENÇÃO: Este é um certificado autoassinado para DESENVOLVIMENTO."
echo "   O navegador vai mostrar aviso de segurança. Clique em 'Avançado' e 'Continuar'."
echo ""
echo "📦 Para PRODUÇÃO, use certificados válidos:"
echo "   - Let's Encrypt (gratuito): https://letsencrypt.org/"
echo "   - Cloudflare SSL"
echo "   - AWS Certificate Manager"
echo ""

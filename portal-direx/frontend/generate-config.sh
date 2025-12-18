#!/bin/sh
# Script para gerar config.json com variáveis de ambiente em runtime

cat > /usr/share/nginx/html/assets/config.json <<EOF
{
  "apiUrl": "${API_URL}"
}
EOF

echo "Config gerado com API_URL=${API_URL}"

# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package files primeiro para aproveitar cache do Docker
COPY package*.json ./
RUN npm install

# Copiar código fonte e configurações
COPY . .

RUN npm run build

# Stage 2: Runtime com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do nginx
RUN rm -rf ./*

COPY --from=build /app/dist/portal-direx-frontend/browser .

# Criar diretório assets se não existir
RUN mkdir -p assets

COPY generate-config.sh /docker-entrypoint.d/40-generate-config.sh
RUN chmod +x /docker-entrypoint.d/40-generate-config.sh

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80 || exit 1

# Nginx executará os scripts em /docker-entrypoint.d/ automaticamente
CMD ["nginx", "-g", "daemon off;"]

# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package files primeiro para aproveitar cache do Docker
COPY package*.json ./
RUN npm install

# Copiar código fonte e configurações
COPY . .

ARG API_URL
ENV API_URL=${API_URL}
RUN npm run build

# Stage 2: Runtime com Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do nginx
RUN rm -rf ./*

COPY --from=build /app/dist/portal-direx/browser .

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80 || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

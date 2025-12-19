FROM node:20-alpine AS build
WORKDIR /app

# Configurar npm para ser mais estável
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Copiar package files e instalar dependências com cache
COPY package*.json ./
RUN npm install --legacy-peer-deps --prefer-offline --no-audit

# Copiar código e build
COPY . .
RUN npm run build

# Runtime
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist/portal-direx-frontend/browser .
RUN mkdir -p assets

COPY generate-config.sh /docker-entrypoint.d/40-generate-config.sh
RUN chmod +x /docker-entrypoint.d/40-generate-config.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

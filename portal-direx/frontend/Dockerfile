# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps && \
    npm run build --configuration=production

# Stage 2: Runtime
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

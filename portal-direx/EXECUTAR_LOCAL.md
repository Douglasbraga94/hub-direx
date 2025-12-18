# Executar Portal Direx com Backend Local

Como o MySQL não aceita conexões do Docker, vamos rodar o backend localmente e apenas o frontend no Docker.

## Pré-requisitos

- Java 17+ instalado
- Maven instalado (ou use o Maven Wrapper incluído)
- Docker e Docker Compose para o frontend
- Arquivo `.env` configurado

## Passo 1: Configurar o .env

```bash
cd portal-direx
cp .env.example .env
nano .env
```

Configure especialmente:
```properties
DB_HOST=72.60.245.176
DB_NAME=db_portal_Direx
DB_PORT=3306
DB_USER=usr_portaldirex
DB_PASSWORD="#Usr8dbDIREX"  # Com aspas duplas
API_URL=http://localhost:8080/api

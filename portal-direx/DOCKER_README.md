# Portal Direx - Docker Setup

Guia completo para executar o Portal Direx usando Docker e Docker Compose.

## Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- **MySQL 8.0+ já instalado e configurado** (com as tabelas: usuarios, perfil, usuario_perfil, sistemas, gestor, auditoria_login)

## Configuração Rápida

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações reais. **IMPORTANTE:** 

- Configure `DB_HOST` com o endereço do seu servidor MySQL
- Configure `DB_USER` e `DB_PASSWORD` com suas credenciais do MySQL
- Altere `JWT_SECRET` para uma chave segura
- **O Docker NÃO criará um banco novo**. Ele conectará ao seu banco MySQL existente.

### 2. Iniciar os Serviços

```bash
# Iniciar backend e frontend (sem banco)
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
```

### 3. Acessar a Aplicação

- **Frontend:** http://localhost (ou porta configurada em FRONTEND_PORT)
- **Backend API:** http://localhost:8080/api

## Comandos Úteis

### Gerenciamento de Containers

```bash
# Parar todos os serviços
docker-compose down

# Reiniciar um serviço específico
docker-compose restart backend

# Reconstruir imagens após mudanças no código
docker-compose up -d --build

# Ver status dos serviços
docker-compose ps
```

### Logs e Debug

```bash
# Ver logs de todos os serviços
docker-compose logs

# Seguir logs em tempo real
docker-compose logs -f

# Ver últimas 100 linhas
docker-compose logs --tail=100

# Logs de um serviço específico
docker-compose logs -f frontend
```

### Acesso aos Containers

```bash
# Acessar shell do backend
docker exec -it portal-direx-backend sh

# Ver variáveis de ambiente de um container
docker exec portal-direx-backend env
```

## Estrutura dos Serviços

### 1. Backend (Spring Boot)
- Container: `portal-direx-backend`
- Porta: 8080
- Conecta ao MySQL externo via `DB_HOST`
- Health check: `/actuator/health`

### 2. Frontend (Angular + Nginx)
- Container: `portal-direx-frontend`
- Porta: 80 (ou FRONTEND_PORT)
- Depende: backend
- Servidor: Nginx otimizado

## Conectando ao Banco MySQL Externo

### Opções de Conexão

**1. MySQL no host local (mesma máquina do Docker):**
```properties
DB_HOST=host.docker.internal  # Windows/Mac
DB_HOST=172.17.0.1            # Linux

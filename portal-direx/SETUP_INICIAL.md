# Setup Inicial do Portal Direx

Este guia ajuda você a configurar o ambiente pela primeira vez.

## 1. Criar arquivo .env

O arquivo `.env` já foi criado com as configurações do banco de dados MySQL externo. Verifique se os valores estão corretos:

```bash
cat .env
```

Se precisar ajustar algo, edite o arquivo:

```bash
nano .env
# ou
vim .env
```

## 2. Importante - Permissões do MySQL

⚠️ **O usuário MySQL precisa ter permissão para conectar do IP da sua máquina.**

Se você receber erro `Access denied for user 'usr_portaldirex'@'SEU_IP'`, peça ao administrador do MySQL para executar:

```sql
-- Ver seu IP atual
-- Execute no terminal: curl ifconfig.me

-- Dar permissão ao usuário
GRANT ALL PRIVILEGES ON db_portal_Direx.* TO 'usr_portaldirex'@'SEU_IP_AQUI' IDENTIFIED BY '#Usr8dbDIREX';
FLUSH PRIVILEGES;

-- OU permitir de qualquer IP (menos seguro)
GRANT ALL PRIVILEGES ON db_portal_Direx.* TO 'usr_portaldirex'@'%' IDENTIFIED BY '#Usr8dbDIREX';
FLUSH PRIVILEGES;
```

## 3. Executar o Docker

```bash
# Primeira vez ou após mudanças
docker-compose down
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 4. Acessar a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api

## 5. Troubleshooting

### Erro: "The variable is not set"
O arquivo `.env` não existe ou está em branco. Verifique se está na pasta `portal-direx/`.

### Erro: "Access denied for user"
Problema de permissões do MySQL. Veja seção 2 acima.

### Erro: "eclipse-temurin alpine not found"
Você está em um Mac M1/M2. O Dockerfile já foi ajustado para usar a imagem correta.

### Frontend não conecta no backend
Verifique se o CORS está configurado corretamente no `.env`:
```
CORS_ORIGINS=http://localhost:4200,http://localhost:80,http://localhost
```

## 6. Parar os serviços

```bash
docker-compose down
```

## 7. Reconstruir do zero

```bash
docker-compose down
docker system prune -a  # Remove todas as imagens antigas
docker-compose up -d --build

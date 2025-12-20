# 🔧 Solução: MySQL Bloqueando Conexão

## 🔴 Erro Atual

```
Caused by: java.net.ConnectException: Connection refused
```

E anteriormente:

```
Host '45.224.198.56' is blocked because of many connection errors
```

## 📋 O Que Está Acontecendo

1. O backend Docker tenta conectar ao MySQL remoto (72.60.245.176)
2. O MySQL vê as tentativas vindas do seu IP público (45.224.198.56)
3. Após várias tentativas falhadas (provavelmente por senha incorreta), o MySQL bloqueou seu IP
4. Agora todas as conexões são recusadas

## ✅ Soluções

### Solução 1: Desbloquear IP no MySQL (RECOMENDADO)

**Execute no servidor MySQL (72.60.245.176):**

```bash
# Conectar ao MySQL como root
mysql -u root -p

# Desbloquear todos os hosts
FLUSH HOSTS;

# Verificar permissões do usuário
SHOW GRANTS FOR 'usr_portaldirex'@'%';

# Se necessário, recriar permissões
GRANT ALL PRIVILEGES ON db_portal_Direx.* TO 'usr_portaldirex'@'%' IDENTIFIED BY '#Usr8dbDIREX';
FLUSH PRIVILEGES;

# Sair
EXIT;
```

**Ou via linha de comando:**

```bash
mysqladmin flush-hosts -h 72.60.245.176 -u root -p
```

---

### Solução 2: Testar Conexão Antes do Docker

**Teste a conexão do seu computador:**

```bash
# Instalar cliente MySQL se não tiver
# Mac: brew install mysql-client
# Linux: sudo apt-get install mysql-client

# Testar conexão
mysql -h 72.60.245.176 -P 3306 -u usr_portaldirex -p'#Usr8dbDIREX' db_portal_Direx

# Se conectar com sucesso, teste uma query
SELECT COUNT(*) FROM sistemas;
```

**Se NÃO conectar:**
- A senha está incorreta
- Seu IP não tem permissão
- O firewall está bloqueando

---

### Solução 3: Verificar Firewall do MySQL

**No servidor MySQL, verifique se a porta 3306 está aberta:**

```bash
# Verificar se o MySQL está escutando em todas as interfaces
sudo netstat -tlnp | grep 3306

# Deve mostrar: 0.0.0.0:3306 (não 127.0.0.1:3306)

# Verificar firewall
sudo ufw status
sudo ufw allow 3306/tcp
```

**Editar configuração do MySQL se necessário:**

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Encontrar e alterar:
# bind-address = 127.0.0.1
# Para:
bind-address = 0.0.0.0

# Reiniciar MySQL
sudo systemctl restart mysql
```

---

### Solução 4: Usar Banco de Dados Local para Desenvolvimento

**Se não conseguir acessar o MySQL remoto, use um banco local:**

```yaml
# Adicionar ao docker-compose.yml
services:
  mysql:
    image: mysql:8.0
    container_name: portal-direx-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: db_portal_Direx
      MYSQL_USER: usr_portaldirex
      MYSQL_PASSWORD: Usr8dbDIREX
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - portal-network

volumes:
  mysql-data:
```

**Atualizar .env:**

```bash
DB_HOST=mysql
DB_PORT=3306
DB_NAME=db_portal_Direx
DB_USER=usr_portaldirex
DB_PASSWORD="Usr8dbDIREX"
```

**Importar dados do banco remoto:**

```bash
# Exportar do servidor remoto
mysqldump -h 72.60.245.176 -u usr_portaldirex -p'#Usr8dbDIREX' db_portal_Direx > backup.sql

# Importar no container local
docker exec -i portal-direx-mysql mysql -u usr_portaldirex -pUsr8dbDIREX db_portal_Direx < backup.sql
```

---

## 🧪 Testando a Solução

**Após desbloquear o IP, teste:**

```bash
# 1. Parar containers
docker-compose down

# 2. Testar conexão manual
mysql -h 72.60.245.176 -u usr_portaldirex -p'#Usr8dbDIREX' db_portal_Direx

# 3. Se funcionar, subir o Docker
docker-compose up -d

# 4. Ver logs do backend
docker-compose logs -f backend
```

**Logs de sucesso devem mostrar:**

```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
Started PortalDirexApplication in 5.234 seconds
```

---

## ⚠️ Prevenindo Bloqueios Futuros

**1. Aumentar limite de erros no MySQL:**

```sql
-- No servidor MySQL
SET GLOBAL max_connect_errors = 1000;
```

**2. Adicionar retry no Spring Boot:**

```properties
# application.properties
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2

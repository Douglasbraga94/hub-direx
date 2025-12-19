# 🚀 Executar Portal Direx Localmente (SEM Docker)

## Pré-requisitos

```bash
# Instalar Node.js (se não tiver)
brew install node

# Instalar Maven (se não tiver)
brew install maven

# Verificar instalações
node --version  # deve ser v18+
npm --version
mvn --version   # deve ser 3.6+
```

## Configuração Inicial

```bash
# 1. Entrar na pasta do projeto
cd portal-direx

# 2. Dar permissão aos scripts
chmod +x start-backend.sh
chmod +x start-frontend.sh
chmod +x start-all.sh
chmod +x stop-all.sh

# 3. Configurar o arquivo .env com suas credenciais do MySQL
# (o arquivo já existe, apenas ajuste se necessário)
nano .env
```

## Executar a Aplicação

### Opção 1 - Tudo de uma vez (Recomendado):

```bash
./start-all.sh
```

### Opção 2 - Backend e Frontend separados:

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

## Acessar a Aplicação

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080/api
- **Health Check:** http://localhost:8080/actuator/health

## Parar a Aplicação

```bash
./stop-all.sh
```

Ou pressione `Ctrl + C` nos terminais.

## Troubleshooting

### Backend não inicia:
```bash
# Verificar se o MySQL está acessível
telnet 72.60.245.176 3306

# Ver logs detalhados
cd backend
./mvnw spring-boot:run -X
```

### Frontend não inicia:
```bash
# Limpar node_modules e reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Porta já em uso:
```bash
# Matar processo na porta 8080
lsof -ti:8080 | xargs kill -9

# Matar processo na porta 4200
lsof -ti:4200 | xargs kill -9
```

## Vantagens desta Abordagem

✅ Build muito mais rápido (sem Docker)  
✅ Hot reload automático no frontend  
✅ Logs mais claros e fáceis de debugar  
✅ Menos uso de memória  
✅ Perfeito para desenvolvimento local  

## Para Produção

Quando estiver pronto para produção, você pode voltar a usar Docker com os Dockerfiles otimizados.

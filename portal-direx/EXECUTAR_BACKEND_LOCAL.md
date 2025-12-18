# Executar Backend Localmente

Como o Docker não consegue conectar ao MySQL devido às permissões de IP, execute o backend localmente na sua máquina.

## Pré-requisitos

Instale o Maven:
```bash
brew install maven
```

## Passo a Passo

### 1. Parar o backend no Docker

```bash
cd portal-direx
docker-compose stop backend
```

### 2. Executar o backend localmente

```bash
cd backend
chmod +x run-backend-local.sh
./run-backend-local.sh
```

O backend estará rodando em **http://localhost:8080**

### 3. Manter o frontend no Docker

Em outro terminal:

```bash
cd portal-direx
docker-compose up -d frontend
```

O frontend estará em **http://localhost** (porta 80)

## Verificar se está funcionando

```bash
# Verificar backend
curl http://localhost:8080/api/auth/login

# Deve retornar: {"message":"Method not allowed"} (normal, precisa ser POST)
```

## Parar o backend

Pressione `Ctrl+C` no terminal onde o backend está rodando.

## Vantagens desta abordagem

✅ Backend usa o IP real da sua máquina (MySQL reconhece e permite)
✅ Não precisa alterar permissões do banco
✅ Facilita debug e desenvolvimento
✅ Frontend continua isolado no Docker
✅ Hot reload disponível em modo desenvolvimento

## Modo Desenvolvimento (opcional)

Para desenvolvimento com hot reload automático:

```bash
cd backend
mvn spring-boot:run
```

## Troubleshooting

**Erro: "Maven não encontrado"**
```bash
brew install maven
```

**Erro: "Port 8080 already in use"**
```bash
# Parar o backend Docker primeiro
docker-compose stop backend
```

**Erro de conexão MySQL**
- Verifique se o arquivo `.env` está correto
- Confirme se o usuário tem permissão do IP da sua máquina

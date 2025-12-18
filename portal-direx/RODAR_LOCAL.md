# Como Rodar o Backend Localmente

O backend precisa rodar localmente (fora do Docker) para se conectar ao banco MySQL remoto.

## Pré-requisitos

1. **Java 17 ou superior**
   ```bash
   java -version
   ```
   
   Se não tiver, instale:
   - macOS: `brew install openjdk@17`
   - Linux: `sudo apt install openjdk-17-jdk`

2. **Maven**
   ```bash
   mvn -version
   ```
   
   Se não tiver, instale:
   - macOS: `brew install maven`
   - Linux: `sudo apt install maven`

## Executar

### Método 1 - Script Automatizado (Recomendado)

```bash
cd portal-direx/backend
chmod +x run-local-simple.sh
./run-local-simple.sh
```

### Método 2 - Maven Direto

```bash
cd portal-direx/backend
mvn spring-boot:run
```

### Método 3 - Compilar e Executar JAR

```bash
cd portal-direx/backend

# Compilar
mvn clean package -DskipTests

# Executar
java -jar target/portal-direx-backend-1.0.0.jar
```

## Frontend no Docker

Em outro terminal:

```bash
cd portal-direx
docker-compose up -d frontend
```

## Acessar

- Backend: http://localhost:8080
- Frontend: http://localhost (porta 80)
- API Docs: http://localhost:8080/api

## Parar

Backend: Pressione `Ctrl+C` no terminal

Frontend: `docker-compose stop frontend`

## Troubleshooting

### Erro: "mvn: command not found"

Instale o Maven:
```bash
# macOS
brew install maven

# Linux
sudo apt install maven
```

### Erro: "JAVA_HOME not set"

Configure o JAVA_HOME:
```bash
# macOS
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Linux
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Porta 8080 já em uso

Pare o processo usando a porta:
```bash
# Ver qual processo está usando
lsof -i :8080

# Parar o processo (substitua PID)
kill -9 PID
```

### Erro de conexão MySQL

Verifique se o arquivo `.env` está configurado corretamente:
```bash
cat ../.env | grep DB_

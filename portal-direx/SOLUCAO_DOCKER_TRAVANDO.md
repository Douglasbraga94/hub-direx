# 🔧 Solução para Docker Travando

## Problema
O Docker está travando nos builds, principalmente no `npm install` do frontend.

## Solução Rápida

Execute o script de rebuild completo:

```bash
chmod +x rebuild-all.sh
./rebuild-all.sh
```

## Se Ainda Assim Travar

### 1. Verificar Recursos do Docker Desktop

Vá em **Docker Desktop → Settings → Resources** e aumente:
- **CPUs**: Mínimo 4
- **Memory**: Mínimo 8GB
- **Disk**: Mínimo 60GB

### 2. Limpar TUDO do Docker

```bash
# ATENÇÃO: Isso remove TODOS os containers e imagens do Docker
docker system prune -a --volumes -f
```

### 3. Build Separado (Mais Confiável)

```bash
# Parar tudo
docker-compose down

# Build só do frontend (mais leve)
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Aguardar 2-3 minutos

# Depois build do backend
docker-compose build --no-cache backend
docker-compose up -d backend
```

### 4. Verificar Conectividade

Se o build travar em `npm install` ou `mvn package`, pode ser problema de rede:

```bash
# Testar conectividade
ping registry.npmjs.org
ping repo.maven.apache.org
```

### 5. Ver Logs Detalhados

```bash
# Build com logs completos para ver onde trava
docker-compose build --progress=plain frontend
```

## Nota sobre o Backend

O backend vai apresentar erro de conexão com MySQL porque você não tem permissão de conexão do seu IP atual (200.202.32.2). Isso é esperado e só pode ser resolvido pelo administrador do banco de dados.

O frontend deve funcionar normalmente mesmo com o backend apresentando erro de MySQL.
```

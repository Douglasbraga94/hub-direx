# Guia de Troubleshooting - Portal Direx

## Problema: Backend não está refletindo mudanças no código

### Sintoma
- Você alterou o código Java mas o erro persiste
- `RuntimeException` antiga ainda aparece nos logs
- Mudanças não são aplicadas mesmo após rebuild

### Causa
Docker está usando cache antigo das imagens

### Solução

**Opção 1: Script Automático (Recomendado)**

```bash
chmod +x rebuild-backend-completo.sh
./rebuild-backend-completo.sh
```

**Opção 2: Comandos Manuais**

```bash
# 1. Parar tudo
docker-compose down

# 2. Remover imagem antiga
docker rmi -f portal-direx-backend

# 3. Limpar cache
docker builder prune -f

# 4. Reconstruir SEM cache
docker-compose build --no-cache backend

# 5. Subir novamente
docker-compose up -d

# 6. Ver logs
docker-compose logs -f backend
```

---

## Problema: Connection refused ao MySQL

### Sintoma
```
Communications link failure
Connection refused
```

### Possíveis Causas

1. **Senha com caractere especial (#)**
   - Verifique o arquivo `.env`
   - A senha deve estar entre aspas: `DB_PASSWORD="#Usr8dbDIREX"`

2. **IP bloqueado no MySQL**
   - MySQL bloqueou seu IP após muitas tentativas falhadas
   - Mensagem: `Host 'X.X.X.X' is blocked because of many connection errors`

3. **Firewall bloqueando conexão**
   - Verifique se a porta 3306 está acessível

### Solução

**Para senha com #:**

```bash
# Editar .env
nano .env

# Garantir que está assim:
DB_PASSWORD="#Usr8dbDIREX"
# ou
DB_PASSWORD="%23Usr8dbDIREX"

# Reiniciar
docker-compose restart backend
```

**Para IP bloqueado:**

Contate o administrador do MySQL para executar:

```sql
-- No servidor MySQL
FLUSH HOSTS;
```

**Testar conexão manualmente:**

```bash
# Do container backend
docker exec -it portal-direx-backend bash
mysql -h 72.60.245.176 -u usr_portaldirex -p#Usr8dbDIREX db_portal_Direx

# Do host
mysql -h 72.60.245.176 -u usr_portaldirex -p#Usr8dbDIREX db_portal_Direx
```

---

## Problema: Validação não está funcionando

### Sintoma
- Requisições com dados inválidos passam
- Erros de validação não aparecem

### Verificações

1. **Dependência no pom.xml:**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

2. **@Valid no Controller:**

```java
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request)
```

3. **Anotações no DTO:**

```java
@NotBlank(message = "Email é obrigatório")
@Email(message = "Email inválido")
private String email;
```

---

## Problema: GlobalExceptionHandler não captura exceções

### Sintoma
- Exceções não são tratadas
- Retorno padrão do Spring ao invés do ErrorResponse customizado

### Verificações

1. **Anotação @RestControllerAdvice presente:**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
```

2. **Package correto:**
   - Deve estar em `com.portaldirex.exception`
   - Mesmo package ou subpackage da classe principal

3. **Exceção tem @ExceptionHandler:**

```java
@ExceptionHandler(BusinessException.class)
public ResponseEntity<ErrorResponse> handleBusinessException(...)
```

4. **Rebuild do backend:**
   - Execute `./rebuild-backend-completo.sh`

---

## Problema: Frontend não conecta com Backend

### Sintoma
- CORS errors no console
- Network errors
- API_URL undefined

### Verificações

1. **API_URL no frontend:**

```bash
# Ver variáveis de ambiente do container
docker exec -it portal-direx-frontend env | grep API

# Deve mostrar:
API_URL=http://localhost:8080/api
```

2. **CORS no backend:**

```java
// SecurityConfig.java
.cors(cors -> cors.configurationSource(request -> {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost", "http://localhost:80"));
    // ...
}))
```

3. **Backend está rodando:**

```bash
curl http://localhost:8080/api/sistemas
```

---

## Problema: Login falha com credenciais corretas

### Sintoma
- Credenciais corretas retornam erro
- BadCredentialsException mesmo com senha certa

### Verificações

1. **Senha está criptografada no banco:**

```sql
SELECT id, nome, email, senha FROM usuarios;
-- A senha deve começar com $2a$ (BCrypt)
```

2. **BCrypt configurado no SecurityConfig:**

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

3. **Cadastro criptografa senha:**

```java
usuario.setSenha(passwordEncoder.encode(request.getSenha()));
```

---

## Comandos Úteis

### Docker

```bash
# Ver logs em tempo real
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Ver logs apenas do frontend
docker-compose logs -f frontend

# Reiniciar um serviço específico
docker-compose restart backend

# Ver status dos containers
docker-compose ps

# Entrar no container
docker exec -it portal-direx-backend bash
docker exec -it portal-direx-frontend sh

# Limpar tudo (cuidado!)
docker-compose down -v
docker system prune -af
```

### Banco de Dados

```bash
# Conectar ao MySQL
mysql -h 72.60.245.176 -u usr_portaldirex -p db_portal_Direx

# Queries úteis
SHOW TABLES;
SELECT * FROM usuarios;
SELECT * FROM sistemas;
DESCRIBE usuarios;
```

### Maven (dentro do container backend)

```bash
docker exec -it portal-direx-backend bash

# Rodar testes
./mvnw test

# Limpar e compilar
./mvnw clean package

# Pular testes
./mvnw clean package -DskipTests
```

---

## Checklist de Debug

Quando algo não funciona, siga esta ordem:

- [ ] Rebuild do backend sem cache
- [ ] Verificar logs do backend
- [ ] Verificar logs do frontend  
- [ ] Testar conexão MySQL manualmente
- [ ] Verificar arquivo .env
- [ ] Verificar CORS no SecurityConfig
- [ ] Verificar se GlobalExceptionHandler está sendo carregado
- [ ] Verificar se validações estão no DTO
- [ ] Limpar cache do navegador
- [ ] Reiniciar Docker completamente

---

## Logs Importantes

### Backend Iniciou Corretamente

```
Started PortalDirexApplication in X.XXX seconds
```

### Problema de Conexão MySQL

```
Communications link failure
Connection refused
```

### GlobalExceptionHandler Carregado

```
Mapped "{[/error]}" onto ...
Bean 'globalExceptionHandler' ...
```

### Validação Funcionando

```
MethodArgumentNotValidException
```

---

## Contato com Suporte

Se o problema persistir:

1. Colete os logs: `docker-compose logs > logs.txt`
2. Inclua o erro específico
3. Descreva os passos que causaram o erro
4. Informe qual solução tentou

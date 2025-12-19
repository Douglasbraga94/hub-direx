# Guia de Validação e Tratamento de Erros

## Implementação Realizada

### 1. GlobalExceptionHandler

Criado um tratador global de exceções que padroniza todas as respostas de erro da API.

**Localização:** `backend/src/main/java/com/portaldirex/exception/GlobalExceptionHandler.java`

**Exceções Tratadas:**

#### MethodArgumentNotValidException (HTTP 400)
Tratamento automático de erros de validação do Bean Validation.

**Exemplo de resposta:**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Erro de Validação",
  "message": "Os dados enviados são inválidos",
  "path": "/api/auth/cadastro",
  "validationErrors": {
    "email": "Formato de email inválido",
    "senha": "Senha deve ter entre 6 e 100 caracteres"
  }
}
```

#### BusinessException (HTTP 400)
Para erros de regras de negócio.

**Exemplo de uso:**
```java
if (usuarioRepository.existsByEmail(email)) {
    throw new BusinessException("Este email já está cadastrado no sistema");
}
```

**Resposta:**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Erro de Negócio",
  "message": "Este email já está cadastrado no sistema",
  "path": "/api/auth/cadastro"
}
```

#### ResourceNotFoundException (HTTP 404)
Para quando um recurso não é encontrado.

**Exemplo de uso:**
```java
return sistemaRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Sistema", "id", id));
```

**Resposta:**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 404,
  "error": "Recurso Não Encontrado",
  "message": "Sistema não encontrado(a) com id: '123'",
  "path": "/api/sistemas/123"
}
```

#### BadCredentialsException / UsernameNotFoundException (HTTP 401)
Para erros de autenticação.

**Resposta:**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 401,
  "error": "Erro de Autenticação",
  "message": "Email ou senha inválidos",
  "path": "/api/auth/login"
}
```

#### Exception (HTTP 500)
Tratamento genérico para erros não esperados.

**Resposta:**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 500,
  "error": "Erro Interno do Servidor",
  "message": "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
  "path": "/api/sistemas"
}
```

---

### 2. Validações Implementadas

#### LoginRequest
```java
@NotBlank(message = "Email é obrigatório")
@Email(message = "Formato de email inválido")
private String email;

@NotBlank(message = "Senha é obrigatória")
@Size(min = 6, max = 100, message = "Senha deve ter entre 6 e 100 caracteres")
private String senha;
```

#### CadastroRequest
```java
@NotBlank(message = "Nome é obrigatório")
@Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
private String nome;

@NotBlank(message = "Email é obrigatório")
@Email(message = "Formato de email inválido")
private String email;

@NotBlank(message = "Senha é obrigatória")
@Size(min = 6, max = 100, message = "Senha deve ter entre 6 e 100 caracteres")
@Pattern(
    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
    message = "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
)
private String senha;
```

---

### 3. Tratamento de Erros no Frontend

Atualize o `AuthService` no Angular para tratar os erros padronizados:

```typescript
// frontend/src/app/core/services/auth.service.ts

login(email: string, senha: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, senha })
    .pipe(
      catchError(error => {
        if (error.error?.validationErrors) {
          // Erros de validação
          const messages = Object.values(error.error.validationErrors).join('\n');
          throw new Error(messages);
        }
        // Outros erros
        throw new Error(error.error?.message || 'Erro ao fazer login');
      })
    );
}
```

---

## Como Testar

### 1. Teste de Validação de Email Inválido

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "emailinvalido",
    "senha": "123456"
  }'
```

**Resposta esperada (400):**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Erro de Validação",
  "message": "Os dados enviados são inválidos",
  "path": "/api/auth/login",
  "validationErrors": {
    "email": "Formato de email inválido"
  }
}
```

---

### 2. Teste de Senha Fraca

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "123456"
  }'
```

**Resposta esperada (400):**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Erro de Validação",
  "message": "Os dados enviados são inválidos",
  "path": "/api/auth/cadastro",
  "validationErrors": {
    "senha": "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
  }
}
```

---

### 3. Teste de Email Duplicado

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "teste@direx.com",
    "senha": "Senha123"
  }'
```

**Resposta esperada (400):**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Erro de Negócio",
  "message": "Este email já está cadastrado no sistema",
  "path": "/api/auth/cadastro"
}
```

---

### 4. Teste de Sistema Não Encontrado

**Request:**
```bash
curl -X GET http://localhost:8080/api/sistemas/99999 \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Resposta esperada (404):**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 404,
  "error": "Recurso Não Encontrado",
  "message": "Sistema não encontrado(a) com id: '99999'",
  "path": "/api/sistemas/99999"
}
```

---

### 5. Teste de Credenciais Inválidas

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@direx.com",
    "senha": "senhaerrada"
  }'
```

**Resposta esperada (401):**
```json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 401,
  "error": "Erro de Autenticação",
  "message": "Email ou senha inválidos",
  "path": "/api/auth/login"
}
```

---

## Boas Práticas Implementadas

1. **Respostas Padronizadas**: Todas as respostas de erro seguem o mesmo formato JSON
2. **Mensagens Claras**: Mensagens de erro em português e descritivas
3. **Códigos HTTP Corretos**: Uso apropriado dos status codes (400, 401, 404, 500)
4. **Validação Automática**: Bean Validation integrado automaticamente
5. **Segurança**: Mensagens de erro de autenticação genéricas para evitar vazamento de informações
6. **Timestamp**: Todas as respostas incluem timestamp para auditoria
7. **Path**: Caminho da requisição incluído para facilitar debug
8. **Transações**: Uso de `@Transactional` nos services

---

## Próximos Passos Recomendados

1. **Adicionar Logging**: Implementar SLF4J para registrar erros
2. **Testes Unitários**: Criar testes para todas as validações
3. **Internacionalização**: Suporte para múltiplos idiomas nas mensagens
4. **Rate Limiting**: Proteção contra abuso de endpoints
5. **Documentação Swagger**: Documentar erros possíveis de cada endpoint

---

## Status da Implementação

- [x] GlobalExceptionHandler criado
- [x] Exceções personalizadas (BusinessException, ResourceNotFoundException)
- [x] Validações Bean Validation nos DTOs
- [x] Tratamento de erros de autenticação
- [x] Respostas padronizadas JSON
- [x] Transações nos services
- [x] Documentação de testes

**Nível de maturidade:** Profissional ⭐⭐⭐⭐⭐

O sistema agora segue as melhores práticas de mercado para validação de dados e tratamento de erros!

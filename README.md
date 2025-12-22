# Portal Direx

## Tecnologias

### Backend
- **Java 17** com Spring Boot 3.2.0
- **Spring Security** com JWT
- **Spring Data JPA** com MySQL


### Frontend
- **Angular 20** (standalone components)
- **TypeScript**


### Infraestrutura
- **Docker** e **Docker Compose**
- **Nginx** como servidor web para frontend
- **MySQL 8** como banco de dados

---

## Estrutura do Projeto

\`\`\`
portal-direx/
├── backend/                           # API Spring Boot
│   ├── src/main/java/com/portaldirex/
│   │   ├── controller/               # Controllers REST
│   │   │   ├── AuthController.java   # Endpoints de autenticação
│   │   │   └── SistemaController.java # Endpoints de sistemas
│   │   ├── service/                  # Camada de serviço
│   │   │   ├── AuthService.java
│   │   │   ├── SistemaService.java
│   │   │   └── UserDetailsServiceImpl.java
│   │   ├── repository/               # Camada de dados (JPA)
│   │   │   ├── UsuarioRepository.java
│   │   │   └── SistemaRepository.java
│   │   ├── model/                    # Entidades JPA
│   │   │   ├── Usuario.java
│   │   │   └── Sistema.java
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   ├── CadastroRequest.java
│   │   │   ├── AuthResponse.java
│   │   │   └── UsuarioDTO.java
│   │   ├── security/                 # Configuração de segurança
│   │   │   ├── SecurityConfig.java
│   │   │   ├── JwtUtil.java
│   │   │   └── JwtAuthenticationFilter.java
│   │   ├── exception/                # Tratamento de erros
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── ErrorResponse.java
│   │   │   ├── BusinessException.java
│   │   │   └── ResourceNotFoundException.java
│   │   └── PortalDirexApplication.java
│   ├── src/main/resources/
│   │   └── application.properties    # Configurações do Spring
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                          # Aplicação Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                 # Funcionalidades centrais
│   │   │   │   ├── guards/
│   │   │   │   │   ├── auth.guard.ts          # Proteção de rotas privadas
│   │   │   │   │   └── auto-login.guard.ts    # Redirecionamento automático
│   │   │   │   ├── interceptors/
│   │   │   │   │   └── auth.interceptor.ts    # Adiciona JWT automaticamente
│   │   │   │   └── services/
│   │   │   │       ├── auth.service.ts        # Serviço de autenticação
│   │   │   │       ├── sistemas.service.ts    # Serviço de sistemas
│   │   │   │       └── config.service.ts      # Configurações da aplicação
│   │   │   ├── features/             # Módulos funcionais
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/        # Tela de login
│   │   │   │   │   └── cadastro/     # Tela de cadastro
│   │   │   │   └── dashboard/        # Dashboard principal
│   │   │   ├── app.component.tsx     # Componente raiz
│   │   │   ├── app.config.ts         # Configuração da aplicação
│   │   │   └── app.routes.ts         # Rotas da aplicação
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── nginx.conf                    # Configuração do Nginx
│   ├── Dockerfile
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
│
├── docker-compose.yml                # Orquestração dos containers
├── .env                              # Variáveis de ambiente
├── .gitignore
├── README.md                         # Este arquivo
├── ANALISE_PROFISSIONAL.md          # Análise técnica e melhorias
└── GUIA_VALIDACAO_ERROS.md          # Documentação de validações

\`\`\`

---

## Funcionalidades

### Autenticação e Autorização
- Login com email e senha
- Tokens JWT com expiração de 24 horas
- Senha criptografada com BCrypt
- Persistência de sessão com localStorage


### Validações e Segurança
- Validação de email com regex
- Senha forte (mínimo 8 caracteres, letra maiúscula, minúscula e número)

---

## Configuração e Execução

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas disponíveis: 80 (frontend), 8080 (backend), 3306 (MySQL)

### Configuração do Ambiente

1. **Criar arquivo `.env`** na raiz do projeto:

\`\`\`env

API_URL=${URL}/api
BACKEND_PORT=8080
CORS_ALLOWED_ORIGINS=${URL1},${URL2}
CORS_ORIGINS=${URL1},${URL2}
DB_HOST=
DB_NAME=
DB_PASSWORD= #ENTRE ASPAS
DB_PORT=3306
DB_USER=
FRONTEND_PORT=80
JWT_EXPIRATION=86400000 #TEMPO EM MILISEGUNDOS
JWT_SECRET=
SPRING_PROFILE=prod

### Executar o Projeto

\`\`\`bash
# 1. Clone o repositório
git clone <seu-repositorio>
cd portal-direx

# 2. Configure o arquivo .env com suas credenciais

# 3. Inicie os containers
docker-compose up -d

# 4. Verifique os logs
docker-compose logs -f

# 5. Acesse a aplicação
# Frontend: http://localhost
# Backend: http://localhost:8080/api
\`\`\`

### Parar e Remover

\`\`\`bash
# Parar containers
docker-compose down

# Parar e remover volumes (apaga dados do banco)
docker-compose down -v
\`\`\`

### Reconstruir após mudanças

\`\`\`bash
# Reconstruir apenas o backend
docker-compose build --no-cache backend
docker-compose up -d backend

# Reconstruir apenas o frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Reconstruir tudo
docker-compose down
docker-compose build --no-cache
docker-compose up -d
\`\`\`

---

## API Endpoints

### Autenticação

**POST** `/api/auth/login`
\`\`\`json
Request:
{
  "email": "usuario@example.com",
  "senha": "SenhaForte123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "nome": "Nome do Usuário",
    "email": "usuario@example.com",
    "cargo": "Desenvolvedor",
    "setor": "TI"
  }
}
\`\`\`

**POST** `/api/auth/cadastro`
\`\`\`json
Request:
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "SenhaForte123",
  "cpf": "12345678901",
  "cargo": "Desenvolvedor",
  "setor": "TI"
}

Response: (mesmo formato do login)
\`\`\`

### Sistemas

**GET** `/api/sistemas`
\`\`\`json
Headers:
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "name": "Sistema de Vendas",
    "sigla": "SV",
    "type": "web",
    "url": "https://vendas.exemplo.com",
    "icon": "shopping_cart"
  }
]
\`\`\`

**GET** `/api/sistemas/{id}`
\`\`\`json
Headers:
Authorization: Bearer {token}

Response:
{
  "id": 1,
  "name": "Sistema de Vendas",
  "sigla": "SV",
  "type": "web",
  "url": "https://vendas.exemplo.com",
  "icon": "shopping_cart"
}
\`\`\`

---

## Tratamento de Erros

Todas as respostas de erro seguem o padrão:

\`\`\`json
{
  "timestamp": "2025-12-19T18:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email já cadastrado no sistema",
  "path": "/api/auth/cadastro",
  "errors": [
    {
      "field": "email",
      "message": "Email já cadastrado no sistema"
    }
  ]
}
\`\`\`

### Códigos HTTP
- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Erro de validação
- **401** - Não autenticado
- **403** - Sem permissão
- **404** - Recurso não encontrado
- **409** - Conflito (ex: email duplicado)
- **500** - Erro interno do servidor

---


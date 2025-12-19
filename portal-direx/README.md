# Portal Direx

Sistema de Hub de Sistemas Empresarial com autenticação JWT, gestão de usuários e dashboard interativo.

## Tecnologias

### Backend
- **Java 17** com Spring Boot 3.2.0
- **Spring Security** com JWT
- **Spring Data JPA** com MySQL
- **Bean Validation** para validação de dados
- **Global Exception Handler** para tratamento de erros padronizado

### Frontend
- **Angular 20** (standalone components)
- **TypeScript**
- **RxJS** para programação reativa
- **Guards** para proteção de rotas
- **Interceptors** para autenticação automática

### Infraestrutura
- **Docker** e **Docker Compose**
- **Nginx** como servidor web para frontend
- **MySQL 8** como banco de dados

---

## Estrutura do Projeto

```
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
├── init-db/                          # Scripts de inicialização do banco
│   └── 001_create_tables.sql
│
├── docker-compose.yml                # Orquestração dos containers
├── .env                              # Variáveis de ambiente
├── .gitignore
├── README.md                         # Este arquivo
├── ANALISE_PROFISSIONAL.md          # Análise técnica e melhorias
└── GUIA_VALIDACAO_ERROS.md          # Documentação de validações

```

---

## Funcionalidades

### Autenticação e Autorização
- Login com email e senha
- Cadastro de novos usuários
- Tokens JWT com expiração de 24 horas
- Senha criptografada com BCrypt
- Persistência de sessão com localStorage
- Logout seguro
- Proteção de rotas com Guards

### Dashboard
- Hub de sistemas com cards interativos
- Filtros por tipo (Web, API, Admin)
- Busca em tempo real por nome ou descrição
- Card de perfil do usuário com avatar
- Atividades recentes e atalhos rápidos
- Design responsivo e moderno

### Validações e Segurança
- Validação de email com regex
- Senha forte (mínimo 8 caracteres, letra maiúscula, minúscula e número)
- Tratamento padronizado de erros
- Mensagens de erro amigáveis
- Proteção contra CORS
- Headers de segurança

---

## Banco de Dados

### Estrutura Principal

**Tabela: usuarios**
```sql
id VARCHAR(36) PRIMARY KEY
nome VARCHAR(255)
email VARCHAR(255) UNIQUE
senha VARCHAR(255)  -- BCrypt hash
cpf VARCHAR(11) UNIQUE
cargo VARCHAR(100)
setor VARCHAR(100)
ativo BOOLEAN
created_at TIMESTAMP
updated_at TIMESTAMP
```

**Tabela: sistemas**
```sql
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(255)
sigla VARCHAR(50)
type VARCHAR(50)  -- web, api, admin
url VARCHAR(500)
icon VARCHAR(255)
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

## Configuração e Execução

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas disponíveis: 80 (frontend), 8080 (backend), 3306 (MySQL)

### Configuração do Ambiente

1. **Criar arquivo `.env`** na raiz do projeto:

```env
# Banco de Dados MySQL
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=db_portal_Direx
MYSQL_USER=usr_portaldirex
MYSQL_PASSWORD="sua_senha_aqui"

# Backend Spring Boot
DB_HOST=72.60.245.176
DB_PORT=3306
DB_NAME=db_portal_Direx
DB_USER=usr_portaldirex
DB_PASSWORD="sua_senha_aqui"

# JWT Secret (gere uma chave secreta forte)
JWT_SECRET=sua_chave_secreta_muito_segura_e_longa_aqui_min_256_bits

# Frontend
API_URL=http://localhost:8080/api
```

### Executar o Projeto

```bash
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
```

### Parar e Remover

```bash
# Parar containers
docker-compose down

# Parar e remover volumes (apaga dados do banco)
docker-compose down -v
```

### Reconstruir após mudanças

```bash
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
```

---

## API Endpoints

### Autenticação

**POST** `/api/auth/login`
```json
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
```

**POST** `/api/auth/cadastro`
```json
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
```

### Sistemas

**GET** `/api/sistemas`
```json
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
```

**GET** `/api/sistemas/{id}`
```json
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
```

---

## Tratamento de Erros

Todas as respostas de erro seguem o padrão:

```json
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
```

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

## Desenvolvimento

### Backend - Adicionar Nova Funcionalidade

1. Criar a entidade em `model/`
2. Criar o repository em `repository/`
3. Criar o service em `service/`
4. Criar o controller em `controller/`
5. Adicionar validações nos DTOs
6. Documentar no README

### Frontend - Adicionar Nova Tela

1. Criar componente em `features/`
2. Adicionar rota em `app.routes.ts`
3. Criar serviço se necessário em `core/services/`
4. Adicionar guard se for rota protegida
5. Atualizar navegação

---

## Segurança

### Implementado
- Autenticação JWT
- Senha criptografada com BCrypt (custo 12)
- Validação de dados com Bean Validation
- CORS configurado
- SQL Injection protegido (JPA)
- XSS protegido (sanitização automática do Angular)

### Recomendações para Produção
- **HTTPS obrigatório** - Configure certificado SSL
- **Rate Limiting** - Limite requisições por IP
- **Logging** - Monitore acessos suspeitos
- **Backup** - Configure backup automático do banco
- **Secrets** - Use variáveis de ambiente para senhas
- **Firewall** - Restrinja acesso ao banco

---

## Troubleshooting

### Backend não conecta ao MySQL
```bash
# Verificar senha no .env (senhas com # precisam de aspas)
MYSQL_PASSWORD="#SuaSenha" ✅
MYSQL_PASSWORD=#SuaSenha ❌

# Verificar se o MySQL está rodando
docker-compose ps

# Ver logs do MySQL
docker-compose logs mysql
```

### Frontend não carrega
```bash
# Verificar build do Angular
docker-compose logs frontend

# Verificar se o Nginx está rodando
docker exec -it portal-direx-frontend sh
ls -la /usr/share/nginx/html/
```

### Erro "Connection refused"
```bash
# Backend ainda está iniciando, aguarde 30-60 segundos
docker-compose logs -f backend
```

### Limpar tudo e recomeçar
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

---

## Licença

Este projeto é proprietário e confidencial.

---

## Contato

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**Última atualização:** 19/12/2025

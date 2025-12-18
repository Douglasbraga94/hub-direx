# Portal Direx

Sistema de gestão empresarial com frontend Angular 20 e backend Spring Boot.

## Estrutura do Projeto

```
portal-direx/
├── frontend/          # Aplicação Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Serviços, guards, interceptors
│   │   │   ├── features/       # Componentes por feature
│   │   │   └── app.routes.ts   # Rotas da aplicação
│   │   └── environments/       # Configurações de ambiente
│   ├── angular.json
│   └── package.json
│
└── backend/           # API Spring Boot
    ├── src/main/java/com/portaldirex/
    │   ├── controller/         # Controllers REST
    │   ├── service/           # Lógica de negócio
    │   ├── repository/        # Acesso a dados
    │   ├── model/            # Entidades JPA
    │   ├── dto/              # DTOs
    │   └── security/         # Configuração JWT
    └── pom.xml
```

## Tecnologias Utilizadas

### Frontend
- Angular 20
- TypeScript
- RxJS
- HttpClient

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL 8
- JWT (JSON Web Token)
- Lombok

## Banco de Dados

Estrutura baseada nas tabelas:
- `usuarios` - Usuários do sistema
- `perfil` - Perfis de acesso
- `usuario_perfil` - Relacionamento usuário-perfil
- `sistemas` - Sistemas disponíveis
- `gestor` - Gestores dos sistemas
- `auditoria_login` - Logs de acesso

## Configuração

### Frontend

1. Instalar dependências:
```bash
cd frontend
npm install
```

2. Iniciar servidor de desenvolvimento:
```bash
npm start
```

Aplicação rodará em: http://localhost:4200

### Backend

1. Configurar banco de dados no `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_portal_Direx
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

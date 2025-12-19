# Multi-stage build para otimizar o tamanho da imagem

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar apenas pom.xml primeiro para aproveitar cache do Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar o código fonte e compilar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

# Criar usuário não-root para segurança
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Copiar apenas o JAR compilado do stage anterior
COPY --from=build /app/target/*.jar app.jar

# Expor porta da aplicação
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]

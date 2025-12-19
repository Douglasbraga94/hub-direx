FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml primeiro para cache de dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copiar código fonte
COPY src ./src

# Build com timeouts e configurações otimizadas
RUN mvn clean package -DskipTests -B -T 1C \
    -Dmaven.wagon.http.pool=false \
    -Dmaven.wagon.httpconnectionManager.ttlSeconds=120

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

RUN rm -rf /root/.m2/repository

# Copiar pom.xml primeiro para cache de dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B || true

# Copiar código fonte
COPY src ./src

RUN rm -rf target && \
    mvn clean package -DskipTests -B \
    -Dmaven.compiler.showWarnings=true \
    -Dmaven.compiler.showDeprecation=true

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

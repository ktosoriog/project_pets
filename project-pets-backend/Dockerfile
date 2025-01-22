# project-pets-backend/Dockerfile

# Etapa 1: Build con Maven
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml primero para cachear dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el resto (src) y compilar
COPY src ./src
RUN mvn package -DskipTests

# Etapa 2: Imagen final
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copiar el jar desde la etapa build
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
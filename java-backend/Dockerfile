FROM gradle:jdk21 AS build-stage

WORKDIR /app

COPY build.gradle settings.gradle ./
COPY src ./src

RUN gradle build --no-daemon

FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=build-stage /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
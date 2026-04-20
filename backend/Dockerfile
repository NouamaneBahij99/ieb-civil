# ─── Stage 1 : Build ─────────────────────────────────────────
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -q
COPY src ./src
RUN ./mvnw clean package -DskipTests -q

# ─── Stage 2 : Run ───────────────────────────────────────────
FROM eclipse-temurin:17-jre
WORKDIR /app
RUN addgroup --system ieb && adduser --system --ingroup ieb ieb
COPY --from=builder /app/target/*.jar app.jar
RUN mkdir -p uploads && chown ieb:ieb uploads
USER ieb
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s \
  CMD curl -f http://localhost:8080/api/public/projets || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]

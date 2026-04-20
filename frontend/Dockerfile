# ─── Stage 1 : Build ─────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci --quiet
COPY . .
RUN npm run build -- --configuration production

# ─── Stage 2 : Nginx ─────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist/civil-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost/ || exit 1

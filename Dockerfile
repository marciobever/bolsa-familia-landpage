# ========== 1) BUILD ==========
FROM node:20-alpine AS build
WORKDIR /app

# Dependências
COPY package*.json ./
# se não tiver package-lock, o npm ci falha: usa fallback
RUN npm ci || npm install

# Código
COPY . .

# Vars públicas do Vite (passe como Build Args no Coolify)
ARG VITE_PUBLIC_SITE
ARG VITE_PUBLIC_SCHEMA_URL
ARG VITE_PUBLIC_SUBMIT_URL
ARG VITE_PUBLIC_RENDER_URL
ARG VITE_PUBLIC_ADSENSE_PUB
ARG VITE_PUBLIC_AD_SLOTS

# Build
RUN VITE_PUBLIC_SITE=$VITE_PUBLIC_SITE \
    VITE_PUBLIC_SCHEMA_URL=$VITE_PUBLIC_SCHEMA_URL \
    VITE_PUBLIC_SUBMIT_URL=$VITE_PUBLIC_SUBMIT_URL \
    VITE_PUBLIC_RENDER_URL=$VITE_PUBLIC_RENDER_URL \
    VITE_PUBLIC_ADSENSE_PUB=$VITE_PUBLIC_ADSENSE_PUB \
    VITE_PUBLIC_AD_SLOTS="$VITE_PUBLIC_AD_SLOTS" \
    npm run build

# ========== 2) RUNTIME (NGINX) ==========
FROM nginx:1.27-alpine

# Gera o nginx.conf (SPA fallback) ouvindo na porta 3000
RUN printf '%s\n' \
  'server {' \
  '  listen 3000;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  gzip on;' \
  '  gzip_types text/plain text/css application/javascript application/json image/svg+xml;' \
  '  gzip_min_length 1024;' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '  }' \
  '  location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2?)$ {' \
  '    expires 7d;' \
  '    access_log off;' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf

# Copia o build do estágio anterior
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

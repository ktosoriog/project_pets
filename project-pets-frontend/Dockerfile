# project-pets-frontend/Dockerfile

# Etapa 1: Build con Node
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
# Si tienes pnpm o yarn, ajusta a tu instalador
RUN npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build  # Genera dist/ (Vite) o build/ (CRA)

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# or /app/build si es CRA

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
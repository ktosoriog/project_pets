# Etapa 1: Build con Node
FROM node:18 AS build
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Establecer el entorno de producción
ENV NODE_ENV=production

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados al directorio raíz de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
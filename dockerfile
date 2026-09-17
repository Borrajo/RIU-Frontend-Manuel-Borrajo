# ==========================================
# Stage 1: Build
# ==========================================

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

# copy all files
COPY . .

RUN npm run build-production

# ==========================================
# Stage 2: Production (Web Server)
# ==========================================

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/super-heroes/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
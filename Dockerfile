
# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Necesario para Prisma Client
RUN npm install --omit=dev

# Comando para ejecutar migraciones y seed antes de arrancar el servidor
CMD npx prisma migrate deploy && \
    node dist/prisma/seed.js && \
    node dist/main

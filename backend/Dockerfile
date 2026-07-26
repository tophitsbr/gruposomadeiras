# ==========================================
# STAGE 1: BUILD THE APPLICATION
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency configs
COPY package*.json ./
COPY prisma ./prisma/

# Install packages
RUN npm ci

# Copy codebase
COPY . .

# Generate Prisma Client classes & compile TypeScript NestJS code
RUN npx prisma generate
RUN npm run build

# Clean up dev dependencies to minimize container size
RUN npm prune --production

# ==========================================
# STAGE 2: PRODUCTION RUNTIME ENVIRONMENT
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# Copy built production assets
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 5000

# Start NestJS backend api service
CMD ["node", "dist/main"]

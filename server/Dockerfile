########################
# Builder stage
########################
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all deps (incl. dev) to build TypeScript
RUN npm ci

COPY . .

RUN npm run build

########################
# Runner stage
########################
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

# Install only production deps for runtime
RUN npm ci --omit=dev

# Copy built files
COPY --from=builder /app/dist ./dist

# Copy any runtime assets/config needed at runtime
COPY --from=builder /app/src/middleware ./src/middleware

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "dist/index.js"]
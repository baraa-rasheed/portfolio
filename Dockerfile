# Multi-stage image for Fly.io / Docker — React Router SSR via react-router-serve.
# Fly sets PORT (often 8080); HOST=0.0.0.0 binds all interfaces inside the machine.

FROM node:20-alpine AS deps-dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS deps-prod
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nodejs

COPY package.json package-lock.json ./
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/build ./build

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 8080

CMD ["npm", "run", "start"]

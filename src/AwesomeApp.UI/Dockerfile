# Base
FROM node:22-alpine AS base
ENV NODE_ENV=production

# Build dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build source
FROM base AS builder
ARG app_url
ENV NEXT_PUBLIC_ENVIRONMENT=$NODE_ENV
ENV NEXT_PUBLIC_API_URL="$app_url/api"
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Run
FROM base AS runner
ARG host_network
ARG port
ARG api_url
ARG app_url
ARG nextauth_url
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=$host_network
ENV PORT=$port
ENV AWESOME_API_URL=$api_url
ENV NEXTAUTH_URL=$app_url
ENV NEXTAUTH_URL_INTERNAL=$nextauth_url
ENV NEXT_PUBLIC_ENVIRONMENT=$NODE_ENV
ENV NEXT_PUBLIC_API_URL="$app_url/api"
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next && \
    chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE $port
CMD ["node", "server.js"]

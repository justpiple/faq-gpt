FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

FROM base AS builder

RUN apk add --no-cache python3 make g++ gcc libc6-compat

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
COPY prisma.config.js ./

COPY src ./src

RUN pnpm prisma generate

RUN pnpm prune --prod

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:/app/data/dev.db"

RUN mkdir -p /app/data && chown -R node:node /app/data

COPY --chown=node:node dev.db /app/data/dev.db

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/prisma.config.js ./prisma.config.js
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/package.json ./package.json

COPY --chown=node:node docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER node

EXPOSE 3000

VOLUME ["/app/data"]

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["pnpm", "start"]

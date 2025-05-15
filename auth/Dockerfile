FROM oven/bun:canary-alpine

WORKDIR /app
COPY package.json .
RUN bun install --only=prod
COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["bun", "dev"]

FROM oven/bun:canary-alpine

WORKDIR /app
COPY package.json .
RUN bun install --only=prod
COPY . .

CMD ["bun", "dev"]
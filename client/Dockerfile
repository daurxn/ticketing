FROM oven/bun:canary-alpine

WORKDIR /app
COPY package.json .
RUN bun install
COPY . .

CMD ["bun", "dev"]
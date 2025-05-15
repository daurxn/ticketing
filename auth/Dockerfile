FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["npm", "run", "dev"]
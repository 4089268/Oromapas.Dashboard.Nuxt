FROM node:26.3-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", ".output/server/index.mjs"]

EXPOSE 3000
FROM node:24-alpine

WORKDIR /app

COPY persona/package.json ./package.json
COPY persona/package-lock.json ./package-lock.json
RUN npm ci

COPY persona/src ./src
COPY persona/tsconfig.json ./tsconfig.json

RUN npx tsc

CMD ["node", "dist/src/server.js"]

FROM node:24-alpine

WORKDIR /app

COPY enxoval/types/package.json ./enxoval/types/package.json
COPY enxoval/observability/package.json ./enxoval/observability/package.json
COPY enxoval/http/package.json ./enxoval/http/package.json
COPY enxoval/auth/package.json ./enxoval/auth/package.json
COPY enxoval/db/package.json ./enxoval/db/package.json
COPY persona/package.json ./persona/package.json

COPY enxoval/types/dist ./enxoval/types/dist
COPY enxoval/observability/dist ./enxoval/observability/dist
COPY enxoval/http/dist ./enxoval/http/dist
COPY enxoval/auth/dist ./enxoval/auth/dist
COPY enxoval/db/dist ./enxoval/db/dist

RUN printf '{"name":"app","private":true,"workspaces":["enxoval/types","enxoval/observability","enxoval/http","enxoval/auth","enxoval/db","persona"]}' > package.json
RUN npm install

WORKDIR /app/persona

COPY persona/src ./src
COPY persona/tsconfig.json ./

RUN /app/node_modules/.bin/tsc

CMD ["node", "dist/src/server.js"]

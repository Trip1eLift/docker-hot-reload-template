FROM node:18-alpine3.15

RUN apk add curl

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

HEALTHCHECK CMD curl -sf http://localhost:8000/health || exit 1 --health-retries=3 --health-timeout=3s --health-interval=5s --health-start-period=5s
FROM node:18-alpine3.15

RUN npm install -g nodemon

RUN apk add --no-cache g++

WORKDIR /app

COPY . .

RUN g++ main.cpp -o build

CMD ./build
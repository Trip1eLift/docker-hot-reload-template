FROM node:18-alpine3.15

RUN npm install -g nodemon

RUN apk add --no-cache gcc musl-dev

WORKDIR /app

COPY . .

RUN gcc main.c -o build

CMD ./build
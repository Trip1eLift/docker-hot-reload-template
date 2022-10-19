FROM python:alpine3.16

RUN apk add --update nodejs npm
RUN npm install -g nodemon
RUN npm install -g concurrently
RUN apk add curl
RUN apk add sudo

RUN apk add --update docker openrc
RUN rc-update add docker boot

RUN apk add --virtual builddeps gcc musl-dev && \
  pip install aws-sam-cli awscli && \
  apk del builddeps

# RUN adduser -s /bin/bash samcli \
#   --disabled-password \
#   && echo 'samcli ALL=(ALL) NOPASSWD:ALL' >>/etc/sudoers

# USER samcli

WORKDIR /app

COPY . ./

HEALTHCHECK CMD curl -sf http://localhost:8002/health || exit 1 --health-retries=3 --health-timeout=3s --health-interval=5s --health-start-period=120s
FROM python:alpine3.16

RUN apk add curl
RUN apk add --update nodejs npm
RUN npm install -g nodemon

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8003

HEALTHCHECK CMD curl -sf http://localhost:8000/health || exit 1 --health-retries=3 --health-timeout=3s --health-interval=5s --health-start-period=5s

#CMD [ "python", "./main.py" ]
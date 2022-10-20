# ultimate-hot-reload-template
A variety of docker image templates that's configured to hot-reload on save. This provides the optimal dev environment, but the Dockerfile settings are not meant for production.

## Launch all apps spontaneously

The following commands are to be run in the root directory of the project.

### `make start`

Runs the app in the terminal.\
Open docker desktop app to monitor the processes.

| Core     | Framework       | Language | Layer    | Access                                |
| -------- | --------------- | -------- | -------- | ------------------------------------- |
| Node 18  | Express 4.18    | Js       | Backend  | `curl http://localhost:8000/health`   |
| Go 1.19  | Net/Http        | Golang   | Backend  | `curl http://localhost:8001/health`   |
| Go 1.16  | AWS Lambda SAM  | Golang   | Backend  | `curl http://localhost:8002/health`   |
| WebPack  | React 18        | Jsx      | Frontend | Browser visit `http://localhost:3000` |
| Postgres | Alpine Linux    | Postgres | Database | Connect to `pg://localhost:5432`      |
| gcc      | N/A             | C        | N/A      | N/A                                   |
| g++      | N/A             | C++      | N/A      | N/A                                   |


### `make start-bg`

Runs the app in the background.

### `make down`

Shuts down app's cotainer while removes app's image and volume.

### `make cleanse`

Cleans up docker completely including all containers, images, and volumns.\
The container processes have to be stopped before running this command.

## Usage

To extract the framework and language you're looking for, copy folder, copy part of docker-compose.yaml, and copy `Makefile` & `.gitignore` if needed.

### Golang as an example

Copy the `golang/` folder with everything inside.

docker-compose.yaml
```yaml
version: '3.8'
services:
  golang:
    container_name: golang_http
    build: ./golang
    ports:
      - 8001:8001
    working_dir: /app
    volumes:
      - ./golang:/app/
    command: nodemon --exec go run main.go --signal SIGTERM --legacy-watch --ext .go,.mod,.sum
```

### Postgres as an example

Copy the `postgres/` folder with everything inside.

docker-compose.yaml
```yaml
version: '3.8'
services:
  postgres:
    container_name: postgres_container
    image: postgres:14.1-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres_user
      - POSTGRES_PASSWORD=postgres_password
    ports:
      - 5432:5432
    volumes:
      - postgres:/var/lib/postgresql/data
      - ./postgres/create_tables.sql:/docker-entrypoint-initdb.d/create_tables.sql
volumes:
  postgres:
    driver: local
```

If you're routing your backend to database in docker-compose, make sure to set the database host to the container name. `postgres_container` is the host in this case.

### AWS Lambda with SAM CLI with Container Golang as an example

This one wraps docker service in [a thick docker container](./lambda_sam_golang/Dockerfile) because SAM CLI uses docker to run lambda functions in local. The Dockerfile starts with python because pip is the easiest way to install AWS CLI and SAM CLI on an Alpine image.

Copy the `lambda_sam_golang/` folder with everything inside.

docker-compose.yaml
```yaml
version: '3.8'
services:
  aws_lambda_sam_container:
    container_name: sam_container_golang
    build: ./lambda_sam_golang
    ports:
      - 8002:8002
    working_dir: /app
    volumes:
      - ./lambda_sam_golang:/app/
      - /var/run/docker.sock:/var/run/docker.sock
    command: concurrently --kill-others "nodemon --legacy-watch --ext .go,.mod,.sum,.yaml --exec \"sudo sam build\"" "sudo sam local start-api --port 8002 --host 0.0.0.0 --container-host host.docker.internal"
```

### gcc of c lang as an example

It's [Dockerfile](./gcc/Dockerfile) starts with Node so Nodemon can be easily installed for hot-reload. The environment only comes with `musl-dev` of std libraries. Add `RUN apk add <some package>` to Dockerfile if you need more c packages.

Copy the `gcc/` folder with everything inside.

docker-compose.yaml
```yaml
version: '3.8'
services:
  gcc:
    container_name: gcc
    build: ./gcc
    volumes:
      - ./gcc:/app/
    tty: true
    command: nodemon --legacy-watch --ext .c --exec "gcc main.c -o build && ./build"
```

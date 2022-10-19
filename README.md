# ultimate-hot-reload-template
A variety of docker image templates that has hot-reload which provide the optimal dev environment.

## Launch all apps spontaneously

The following commands are to be run in the root directory of the project.

### `make start`

Runs the app in the terminal.\
Open docker desktop app to monitor the processes.

| Framework      | Language | Layer    | Access                                |
| -------------- | -------- | -------- | ------------------------------------- |
| Express        | NodeJs   | Backend  | `curl http://localhost:8000/health`   |
| Net/Http       | Golang   | Backend  | `curl http://localhost:8001/health`   |
| AWS Lambda SAM | Golang   | Backend  | `curl http://localhost:8002/health`   |
| React          | Jsx      | Frontend | Browser visit `http://localhost:3000` |
| Postgres       | Postgres | Database | Connect to `pg://localhost:5432`      |

### `make start-bg`

Runs the app in the background.

### `make down`

Shuts down app's cotainer while removes app's image and volume.

### `make cleanse`

Cleans up docker completely including all containers, images, and volumns.\
The container processes have to be stopped before running this command.

## Usage

To extract the framework and language you're looking for, copy folder, copy part of docker-compose.yaml, and copy `Makefile` if needed.

### Golang as an example

Copy everything of `golang/` folder.

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

Copy everything of `postgres/` folder.

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

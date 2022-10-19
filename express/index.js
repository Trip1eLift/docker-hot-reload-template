import express from 'express';
import pg from 'pg';

const { Pool, Client } = pg;

const app = express();
const port = 8000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const postgres_credentials = {
    user:     process.env.DB_USER || "postgres",
    host:     process.env.DB_HOST || "localhost",
    password: process.env.DB_PASS || "postgres",
    port:     process.env.DB_PORT || 5432,
};

app.get("/health", (request, response) => {
    console.log("Express healthcheck.");
    response.send("Healthy Express!");
});

function errorLogger(request, response, next) {
    console.log("Unhandled request, path:", request.url);
}

app.use(errorLogger);

const server = app.listen(port, () => {
    console.log("Listening on port:", port);
})

async function terminate(signal) {
    console.log(`Received signal to termintate: ${signal}`);
    await server.close();
    process.exit();
}

process.on("SIGINT", terminate);
process.on("SIGTERM", terminate);
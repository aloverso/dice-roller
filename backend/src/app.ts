import express, { Request, Response } from "express";
import path from "path";
import { routerFactory } from "./routes/router";
import { rollDieFactory } from "./domain/roll-die/rollDie";
import { RandomApiClient } from "./random-api/RandomApiClient";
import { PostgresHistoryClient } from "./database/PostgresHistoryClient";

const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
const connection = {
  user: process.env.DB_USER || "postgres",
  host: process.env.CLOUD_SQL_CONNECTION_NAME
    ? `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    : "localhost",
  database: process.env.DB_NAME || "dicelocal",
  password: process.env.DB_PASS || "",
  port: 5432,
};

const randomBaseUrl = process.env.RANDOM_API_BASEURL || "http://www.random.org";

const postgresHistoryClient = PostgresHistoryClient(connection);
const randomApiClient = RandomApiClient(randomBaseUrl);

const router = routerFactory({
  getRollHistory: postgresHistoryClient.getAllHistory,
  rollDie: rollDieFactory(randomApiClient.getRandom, postgresHistoryClient.save),
});

const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;

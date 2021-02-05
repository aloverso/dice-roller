import express, { Request, Response } from "express";
import path from "path";
import { routerFactory } from "./routes/router";
import { rollDieFactory } from "./domain/roll-die/rollDie";
import { RandomApiClient } from "./random-api/RandomApiClient";

const randomBaseUrl = process.env.RANDOM_API_BASEURL || "http://www.random.org";

const randomApiClient = RandomApiClient(randomBaseUrl);

const router = routerFactory({
  rollDie: rollDieFactory(randomApiClient.getRandom),
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

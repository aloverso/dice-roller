import { PostgresHistoryClient } from "./PostgresHistoryClient";
import { HistoryClient } from "../domain/types";
import { generateRoll } from "../domain/test-objects/factories";

describe("PostgresDataClient", () => {
  let historyClient: HistoryClient;

  beforeAll(async () => {
    const connection = {
      user: "postgres",
      host: "localhost",
      database: "dicetest",
      password: "",
      port: 5432,
    };
    historyClient = PostgresHistoryClient(connection);
  });

  describe("getAllHistory", () => {
    it("gets all saved history rolls", async () => {
      const roll1 = generateRoll({});
      const roll2 = generateRoll({});
      await historyClient.save(roll1);
      await historyClient.save(roll2);

      const programs = await historyClient.getAllHistory();
      expect(programs.length).toEqual(2);
      expect(programs[0]).toEqual(roll1);
      expect(programs[1]).toEqual(roll2);
    });
  });

  afterAll(async () => {
    await historyClient.disconnect();
  });
});

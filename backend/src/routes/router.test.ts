import request from "supertest";
import express, { Express, Router } from "express";
import { routerFactory } from "./router";
import { generateRoll } from "../domain/test-objects/factories";

describe("router", () => {
  let app: Express;
  let router: Router;
  let stubGetRollHistory: jest.Mock;
  let stubRollDie: jest.Mock;

  beforeEach(() => {
    stubGetRollHistory = jest.fn();
    stubRollDie = jest.fn();

    router = routerFactory({
      getRollHistory: stubGetRollHistory,
      rollDie: stubRollDie,
    });
    app = express();
    app.use(router);
  });

  describe("/roll/:die", () => {
    it("rolls a single die and returns the result", (done) => {
      const roll = generateRoll({ die: "d8" });
      stubRollDie.mockResolvedValue(roll);
      request(app)
        .get("/roll/d8")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(roll);
          expect(stubRollDie).toHaveBeenCalledWith("d8", 1);
          done();
        });
    });

    it("accepts a query param for die count", (done) => {
      const roll = generateRoll({ die: "d12", count: 2 });
      stubRollDie.mockResolvedValue(roll);
      request(app)
        .get("/roll/d12?count=2")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(roll);
          expect(stubRollDie).toHaveBeenCalledWith("d12", 2);
          done();
        });
    });

    it("parses uppercase characters", (done) => {
      const roll = generateRoll({ die: "d20" });
      stubRollDie.mockResolvedValue(roll);
      request(app)
        .get("/roll/D20")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(roll);
          expect(stubRollDie).toHaveBeenCalledWith("d20", 1);
          done();
        });
    });

    it("sends a 500 when the die does not exist", (done) => {
      request(app).get("/roll/d15").expect(500).end(done);
    });
  });

  describe("/history", () => {
    it("fetches roll history", (done) => {
      const history = [generateRoll({}), generateRoll({})];
      stubGetRollHistory.mockResolvedValue(history);
      request(app)
        .get("/history")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(history);
          expect(stubGetRollHistory).toHaveBeenCalled();
          done();
        });
    });

    it("sends a 500 when the fetch fails", (done) => {
      stubGetRollHistory.mockRejectedValue({});
      request(app).get("/history").expect(500).end(done);
    });
  });
});

import { rollDieFactory } from "./rollDie";
import { RollDie } from "../types";

const utcTimestamp = "2020-04-02T08:02:17+00:00";
jest.mock("dayjs", () => jest.fn(() => jest.requireActual("dayjs")(utcTimestamp)));

describe("rollDie", () => {
  let mockGetRandom: jest.Mock;
  let rollDie: RollDie;

  beforeEach(() => {
    mockGetRandom = jest.fn();
    rollDie = rollDieFactory(mockGetRandom);
  });

  it("constructs a roll and save it", async () => {
    mockGetRandom.mockResolvedValue([2]);

    const roll = await rollDie("d4", 1);

    expect(roll.die).toEqual("d4");
    expect(roll.count).toEqual(1);
    expect(roll.rolls).toEqual([2]);
    expect(roll.total).toEqual(2);
    expect(roll.timestamp).toContain("2020-04-02");
    expect(mockGetRandom).toHaveBeenCalledWith(1, 4, 1);
  });

  it("sums all values in a roll", async () => {
    mockGetRandom.mockResolvedValue([2, 4, 6, 8, 10]);
    const roll = await rollDie("d12", 5);
    expect(roll.total).toEqual(30);
  });

  it("returns a roll even if saveRoll fails", async () => {
    mockGetRandom.mockResolvedValue([1]);
    const roll = await rollDie("d12", 5);
    expect(roll.rolls).toEqual([1]);
  });
});

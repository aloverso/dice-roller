import { rollDieFactory } from "./rollDie";
import { RollDie } from "../types";

const utcTimestamp = "2020-04-02T08:02:17-04:00";
jest.mock("dayjs", () => jest.fn(() => jest.requireActual("dayjs")(utcTimestamp)));

describe("rollDie", () => {
  let mockGetRandom: jest.Mock;
  let mockSaveRoll: jest.Mock;
  let rollDie: RollDie;

  beforeEach(() => {
    mockGetRandom = jest.fn();
    mockSaveRoll = jest.fn();
    mockSaveRoll.mockResolvedValue({});
    rollDie = rollDieFactory(mockGetRandom, mockSaveRoll);
  });

  it("constructs a roll and save it", async () => {
    mockGetRandom.mockResolvedValue([2]);

    const roll = await rollDie("d4", 1);

    expect(roll).toEqual({
      die: "d4",
      count: 1,
      rolls: [2],
      total: 2,
      timestamp: utcTimestamp,
    });
    expect(mockGetRandom).toHaveBeenCalledWith(1, 4, 1);
    expect(mockSaveRoll).toHaveBeenCalledWith(roll);
  });

  it("sums all values in a roll", async () => {
    mockGetRandom.mockResolvedValue([2, 4, 6, 8, 10]);
    const roll = await rollDie("d12", 5);
    expect(roll.total).toEqual(30);
  });

  it("returns a roll even if saveRoll fails", async () => {
    mockGetRandom.mockResolvedValue([1]);
    mockSaveRoll.mockRejectedValue({});
    const roll = await rollDie("d12", 5);
    expect(roll.rolls).toEqual([1]);
  });
});

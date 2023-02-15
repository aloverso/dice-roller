/* eslint-disable @typescript-eslint/no-non-null-assertion */

import axios from "axios";
import { ApiClient } from "./ApiClient";
import { Client } from "./domain/Client";
import { generateRoll } from "./test-objects/factories";
import { Roll } from "./domain/Roll";
import { FakeLocalStorage } from "./test-objects/FakeLocalStorage";
import * as getCurrentTimestampModule from "./domain/getCurrentTimestamp";

jest.mock("axios");
jest.mock("./domain/getCurrentTimestamp");

const mockGetCurrentTimestamp = (
  getCurrentTimestampModule as jest.Mocked<typeof getCurrentTimestampModule>
).getCurrentTimestamp;

describe("ApiClient", () => {
  let apiClient: Client;
  let mockedAxios: jest.Mocked<typeof axios>;
  let fakeLocalStorage: Storage;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    apiClient = ApiClient();

    fakeLocalStorage = FakeLocalStorage();
    Object.defineProperty(window, "localStorage", { writable: true, value: fakeLocalStorage });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", { value: undefined });
  });

  describe("rollDie", () => {
    it("uses the die and count in the api call", () => {
      const dummyObserver = { onSuccess: jest.fn(), onError: jest.fn() };
      mockedAxios.get.mockResolvedValue({ data: {} });

      apiClient.rollDie("d20", 2, dummyObserver);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://www.random.org/integers/?num=2&min=1&max=20&col=1&base=10&format=plain&rnd=new`
      );
    });

    it("calls observer with successful roll data", (done) => {
      const response = "   2\n3\n4\n ";
      mockedAxios.get.mockResolvedValueOnce({ data: response });

      const observer = {
        onSuccess: (data: Roll): void => {
          expect(data.count).toEqual(3);
          expect(data.die).toEqual("d6");
          expect(data.rolls).toEqual([2, 3, 4]);
          expect(data.total).toEqual(9);
          done();
        },
        onError: jest.fn(),
      };

      apiClient.rollDie("d6", 3, observer);
    });

    it("pushes roll data to local storage list", (done) => {
      const timestamp = "2020-01-01";
      mockGetCurrentTimestamp.mockReturnValue(timestamp);
      const response1 = "   10\n";
      const response2 = "   20\n";
      mockedAxios.get
        .mockResolvedValueOnce({ data: response1 })
        .mockResolvedValueOnce({ data: response2 });

      const roll1 = {
        count: 1,
        die: "d20",
        rolls: [10],
        total: 10,
        timestamp,
      };

      const roll2 = {
        count: 1,
        die: "d20",
        rolls: [20],
        total: 20,
        timestamp,
      };

      const observer1 = {
        onSuccess: (): void => {
          expect(JSON.parse(fakeLocalStorage.getItem("dice-roller-history")!)).toEqual([roll1]);
        },
        onError: jest.fn(),
      };

      const observer2 = {
        onSuccess: (): void => {
          expect(JSON.parse(fakeLocalStorage.getItem("dice-roller-history")!)).toEqual([
            roll1,
            roll2,
          ]);
          done();
        },
        onError: jest.fn(),
      };

      apiClient.rollDie("d20", 1, observer1);
      apiClient.rollDie("d20", 1, observer2);
    });

    it("calls observer with error and type when GET fails", (done) => {
      mockedAxios.get.mockRejectedValue({});

      const observer = {
        onSuccess: jest.fn(),
        onError: (): void => {
          done();
        },
      };

      apiClient.rollDie("d20", 1, observer);
    });
  });

  describe("getHistory", () => {
    it("calls observer with successful history data", (done) => {
      const rolls = [generateRoll({}), generateRoll({})];
      fakeLocalStorage.setItem("dice-roller-history", JSON.stringify(rolls));

      const observer = {
        onSuccess: (data: Roll[]): void => {
          expect(data).toEqual(rolls);
          done();
        },
        onError: jest.fn(),
      };

      apiClient.getHistory(observer);
    });
  });
});

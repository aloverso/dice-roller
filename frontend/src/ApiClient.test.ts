import axios from "axios";
import { ApiClient } from "./ApiClient";
import { Client } from "./domain/Client";
import { generateRoll } from "./test-objects/factories";
import { Roll } from "./domain/Roll";
import { FakeLocalStorage } from "./test-objects/FakeLocalStorage";

jest.mock("axios");

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
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/roll/d20?count=2");
    });

    it("calls observer with successful roll data", (done) => {
      const roll = generateRoll({});
      mockedAxios.get.mockResolvedValue({ data: roll });

      const observer = {
        onSuccess: (data: Roll): void => {
          expect(data).toEqual(roll);
          done();
        },
        onError: jest.fn(),
      };

      apiClient.rollDie("d20", 1, observer);
    });

    it("pushes roll data to local storage list", (done) => {
      const roll1 = generateRoll({});
      const roll2 = generateRoll({});
      mockedAxios.get.mockResolvedValueOnce({ data: roll1 }).mockResolvedValueOnce({ data: roll2 });

      const observer1 = {
        onSuccess: (): void => {
          expect(fakeLocalStorage.getItem("dice-roller-history")).toEqual(JSON.stringify([roll1]));
          done();
        },
        onError: jest.fn(),
      };

      const observer2 = {
        onSuccess: (): void => {
          expect(fakeLocalStorage.getItem("dice-roller-history")).toEqual(
            JSON.stringify([roll1, roll2])
          );
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

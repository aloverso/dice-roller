import axios from "axios";
import { ApiClient } from "./ApiClient";
import { Error } from "./domain/Error";
import { Client } from "./domain/Client";
import { generateRoll } from "./test-objects/factories";
import { Roll } from "./domain/Roll";

jest.mock("axios");

describe("ApiClient", () => {
  let apiClient: Client;
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    apiClient = ApiClient();
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
    it("calls observer with successful training data", (done) => {
      const rolls = [generateRoll({}), generateRoll({})];
      mockedAxios.get.mockResolvedValue({ data: rolls });

      const observer = {
        onSuccess: (data: Roll[]): void => {
          expect(data).toEqual(rolls);
          done();
        },
        onError: jest.fn(),
      };

      apiClient.getHistory(observer);
    });

    it("calls observer with system error when GET fails", (done) => {
      mockedAxios.get.mockRejectedValue({});

      const observer = {
        onSuccess: jest.fn(),
        onError: (error: Error): void => {
          expect(error).toEqual(Error.SYSTEM_ERROR);
          done();
        },
      };

      apiClient.getHistory(observer);
    });
  });
});

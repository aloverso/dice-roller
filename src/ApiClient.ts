import { Client, Observer } from "./domain/Client";
import axios, { AxiosResponse } from "axios";
import { Error } from "./domain/Error";
import { Die, DieSidesLookup } from "./domain/Die";
import { Roll } from "./domain/Roll";
import { getCurrentTimestamp } from "./domain/getCurrentTimestamp";

export const ApiClient = (): Client => {
  const getRandom = (min: number, max: number, count: number): Promise<number[]> => {
    return axios
      .get(
        `http://www.random.org/integers/?num=${count}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
      )
      .then((response: AxiosResponse<string | number>): number[] => {
        let data: string;
        if (typeof response.data != "string") {
          data = JSON.stringify(response.data);
        } else {
          data = response.data;
        }
        return data
          .trim()
          .split("\n")
          .map((it) => parseInt(it));
      });
  };

  const rollDie = (die: Die, count: number, observer: Observer<Roll>): void => {
    const min = 1;
    const max = DieSidesLookup[die];

    getRandom(min, max, count)
      .then((randomValues) => {
        const sum = randomValues.reduce((value, acc) => acc + value, 0);
        const roll: Roll = {
          die: die,
          count: count,
          rolls: randomValues,
          total: sum,
          timestamp: getCurrentTimestamp(),
        };

        const rollHistory = JSON.parse(window.localStorage.getItem("dice-roller-history") || "[]");
        rollHistory.push(roll);
        localStorage.setItem("dice-roller-history", JSON.stringify(rollHistory));
        observer.onSuccess(roll);
      })
      .catch(() => {
        return observer.onError(Error.SYSTEM_ERROR);
      });
  };

  const getHistory = (observer: Observer<Roll[]>): void => {
    try {
      const rollHistory = JSON.parse(window.localStorage.getItem("dice-roller-history") || "[]");
      observer.onSuccess(rollHistory);
    } catch {
      return observer.onError(Error.SYSTEM_ERROR);
    }
  };

  return {
    rollDie,
    getHistory,
  };
};

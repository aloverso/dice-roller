import { Client, Observer } from "./domain/Client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Error } from "./domain/Error";
import { Die } from "./domain/Die";
import { Roll } from "./domain/Roll";

export const ApiClient = (): Client => {
  const rollDie = (die: Die, count: number, observer: Observer<Roll>): void => {
    axios
      .get(`/api/roll/${die}?count=${count}`)
      .then((response: AxiosResponse<Roll>) => {
        const rollHistory = JSON.parse(window.localStorage.getItem("dice-roller-history") || "[]");
        rollHistory.push(response.data);
        localStorage.setItem("dice-roller-history", JSON.stringify(rollHistory));
        observer.onSuccess(response.data);
      })
      .catch((errorResponse: AxiosError<Roll>) => {
        if (errorResponse.response?.status === 404) {
          return observer.onError(Error.NOT_FOUND);
        }

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

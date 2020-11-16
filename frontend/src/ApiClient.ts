import { Client, Observer } from "./domain/Client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Error } from "./domain/Error";
import { Die } from "./domain/Die";
import { Roll } from "./domain/Roll";

export const ApiClient = (): Client => {
  const rollDie = (die: Die, count: number, observer: Observer<Roll>): void => {
    get(`/api/roll/${die}?count=${count}`, observer);
  };

  const getHistory = (observer: Observer<Roll[]>): void => {
    get(`/api/history`, observer);
  };

  const get = <T>(endpoint: string, observer: Observer<T>): void => {
    axios
      .get(endpoint)
      .then((response: AxiosResponse<T>) => {
        observer.onSuccess(response.data);
      })
      .catch((errorResponse: AxiosError<T>) => {
        if (errorResponse.response?.status === 404) {
          return observer.onError(Error.NOT_FOUND);
        }

        return observer.onError(Error.SYSTEM_ERROR);
      });
  };

  return {
    rollDie,
    getHistory,
  };
};

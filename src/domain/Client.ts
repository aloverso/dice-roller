import { Error } from "./Error";
import { Die } from "./Die";
import { Roll } from "./Roll";

export interface Client {
  rollDie: (die: Die, count: number, observer: Observer<Roll>) => void;
  getHistory: (observer: Observer<Roll[]>) => void;
}

export interface Observer<T> {
  onSuccess: (result: T) => void;
  onError: (error: Error) => void;
}

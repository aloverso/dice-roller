/* eslint-disable @typescript-eslint/no-explicit-any */

import { Client, Observer } from "../domain/Client";
import { Roll } from "../domain/Roll";
import { Die } from "../domain/Die";

export class StubClient implements Client {
  capturedObserver: Observer<any> = {
    onError: () => {},
    onSuccess: () => {},
  };

  capturedDie: Die | undefined = undefined;
  capturedCount: number | undefined = undefined;

  getHistory = (observer: Observer<Roll[]>): void => {
    this.capturedObserver = observer;
  };

  rollDie = (die: Die, count: number, observer: Observer<Roll>): void => {
    this.capturedObserver = observer;
    this.capturedDie = die;
    this.capturedCount = count;
  };
}

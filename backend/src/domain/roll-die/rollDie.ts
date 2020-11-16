/* eslint-disable @typescript-eslint/no-empty-function */

import { GetRandom, RollDie, SaveRoll } from "../types";
import { Die, DieSidesLookup } from "../Die";
import { Roll } from "../Roll";
import dayjs from "dayjs";

export const rollDieFactory = (getRandom: GetRandom, saveRoll: SaveRoll): RollDie => {
  return async (die: Die, count: number): Promise<Roll> => {
    const randomValues = await getRandom(1, DieSidesLookup[die], count);
    const sum = randomValues.reduce((value, acc) => acc + value, 0);
    const roll = {
      die: die,
      count: count,
      rolls: randomValues,
      total: sum,
      timestamp: dayjs().format(),
    };
    saveRoll(roll).catch(() => {});
    return roll;
  };
};

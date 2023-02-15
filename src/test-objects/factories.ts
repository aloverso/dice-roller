import dayjs from "dayjs";
import { Roll } from "../domain/Roll";
import { ALL_DICE, Die } from "../domain/Die";

export const randomInt = (): number => Math.floor(Math.random() * Math.floor(10000000));

export const generateRoll = (overrides: Partial<Roll>): Roll => {
  return {
    die: randomDie(),
    count: randomInt(),
    rolls: [randomInt()],
    total: randomInt(),
    timestamp: dayjs().format(),
    ...overrides,
  };
};

export const randomDie = (): Die => {
  const randomIndex = Math.floor(Math.random() * ALL_DICE.length);
  return ALL_DICE[randomIndex];
};

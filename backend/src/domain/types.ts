import { Roll } from "./Roll";
import { Die } from "./Die";

export type GetRollHistory = () => Promise<Roll[]>;
export type RollDie = (die: Die, count: number) => Promise<Roll>;
export type GetRandom = (min: number, max: number, count: number) => Promise<number[]>;
export type SaveRoll = (roll: Roll) => Promise<Roll>;

export interface HistoryClient {
  save: SaveRoll;
  getAllHistory: () => Promise<Roll[]>;
  disconnect: () => Promise<void>;
}

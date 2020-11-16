import { Die } from "./Die";

export interface Roll {
  die: Die;
  count: number;
  rolls: number[];
  total: number;
  timestamp: string;
}

export const ALL_DICE = ["d4", "d6", "d8", "d10", "d12", "d20"];

export type Die = typeof ALL_DICE[number];

export const DieSidesLookup: Record<Die, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
};

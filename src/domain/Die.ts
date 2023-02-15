export const ALL_DICE = ["d4", "d6", "d8", "d10", "d12", "d20"];

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export type Die = ElementType<typeof ALL_DICE>;

export const DieSidesLookup: Record<Die, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
};

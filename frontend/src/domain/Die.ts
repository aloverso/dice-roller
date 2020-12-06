export const ALL_DICE = ["d4", "d6", "d8", "d10", "d12", "d20"];

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never;

export type Die = ElementType<typeof ALL_DICE>;

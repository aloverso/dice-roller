export const FakeLocalStorage = (): Storage => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    clear: (): void => {
      store = {};
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    key: (index: number): string | null => {
      return Object.keys(store)[index];
    },
    length: Object.keys(store).length,
  };
};

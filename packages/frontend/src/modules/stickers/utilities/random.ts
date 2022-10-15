import { Alea, alea } from "seedrandom";

export const createRandom = (seed: string): (() => number) => {
  return new (alea as unknown as typeof Alea)(seed);
};

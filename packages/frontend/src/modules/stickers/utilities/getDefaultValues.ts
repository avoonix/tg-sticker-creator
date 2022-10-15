import { InputDefinition } from "./input";

export const getDefaultValues = (def: Record<string, InputDefinition>) => {
  return Object.fromEntries(
    Object.entries(def).map(([id, config]) => [id, config.default]),
  );
};

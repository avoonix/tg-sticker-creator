import { StepConfig } from "./config";
import { PaletteEntry } from "./PaletteEntry";

export const resolvePaletteEntries = (
  palette: PaletteEntry[],
  config: StepConfig,
) =>
  // fallback color if not defined in palette: red
  Object.fromEntries(
    Object.entries(config).map(([key, value]) => [
      key,
      typeof value === "object"
        ? palette.find((p) => p.id === value.paletteId)?.color ?? "#ff0000"
        : value,
    ]),
  );

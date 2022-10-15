import { create } from "tg-sticker-creator";
import { getDefaultValues } from "../utilities/getDefaultValues";
import { StickerConfig } from "./config";
import { PaletteEntry } from "./PaletteEntry";
import { resolvePaletteEntries } from "./resolvePaletteEntries";
import { Group } from "./steps";
import { timeSlice } from "./timeSlicing";

export const execute = timeSlice(async function* (
  groups: Group[],
  config: StickerConfig,
  palette: PaletteEntry[],
  enableIds: string[] = [],
  disableIds: string[] = [],
) {
  const steps = groups
    .flatMap((g) => g.steps)
    .filter((s) => {
      if (enableIds.includes(s.id)) {
        return true;
      }
      if (disableIds.includes(s.id)) {
        return false;
      }
      return (
        (s.mandatory || config[s.id]?.active) &&
        (!s.visible || s.visible({ config, enableIds, disableIds }))
      );
    })
    .sort((a, b) => a.niceness - b.niceness);
  let sticker = create.sticker();
  for (const step of steps) {
    const res = await step.apply(
      sticker,
      resolvePaletteEntries(
        palette,
        Object.assign({}, getDefaultValues(step.inputs), config[step.id]),
      ),
    );
    sticker = res;
    yield sticker;
  }
  return sticker;
});

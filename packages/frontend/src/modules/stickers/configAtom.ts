import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import type { StickerConfig } from "./execute";

export const configAtom = atom<StickerConfig>({});

export const getConfigAtom = (stepId: string) =>
  focusAtom(configAtom, (optic) => optic.prop(stepId));

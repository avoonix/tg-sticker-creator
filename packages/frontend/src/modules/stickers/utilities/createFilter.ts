import { Lottie } from "tg-sticker-creator";
import { StickerConfig } from "../execute";
import { InputDefinition } from "./input";

export interface FilterDefinition<
  I extends Record<string, InputDefinition> = Record<string, InputDefinition>,
> {
  id: string;
  inputs: I;
  displayName: string;
  visible?: VisibleFunc;
  apply: (sticker: Lottie, inputs: InputParam<I>) => Promise<Lottie>;
  niceness: number;
  mandatory: boolean;
}

export type VisibleFunc = (args: {
  config: StickerConfig;
  enableIds: string[];
  disableIds: string[];
}) => boolean;

export type InputParam<T extends Record<string, InputDefinition>> = {
  [K in keyof T]: T[K]["default"];
};

export const createFilter = <I extends Record<string, InputDefinition>>(
  definition: FilterDefinition<I>,
): FilterDefinition => {
  return definition as any;
};

export type ConfigValue = string | number | boolean;

export type ConfigRef = { paletteId: number };

export type InputConfig = ConfigValue | ConfigRef;

export type StepConfig = {
  active: boolean;
  [id: string]: InputConfig;
};

export interface StickerConfig {
  [stepId: string]: StepConfig;
}

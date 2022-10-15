export interface BaseInputDefinition {
  displayName: string;
}

export interface ColorInputDefinition extends BaseInputDefinition {
  type: "color";
  default: string;
  defaultPaletteId?: number;
}

export interface NumberInputDefinition extends BaseInputDefinition {
  type: "number";
  default: number;
  min: number;
  max: number;
  // min?: number;
  // max?: number;
}

export interface BooleanInputDefinition extends BaseInputDefinition {
  type: "boolean";
  default: boolean;
}

// export interface EasingInputDefinition extends BaseInputDefinition {
//     type: "easing",
//     default: Easing;
// }

export type InputDefinition =
  | ColorInputDefinition
  | NumberInputDefinition
  | BooleanInputDefinition; // | EasingInputDefinition;

export type InputType = InputDefinition["type"];

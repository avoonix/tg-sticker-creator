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
}

export interface BooleanInputDefinition extends BaseInputDefinition {
  type: "boolean";
  default: boolean;
}

export interface SelectInputDefinition extends BaseInputDefinition {
  type: "select";
  // multiple: boolean;
  options: {
    name: string;
    value: string;
  }[];
  default: string;
}

// export interface EasingInputDefinition extends BaseInputDefinition {
//     type: "easing",
//     default: Easing;
// }

export type InputDefinition =
  | ColorInputDefinition
  | NumberInputDefinition
  | BooleanInputDefinition
  | SelectInputDefinition; // | EasingInputDefinition;

export type InputType = InputDefinition["type"];

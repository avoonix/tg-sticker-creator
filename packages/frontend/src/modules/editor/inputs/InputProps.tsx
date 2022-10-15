import { InputDefinition } from "@/modules/stickers/utilities";

export interface InputProps<T = any, D extends InputDefinition = any> {
  definition: D;
  value: T;
  onChange: (value: T) => void;
}

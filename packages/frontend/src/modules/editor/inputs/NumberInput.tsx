import { NumberInputDefinition } from "@/modules/stickers/utilities";
import { Slider } from "@adobe/react-spectrum";
import { FC } from "react";
import { InputProps } from "./InputProps";

const NumberInput: FC<InputProps<number, NumberInputDefinition>> = (props) => {
  return (
    <Slider
      label={props.definition.displayName}
      value={props.value}
      onChange={props.onChange}
      minValue={props.definition.min}
      maxValue={props.definition.max}
    />
  );
};

export default NumberInput;

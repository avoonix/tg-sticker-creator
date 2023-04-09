import { NumberInputDefinition } from "@/modules/stickers/utilities";
import { Slider } from "@adobe/react-spectrum";
import { FC, useEffect, useState } from "react";
import { InputProps } from "./InputProps";

const NumberInput: FC<InputProps<number, NumberInputDefinition>> = (props) => {
  const [value, setValue] = useState(props.value); // onChange causes previews to update too frequently

  useEffect(() => {
    if (props.value !== value) setValue(props.value);
  }, [props.value]);

  return (
    <Slider
      onChangeEnd={props.onChange}
      label={props.definition.displayName}
      value={value}
      onChange={setValue}
      minValue={props.definition.min}
      maxValue={props.definition.max}
      step={props.definition.step ?? 1}
    />
  );
};

export default NumberInput;

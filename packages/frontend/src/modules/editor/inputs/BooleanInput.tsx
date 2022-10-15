import { BooleanInputDefinition } from "@/modules/stickers/utilities";
import { FC } from "react";
import { InputProps } from "./InputProps";
import { Switch } from "@adobe/react-spectrum";

const BooleanInput: FC<InputProps<boolean, BooleanInputDefinition>> = (
  props,
) => {
  return (
    <Switch isSelected={props.value} onChange={props.onChange}>
      {props.definition.displayName}
    </Switch>
  );
};

export default BooleanInput;

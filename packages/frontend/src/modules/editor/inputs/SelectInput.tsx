import { SelectInputDefinition } from "@/modules/stickers/utilities";
import { Item, Picker, Slider } from "@adobe/react-spectrum";
import { FC } from "react";
import { InputProps } from "./InputProps";

const SelectInput: FC<InputProps<string, SelectInputDefinition>> = (props) => {
  return (
    <Picker
      label={props.definition.displayName}
      items={props.definition.options}
      onSelectionChange={(k) =>
        typeof k === "number"
          ? console.error("unexpected number", k)
          : props.onChange(k)
      }
      selectedKey={props.value}
    >
      {(item) => <Item key={item.value}>{item.name}</Item>}
    </Picker>
  );
};

export default SelectInput;

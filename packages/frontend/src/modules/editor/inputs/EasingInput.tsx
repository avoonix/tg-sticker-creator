import {
  EasingInputDefinition,
  SelectInputDefinition,
} from "@/modules/stickers/utilities";
import { Item, Picker, Slider } from "@adobe/react-spectrum";
import { FC } from "react";
import { InputProps } from "./InputProps";
import { easings } from "tg-sticker-creator";

const EasingInput: FC<InputProps<string, EasingInputDefinition>> = (props) => {
  return (
    <Picker
      label={props.definition.displayName}
      items={Object.keys(easings).map((easing) => ({ easing }))}
      onSelectionChange={(k) =>
        typeof k === "number"
          ? console.error("unexpected number", k)
          : props.onChange(k)
      }
      selectedKey={props.value}
    >
      {(item) => (
        <Item key={item.easing}>
          {item.easing.replaceAll(
            /[A-Z]/g,
            (letter) => " " + letter.toLowerCase(),
          )}
        </Item>
      )}
    </Picker>
  );
};

export default EasingInput;

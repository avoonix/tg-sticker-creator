import ColorDialog from "@/modules/colors/ColorDialog";
import { paletteAtom } from "@/modules/palette/ColorList";
import PaletteColorPicker from "@/modules/palette/PaletteColorPicker";
import { ConfigRef } from "@/modules/stickers/execute";
import { ColorInputDefinition } from "@/modules/stickers/utilities";
import { ActionButton } from "@react-spectrum/button";
import { Switch } from "@react-spectrum/switch";
import { useAtom } from "jotai";
import { FC } from "react";
import { InputProps } from "./InputProps";

const ColorInput: FC<InputProps<string | ConfigRef, ColorInputDefinition>> = (
  props,
) => {
  const isCustom = typeof props.value === "string";
  const [colors] = useAtom(paletteAtom); // TODO: does this cause rerenders?

  const toggleCustom = () => {
    if (typeof props.value !== "string") {
      for (const c of colors) {
        if (c.id === props.value.paletteId) {
          return props.onChange(c.color);
        }
      }
    }
    props.onChange("#ff00ff");
  };

  return (
    <>
      {props.definition.displayName}
      {!isCustom && <ActionButton onPress={toggleCustom}>Custom</ActionButton>}
      <PaletteColorPicker
        id={typeof props.value === "string" ? null : props.value.paletteId}
        onChange={(paletteId) => props.onChange({ paletteId })}
        before={
          isCustom && (
            <ColorDialog
              color={props.value as string}
              onChangeClose={props.onChange}
            />
          )
        }
      />
    </>
  );
};

export default ColorInput;

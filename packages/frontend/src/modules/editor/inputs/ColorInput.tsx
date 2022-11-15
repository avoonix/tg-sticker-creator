import ColorDialog from "@/modules/colors/ColorDialog";
import PaletteColorPicker from "@/modules/palette/PaletteColorPicker";
import { ConfigRef } from "@/modules/stickers/execute";
import { ColorInputDefinition } from "@/modules/stickers/utilities";
import { Switch } from "@react-spectrum/switch";
import { FC } from "react";
import { InputProps } from "./InputProps";

const ColorInput: FC<InputProps<string | ConfigRef, ColorInputDefinition>> = (
  props,
) => {
  const toggleCustom = (custom: boolean) => {
    if (custom) {
      props.onChange("#ff00ff");
    } else {
      props.onChange({ paletteId: 1 });
    }
  };

  const toggle = (
    <Switch
      isSelected={typeof props.value === "string"}
      onChange={toggleCustom}
    >
      Custom
    </Switch>
  );
  const picker =
    typeof props.value === "string" ? (
      <ColorDialog color={props.value} onChangeClose={props.onChange} />
    ) : (
      <PaletteColorPicker
        id={props.value.paletteId}
        onChange={(paletteId) => props.onChange({ paletteId })}
      />
    );

  return (
    <>
      {props.definition.displayName}
      {toggle}
      {picker}
    </>
  );
};

export default ColorInput;

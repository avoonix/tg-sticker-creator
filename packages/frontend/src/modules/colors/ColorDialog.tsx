import { Content, Dialog, DialogTrigger } from "@adobe/react-spectrum";
import { Color, parseColor } from "@react-stately/color";
import { FC, useEffect, useState } from "react";
import ColorButton from "./ColorButton";
import ColorPicker from "./ColorPicker";
import ColorTabs from "./ColorTabs";
import SecondColorPicker from "./SecondColorPicker";
import TextColorPicker from "./TextColorPicker";

interface Props {
  color: string;
  onChange: (color: string) => void;
}

const ColorDialog: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  // const color = parseColor(props.color);
  // const setColor = (color: Color) => props.onChange(color.toString("rgb"));
  const [color, setColor] = useState(parseColor("hsb(0, 100%, 50%)"));

  useEffect(() => {
    setColor(parseColor(props.color).toFormat("hsb"));
  }, [props.color]);

  const changeColor = (color: Color) => {
    props.onChange(color.toString("hex"));
    setColor(color);
  };

  return (
    <DialogTrigger type="popover" isOpen={open} onOpenChange={setOpen}>
      <ColorButton color={color.toString("rgb")} />

      <Dialog>
        <Content>
          <ColorTabs
            first={<ColorPicker color={color} setColor={changeColor} />}
            second={<SecondColorPicker color={color} setColor={changeColor} />}
            third={<TextColorPicker color={color} setColor={changeColor} />}
          />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default ColorDialog;

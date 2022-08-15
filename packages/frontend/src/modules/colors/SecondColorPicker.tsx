import { Breadcrumbs, Flex, Grid, Item, View } from "@adobe/react-spectrum";
import { FC, useState } from "react";
import { parseColor } from "@react-stately/color";
import { ColorChannel } from "@react-types/color";
import {
  ColorArea,
  ColorField,
  ColorSlider,
  ColorWheel,
} from "@react-spectrum/color";

interface Props {}

const SecondColorPicker: FC<Props> = ({}) => {
  let [color, setColor] = useState(parseColor("hsba(0, 100%, 50%, 0.5)"));

  return (
    <div role="group" aria-label="HSBA Color Picker">
      <Flex gap="size-500" alignItems="center">
        <Flex direction="column">
          <ColorSlider value={color} onChange={setColor} channel={"hue"} />
          <ColorSlider
            value={color}
            onChange={setColor}
            channel={"saturation"}
          />
          <ColorSlider
            value={color}
            onChange={setColor}
            channel={"brightness"}
          />
          {/* <ColorSlider value={color} onChange={setColor} channel={"alpha"} /> */}
        </Flex>
      </Flex>
    </div>
  );
};

export default SecondColorPicker;

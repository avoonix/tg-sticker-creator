import { Flex } from "@adobe/react-spectrum";
import { ColorSlider } from "@react-spectrum/color";
import { Color } from "@react-stately/color";
import { FC } from "react";

interface Props {
  color: Color;
  setColor: (color: Color) => void;
}

const SecondColorPicker: FC<Props> = ({ color, setColor }) => {
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

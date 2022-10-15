import { Flex, Grid, View } from "@adobe/react-spectrum";
import { ColorArea, ColorWheel } from "@react-spectrum/color";
import { Color } from "@react-stately/color";
import { FC } from "react";

interface Props {
  color: Color;
  setColor: (color: Color) => void;
}

const ColorPicker: FC<Props> = ({ color, setColor }) => {
  const change = (val?: any) => {
    const newColor = (val || color).toFormat(colorSpace);
    setColor(newColor);
  };
  const colorSpace = color.getColorSpace();

  return (
    <Flex gap="size-500" alignItems="start">
      <Flex direction="column" gap={0} alignItems="center">
        <View position="relative" width="size-2400">
          <Grid
            position="absolute"
            justifyContent="center"
            alignContent="center"
            width="100%"
            height="100%"
          >
            <ColorArea
              size={"size-1200"}
              xChannel="saturation"
              yChannel="brightness"
              value={color}
              onChange={change}
            />
          </Grid>
          <ColorWheel size={"size-2400"} value={color} onChange={change} />
        </View>
      </Flex>

      <Flex
        direction="column"
        alignItems="center"
        gap="size-100"
        minWidth="size-1200"
      >
        <div
          role="img"
          aria-label={`color swatch: ${color.toString("rgb")}`}
          title={`${color.toString("hex")}`}
          style={{
            width: "96px",
            height: "96px",
            background: color.toString("css"),
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ColorPicker;

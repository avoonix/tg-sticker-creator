import { Breadcrumbs, Flex, Grid, Item, View } from "@adobe/react-spectrum";
import { FC, useState } from "react";
import { parseColor } from "@react-stately/color";
import { ColorChannel } from "@react-types/color";
import { ColorArea, ColorField, ColorWheel } from "@react-spectrum/color";

interface Props {}

const ColorPicker: FC<Props> = ({}) => {
  const change = (val?: any) => {
    console.log("change", val);
    const newColor = (val || color).toFormat(colorSpace);
    setColor(newColor);
  };
  const changeEnd = (val?: any) => console.log("change end", val);
  let [color, setColor] = useState(parseColor("hsb(0, 100%, 100%)"));
  let colorSpace = color.getColorSpace();

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
              onChangeEnd={changeEnd}
            />
          </Grid>
          <ColorWheel
            size={"size-2400"}
            value={color}
            onChange={change}
            onChangeEnd={changeEnd}
          />
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
        <ColorField
          label="HEX Color"
          value={color}
          onChange={change}
          onKeyDown={(event) =>
            event.key === "Enter" &&
            change((event.target as HTMLInputElement).value)
          }
          width="size-1200"
        />
      </Flex>
    </Flex>
  );
};

export default ColorPicker;

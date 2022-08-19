import { Flex } from "@adobe/react-spectrum";
import { ColorField } from "@react-spectrum/color";
import { Color } from "@react-stately/color";
import { FC } from "react";

interface Props {
  color: Color;
  setColor: (color: Color) => void;
}

const TextColorPicker: FC<Props> = ({color, setColor}) => {
  const change = (val?: any) => {
    console.log("change", val);
    const newColor = (val || color).toFormat(colorSpace);
    setColor(newColor);
  };
  let colorSpace = color.getColorSpace();

  return (
    <Flex gap="size-500" alignItems="start">
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

export default TextColorPicker;

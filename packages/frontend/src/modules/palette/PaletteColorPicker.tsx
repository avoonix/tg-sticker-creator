import { Grid, repeat } from "@adobe/react-spectrum";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import { useAtom } from "jotai";
import { FC, ReactNode } from "react";
import ColorButton from "../colors/ColorButton";
import { paletteAtom } from "./ColorList";

interface Props {
  id: number | null; // null .. none selected
  onChange: (value: number) => void;
  before?: ReactNode | undefined;
}

const PaletteColorPicker: FC<Props> = (props) => {
  const [colors] = useAtom(paletteAtom);

  return (
    <Grid
      columns={repeat("auto-fit", "size-800")}
      autoRows="size-800"
      justifyContent="center"
      gap="size-100"
    >
      {props.before}
      {colors.map((item) => (
        <ColorButton
          key={item.id}
          color={item.color}
          onPress={() => props.onChange(item.id)}
        >
          {props.id === item.id && <Checkmark size="L" />}
        </ColorButton>
      ))}
    </Grid>
  );
};

export default PaletteColorPicker;

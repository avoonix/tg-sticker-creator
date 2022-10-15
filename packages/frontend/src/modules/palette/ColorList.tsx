import { Grid, repeat } from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import { atom, useAtom, useSetAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { FC } from "react";
import ColorButton from "../colors/ColorButton";
import ColorItem from "./ColorItem";
import { PaletteEntry } from "../stickers/execute/PaletteEntry";

export const paletteAtom = atom<PaletteEntry[]>([]);
export const colorsAtom = splitAtom(paletteAtom);

// interface Props {}

const ColorList: FC = () => {
  const setPalette = useSetAtom(paletteAtom);

  const add = () => {
    setPalette((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((c) => c.id)) + 1,
        name: "color 0",
        color: "#ff00ff",
      },
    ]);
  };
  const [colors] = useAtom(colorsAtom);

  return (
    <Grid
      columns={repeat("auto-fit", "size-800")}
      autoRows="size-800"
      justifyContent="center"
      gap="size-100"
    >
      {colors.map((atom) => (
        <ColorItem key={atom.toString()} atom={atom} />
      ))}
      <ColorButton color="grey" onPress={add}>
        <Add size="L" />
      </ColorButton>
    </Grid>
  );
};

export default ColorList;

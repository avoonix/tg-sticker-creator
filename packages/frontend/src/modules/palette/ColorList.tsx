import { Grid, repeat } from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import { atom, useAtom, useSetAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { FC } from "react";
import ColorButton from "../colors/ColorButton";
import ColorItem from "./ColorItem";
import { PaletteEntry } from "./PaletteEntry";

const todosAtom = atom<PaletteEntry[]>([]);
  const colorsAtom = splitAtom(todosAtom);

interface Props {}

const ColorList: FC<Props> = ({}) => {
  const setTodos = useSetAtom(todosAtom);
  const add = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.random(), name: "color 0", color: "#ff00ff" },
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

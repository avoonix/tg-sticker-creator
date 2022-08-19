import { PrimitiveAtom, useAtom } from "jotai";
import { FC } from "react";
import ColorDialog from "../colors/ColorDialog";
import { PaletteEntry } from "./PaletteEntry";

interface Props {
  atom: PrimitiveAtom<PaletteEntry>;
}

const ColorItem: FC<Props> = ({ atom }) => {
  const [item, setItem] = useAtom(atom);
  const setColor = (color: string) => setItem((props) => ({ ...props, color }));
  return (
    <ColorDialog color={item.color} onChange={setColor} />
  );
};

export default ColorItem;

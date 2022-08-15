import {
  ActionButton,
  Breadcrumbs,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Grid,
  Heading,
  Item,
  Text,
  useDialogContainer,
  View,
} from "@adobe/react-spectrum";
import { FC, useCallback, useState } from "react";
import { parseColor } from "@react-stately/color";
import { ColorChannel } from "@react-types/color";
import { ColorArea, ColorField, ColorWheel } from "@react-spectrum/color";
import ColorPicker from "./ColorPicker";
import SecondColorPicker from "./SecondColorPicker";
import { Pressable } from "@react-aria/interactions";
import ColorButton from "./ColorButton";
import ColorTabs from "./ColorTabs";

interface Props {}

const ColorDialog: FC<Props> = ({}) => {
  let [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    console.log("click", open);
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <DialogTrigger type="popover" isOpen={open} onOpenChange={setOpen}>
      {/* <Flex direction="column" alignItems="center" gap="size-100"> */}
      <ColorButton />
      {/* <Pressable>
        <div
          onClick={toggle}
          style={{
            width: "100px",
            height: "100px",
            background: "#ff00ff",
            display: "inline-block",
          }}
        />
      </Pressable> */}
      {/* </Flex> */}
      {/* <ActionButton>Info</ActionButton> */}

      <Dialog>
        <Content>
          <ColorTabs
            first={<ColorPicker />}
            second={<SecondColorPicker />}
            third={<ColorPicker />}
          />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default ColorDialog;

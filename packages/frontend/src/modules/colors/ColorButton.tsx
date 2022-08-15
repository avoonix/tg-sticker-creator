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
import { FC, PropsWithChildren, useCallback, useRef, useState } from "react";
import { parseColor } from "@react-stately/color";
import { ColorChannel } from "@react-types/color";
import { ColorArea, ColorField, ColorWheel } from "@react-spectrum/color";
import ColorPicker from "./ColorPicker";
import SecondColorPicker from "./SecondColorPicker";
import { Pressable } from "@react-aria/interactions";
import { useButton } from "react-aria";

interface Props extends PropsWithChildren {}

const ColorButton: FC<Props> = (props) => {
  let { children } = props;
  let ref = useRef();
  let { buttonProps, isPressed } = useButton(
    {
      ...props,
      elementType: "span",
    },
    ref as any,
  );

  return (
    <span
      {...buttonProps}
      style={{
        background: isPressed ? "darkgreen" : "green",
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      ref={ref as any}
    >
      {children}
    </span>
  );
};

export default ColorButton;

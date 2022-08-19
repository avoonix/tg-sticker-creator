import { FC, PropsWithChildren, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

interface Props extends PropsWithChildren, AriaButtonProps<"span"> {
  color: string;
}

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
        background: props.color,
        outline: isPressed ? "1px solid white" : undefined,
        color: "white",
        padding: 10,
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={ref as any}
    >
      {children}
    </span>
  );
};

export default ColorButton;

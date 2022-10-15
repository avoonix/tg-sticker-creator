import { CSSProperties, FC, useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

interface Props extends AriaButtonProps<"span"> {
  color: string;
  style?: CSSProperties;
}

const ColorButton: FC<Props> = (props) => {
  const { children } = props;
  const ref = useRef();
  const { buttonProps, isPressed } = useButton(
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
        ...(props.style || {}),
      }}
      ref={ref as any}
    >
      {children}
    </span>
  );
};

export default ColorButton;

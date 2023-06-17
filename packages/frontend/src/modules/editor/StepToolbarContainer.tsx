import { View } from "@adobe/react-spectrum";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const StepToolbarContainer: FC<Props> = (props) => {
  return (
    <View
      UNSAFE_style={{
        display: "flex",
        justifyContent: "center",
        gap: "var(--spectrum-global-dimension-size-65)",
        flexWrap: "wrap",
      }}
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
      padding="size-250"
    >
      {props.children}
    </View>
  );
};

export default StepToolbarContainer;

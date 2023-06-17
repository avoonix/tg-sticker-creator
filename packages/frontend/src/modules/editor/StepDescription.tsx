import { Well } from "@react-spectrum/well";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const StepDescription: FC<Props> = (props) => {
  return <Well margin="single-line-height">{props.children}</Well>;
};

export default StepDescription;

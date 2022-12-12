import { Content, Dialog, Divider, Heading } from "@adobe/react-spectrum";
import { FC } from "react";
import { Lottie } from "tg-sticker-creator";
import PngList from "./PngList";

interface Props {
  lottie: Lottie;
}

const PngDialog: FC<Props> = (props) => {
  return (
    <Dialog>
      <Heading>Export PNG</Heading>
      <Divider />
      <Content>
        <PngList lottie={props.lottie} />
      </Content>
    </Dialog>
  );
};

export default PngDialog;

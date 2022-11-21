import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
} from "@adobe/react-spectrum";
import Import from "@spectrum-icons/workflow/Import";
import { FC } from "react";
import { Lottie } from "tg-sticker-creator";
import PngList from "./PngList";

interface Props {
  lottie: Lottie;
}

const PngButton: FC<Props> = (props) => {
  return (
    <DialogTrigger type="popover">
      <ActionButton>
        <Import />
        <Text>Export PNG</Text>
      </ActionButton>
      <Dialog>
        <Heading>Export PNG</Heading>
        <Divider />
        <Content>
          <PngList lottie={props.lottie} />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default PngButton;

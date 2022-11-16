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
import { useSetAtom } from "jotai";
import { FC } from "react";
import { configAtom } from "../stickers/useSticker";
import { Droppable } from "./Droppable";

const JsonImportButton: FC = (props) => {
  const setConfig = useSetAtom(configAtom);

  return (
    <DialogTrigger type="popover">
      <ActionButton>
        <Import />
        <Text>Import from File</Text>
      </ActionButton>
      <Dialog>
        <Heading>Import</Heading>
        <Divider />
        <Content>
          <Text>
            Select the <code>.json</code> file or drop it below.
          </Text>
          <Droppable />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export default JsonImportButton;

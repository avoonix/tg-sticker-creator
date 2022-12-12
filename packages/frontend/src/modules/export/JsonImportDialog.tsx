import { Content, Dialog, Divider, Heading, Text } from "@adobe/react-spectrum";
import { FC } from "react";
import { Droppable } from "./Droppable";

const JsonImportDialog: FC = (props) => {
  return (
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
  );
};

export default JsonImportDialog;

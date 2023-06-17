import { Button, Text } from "@adobe/react-spectrum";
import Gears from "@spectrum-icons/workflow/Gears";
import { FC } from "react";
import { useExport } from "./useExport";

const ExportButton: FC = () => {
  const { downloadJson } = useExport();

  return (
    <>
      <Button variant="secondary" onPress={downloadJson}>
        <Gears />
        <Text>Character Export to File</Text>
      </Button>
    </>
  );
};

export default ExportButton;

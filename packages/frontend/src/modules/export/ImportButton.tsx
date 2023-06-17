import { Button, DialogContainer, Text } from "@adobe/react-spectrum";
import Gears from "@spectrum-icons/workflow/Gears";
import { FC, useCallback, useState } from "react";
import JsonImportDialog from "./JsonImportDialog";

const ImportButton: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const handleImport = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <Button variant="secondary" onPress={handleImport}>
        <Gears />
        <Text>Character Import From File</Text>
      </Button>

      <DialogContainer onDismiss={() => setOpen(false)}>
        {isOpen && <JsonImportDialog />}
      </DialogContainer>
    </>
  );
};

export default ImportButton;

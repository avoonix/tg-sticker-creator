import {
  ActionButton,
  DialogContainer,
  Item,
  Menu,
  MenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Gears from "@spectrum-icons/workflow/Gears";
import { FC, useCallback, useState } from "react";
import JsonImportDialog from "./JsonImportDialog";
import { useExport } from "./useExport";

const SettingsMenu: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const { downloadJson } = useExport();

  const handleExport = useCallback(
    (key: string | number) => {
      switch (key) {
        case "import":
          setOpen(true);
          break;
        case "export":
          downloadJson();
          break;
      }
    },
    [setOpen],
  );

  return (
    <>
      <MenuTrigger>
        <ActionButton>
          <Gears />
          <Text>Character Export</Text>
        </ActionButton>
        <Menu onAction={handleExport}>
          <Item key="import">Import</Item>
          <Item key="export">Export</Item>
        </Menu>
      </MenuTrigger>

      <DialogContainer onDismiss={() => setOpen(false)}>
        {isOpen && <JsonImportDialog />}
      </DialogContainer>
    </>
  );
};

export default SettingsMenu;

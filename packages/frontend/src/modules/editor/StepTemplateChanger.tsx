import { Item, Menu, MenuTrigger, Text } from "@adobe/react-spectrum";
import { ActionButton } from "@react-spectrum/button";
import SwitchIcon from "@spectrum-icons/workflow/Switch";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

interface Props {
  step: number;
  stickers: { id: string; name: string }[];
}

const StepTemplateChanger: FC<Props> = (props) => {
  const router = useRouter();
  const configString = router.query.config
    ? `?config=${router.query.config}`
    : "";

  return (
    <MenuTrigger>
      <ActionButton>
        <SwitchIcon />
        <Text>Change Template</Text>
      </ActionButton>
      <Menu
        onAction={(key: any) =>
          router.replace(`/edit/${key}/step/${props.step}${configString}`)
        }
      >
        {props.stickers.map((s) => (
          <Item key={s.id}>{s.name}</Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
};

export default StepTemplateChanger;

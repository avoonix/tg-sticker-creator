import { Accordion, Item } from "@react-spectrum/accordion";
import { useAtom } from "jotai";
import { FC, useEffect, useMemo, useState } from "react";
import { Group } from "../stickers/execute";
import { configAtom, getConfigAtom } from "../stickers/useSticker";
import StickerStep from "./StickerStep";

interface Props {
  groups: Group[];
}

const StepGroups: FC<Props> = (props) => {
  const [config] = useAtom(configAtom);

  // const [visible, setVisible] = useState(props.groups);

  const visible = useMemo(
    () =>
      props.groups
        .map((g) => ({
          ...g,
          steps: g.steps.filter(
            (s) =>
              !s.visible ||
              s.visible({ config, enableIds: [], disableIds: [] }),
          ),
        }))
        .filter((g) => g.steps.length),
    [config, props.groups],
  );

  // useEffect(() => {
  //   setVisible(
  //   );
  // }, [config, props.groups]);

  return (
    // <div>
    <Accordion items={visible}>
      {(item: Group) => (
        <Item
          key={item.name}
          title={item.name}
          hasChildItems={false}
          textValue="asdf"
        >
          <>
            {item.steps
              // .filter((s) => !s.visible || s.visible({config}))
              .map((step) => (
                <StickerStep
                  group={item}
                  key={step.id}
                  configAtom={getConfigAtom(step.id)}
                  step={step}
                  disable={
                    item.multiple
                      ? []
                      : item.steps
                          .map((step) => step.id)
                          .filter((id) => id !== step.id)
                  }
                />
              ))}
          </>
        </Item>
      )}
    </Accordion>
  );
};

export default StepGroups;

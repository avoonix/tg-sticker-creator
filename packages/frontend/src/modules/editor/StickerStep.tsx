import { Button } from "@react-spectrum/button";
import { Text } from "@react-spectrum/text";
import { SetStateAction, useAtom, useSetAtom, WritableAtom } from "jotai";
import { FC, useState } from "react";
import ColorButton from "../colors/ColorButton";
import { Group, StepConfig } from "../stickers/execute";
import { configAtom, useGeneratedSticker } from "../stickers/useSticker";
import { FilterDefinition } from "../stickers/utilities";
import style from "./editor.module.css";
import StepInputs from "./StepInputs";
import StickerRenderer from "./StickerRenderer";

interface Props {
  step: FilterDefinition;
  group: Group;
  disable: string[];
  configAtom: WritableAtom<StepConfig, SetStateAction<StepConfig>, void>;
}

const StickerStep: FC<Props> = (props) => {
  const { lottie } = useGeneratedSticker({
    enable: [props.step.id],
    disable: props.disable,
  });

  const [changed, setChanged] = useState(false);

  const setWholeConfig = useSetAtom(configAtom);

  const [config, setConfig] = useAtom(props.configAtom);

  const active = config?.active || props.step.mandatory;

  const toggleActive = () => {
    if (props.step.mandatory) {
      console.log("step is mandatory");
      return;
    }
    if (!props.group.multiple) {
      //   for(const key of props.disable) {
      //   const configAtom = getConfigAtom(key);
      //   const set = useSetAtom(configAtom);
      // set((old) => ({ ...old, active: false }));
      //   }
      setWholeConfig((old) => {
        const config = { ...old };
        const active = !config[props.step.id]?.active;
        config[props.step.id] = Object.assign({}, config[props.step.id], {
          active,
        });
        for (const key of props.disable) {
          config[key] = Object.assign({}, config[key], { active: false });
        }
        if (!active) {
          if (props.disable.length) config[props.disable[0]].active = true;
          // activate a different step in the group
          else config[props.step.id].active = true; // only step in group
        }
        console.log({ disable: props.disable, old, config });
        return config;
      });
    } else {
      setConfig((old) => ({ ...old, active: !old?.active }));
    }
  };

  return (
    <div
      className={active ? style.activeStep : ""}
      style={{ position: "relative" }}
    >
      <h4>Step {props.step.displayName}</h4>
      <ColorButton
        style={{ width: "100%" }}
        onPress={toggleActive}
        color={active ? "#bf8a0f40" : "transparent"}
      >
        <StickerRenderer sticker={lottie} />
      </ColorButton>
      <StepInputs
        definition={props.step.inputs}
        configAtom={props.configAtom}
        onConfigChange={() => setChanged(true)}
      />
      {!active && changed && (
        <Button elementType="a" variant="cta" onPress={toggleActive}>
          <Text>Activate (Currently Inactive)</Text>
        </Button>
      )}
    </div>
  );
};

export default StickerStep;

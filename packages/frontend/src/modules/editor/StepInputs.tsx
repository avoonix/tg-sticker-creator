import { SetStateAction, useAtom, WritableAtom } from "jotai";
import { FC } from "react";
import { StepConfig } from "../stickers/execute";
import { InputDefinition, InputType } from "../stickers/utilities";
import BooleanInput from "./inputs/BooleanInput";
import ColorInput from "./inputs/ColorInput";
import { InputProps } from "./inputs/InputProps";
import NumberInput from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";

interface Props {
  configAtom: WritableAtom<StepConfig, SetStateAction<StepConfig>, void>;
  definition: Record<string, InputDefinition>;
  onConfigChange: () => void;
}

const StepInputs: FC<Props> = (props) => {
  const [config, setConfig] = useAtom(props.configAtom);

  const inputs: { [key in InputType]: FC<InputProps> } = {
    boolean: BooleanInput,
    color: ColorInput,
    number: NumberInput,
    select: SelectInput,
  };

  return (
    <div>
      {Object.entries(props.definition).map(([key, value]) => {
        const Input = inputs[value.type];
        return (
          <div key={key}>
            <Input
              definition={value}
              value={config?.[key] ?? value.default}
              onChange={(updated) =>
                setConfig((old) => {
                  props.onConfigChange();
                  return { ...old, [key]: updated };
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default StepInputs;

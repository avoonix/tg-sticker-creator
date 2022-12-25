import { FilterDefinition } from "../utilities/createFilter";

export interface Group {
  name: string;
  steps: FilterDefinition[];
  multiple: boolean;
  visible: boolean;
  // onStepSelected?: (selectedId: string, setInactive: (id: string) => Promise<void>) => Promise<void>
}

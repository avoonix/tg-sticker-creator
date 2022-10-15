import { GroupShape } from "tg-sticker-creator";

export const setHidden = (group: GroupShape, hidden = true, force = false) => {
  group.eachImmediateChildShape((shape) => {
    if (
      !force &&
      "name" in shape &&
      shape.name &&
      shape.name.includes("{hidden}")
    ) {
      return;
    }
    if (shape.is("GroupShape")) {
      return setHidden(shape, hidden, force);
    }
    shape.setHidden(hidden);
  });
  return group.setHidden(hidden);
};

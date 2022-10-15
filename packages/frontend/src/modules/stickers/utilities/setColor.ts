import { GroupShape } from "tg-sticker-creator";

export const setColor = (
  group: GroupShape,
  color: string,
  type: "FillShape" | "StrokeShape",
) =>
  group.eachChildShape(
    (shape) => shape.is(type) && shape.color.setValue(color),
  );

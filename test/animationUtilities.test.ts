import { create } from "../src";

describe("blink", () => {
  it("works", () => {
    const color = create.color("red");
    const blinkResult = create.animation.blink(color, {
      duration: 180,
      startFrame: 0,
      interval: 10,

      easing: "easeInOut",

      from: "red",
      to: "blue",
    });

    expect(blinkResult.getValue()).toHaveLength(18 * 2);

    expect(blinkResult).toMatchSnapshot();
    expect(blinkResult.toPlain({ precision: Infinity })).toMatchSnapshot();
  });
});

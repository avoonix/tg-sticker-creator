import { create, OffsetKeyframe } from "../src";

describe("keyframes", () => {
  test("jump", () => {
    const value = create
      .value(0)
      .addKeyframe(10, 10, "jump")
      .getValue() as OffsetKeyframe[];

    expect(value[0].jumpToEnd).toBeTruthy();
    expect(value[0].bezierIn).toBeFalsy();
    expect(value[0].bezierOut).toBeFalsy();

    expect(value[1].jumpToEnd).toBeFalsy();
    expect(value[1].bezierIn).toBeFalsy();
    expect(value[1].bezierOut).toBeFalsy();
  });
});

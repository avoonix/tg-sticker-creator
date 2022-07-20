import { create } from "../src";

describe("toPlain", () => {
  it("returns valid lottie animation", () => {
    const animation = create.sticker();
    const plain = animation.toPlain({ precision: Infinity });
    expect(plain).toMatchSnapshot();
  });
});

import {
  create,
  Keyframe,
  Lottie,
  LottieItem,
  OffsetKeyframe,
  PathKeyframe
} from "../src";
import { isClass, isClassArray } from "../src/core/util";

describe("isClass", () => {
  test("isClass", () => {
    expect(isClass(create.sticker(), LottieItem)).toBeTruthy();
    expect(isClass(create.transform(), Lottie)).toBeFalsy();
  });
  test("isClassArray", () => {
    expect(isClassArray([], Keyframe)).toBeTruthy();
    expect(isClassArray(new OffsetKeyframe(), Keyframe)).toBeFalsy();
    expect(isClassArray([new OffsetKeyframe(), 0], Keyframe)).toBeFalsy();
    expect(
      isClassArray([new OffsetKeyframe(), new PathKeyframe()], Keyframe)
    ).toBeTruthy();
  });
});

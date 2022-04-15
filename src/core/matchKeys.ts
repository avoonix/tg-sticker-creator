import { FindOptions } from "./internal";

/**
 * "*" matches exactly 1 item
 * "**" matches 0 or more items
 *
 * @param path
 */
export const parsePath = (path: string | string[]) => {
  if (Array.isArray(path)) {
    if (path[0] !== "**") {
      path = ["**", ...path];
    }
    return path;
  }
  const arr: string[] = ["**"];
  for (const token of path.split(" ")) {
    if (token === "*" || token === "**") {
      arr.push(token);
    } else if (arr[arr.length - 1] === "*" || arr[arr.length - 1] === "**") {
      arr.push(token);
    } else {
      arr[arr.length - 1] += " " + token;
    }
  }

  return arr;
};

/**
 * https://github.com/airbnb/lottie-android/blob/master/lottie/src/main/java/com/airbnb/lottie/model/KeyPath.java
 */
export const matchesKeyPath = (
  path: string[],
  key: string | undefined,
  depth: number,
  options: { match: "equal" | "indexof" }
) => {
  if (depth >= path.length) return false;
  const item = path[depth];
  if (item === "*" || item === "**" || keyMatches(key, item, options)) {
    return true;
  }

  return false;
};

export const incrementDepthByKeyPath = (
  path: string[],
  key: string | undefined,
  depth: number,
  options: { match: "equal" | "indexof" }
): number[] => {
  if (path[depth] !== "**") {
    // If it's not a globstar then it is part of the keypath.
    return [1];
  }
  if (depth === path.length - 1) {
    // The last key is a globstar.
    return [0];
  }
  if (keyMatches(key, path[depth + 1], options)) {
    // We are at a globstar and the next key is our current key so consume both.
    // or we need to look deepter for further matches (=0)
    return [2, 0];
  }
  return [0];
};

const endsWithGlobstar = (path: string[]) => {
  return path[path.length - 1] === "**";
};

const keyMatches = (
  key: string | undefined,
  keyFromPath: string,
  options: { match: "equal" | "indexof" }
) => {
  if (typeof key !== "string") {
    key = "";
  }
  if (options.match === "equal") {
    return key === keyFromPath;
  }
  return key.indexOf(keyFromPath) !== -1;
};

/**
 * Returns whether the key at specified depth is fully specific enough to match the full set of
 * keys in this keypath.
 */
export const fullyResolvesToKeyPath = (
  path: string[],
  key: string | undefined,
  depth: number,
  options: FindOptions
  // currentPartialKeyPath: (string | undefined)[]
): boolean => {
  if (depth >= path.length) {
    return false;
  }
  const isLastDepth = depth === path.length - 1;
  const keyAtDepth = path[depth];
  const isGlobstar = keyAtDepth === "**";

  if (!isGlobstar) {
    const matches = keyMatches(key, keyAtDepth, options) || keyAtDepth === "*";
    return (
      (isLastDepth || (depth === path.length - 2 && endsWithGlobstar(path))) &&
      matches
    );
  }

  const isGlobstarButNextKeyMatches =
    !isLastDepth && keyMatches(key, path[depth + 1], options);
  if (isGlobstarButNextKeyMatches) {
    return (
      depth === path.length - 2 ||
      (depth === path.length - 3 && endsWithGlobstar(path))
    );
  }

  if (isLastDepth) {
    return true;
  }
  if (depth + 1 < path.length - 1) {
    // We are a globstar but there is more than 1 key after the globstar we can't fully match.
    return false;
  }
  // Return whether the next key (which we now know is the last one) is the same as the current
  // key.
  return keyMatches(key, path[depth + 1], options);
};

export const propagateToChildrenKeyPath = (path: string[], depth: number) => {
  return depth < path.length - 1 || path[depth] === "**";
};

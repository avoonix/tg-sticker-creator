import {
  fullyResolvesToKeyPath,
  incrementDepthByKeyPath,
  LottieItem,
  matchesKeyPath, parsePath,
  propagateToChildrenKeyPath
} from "./internal";

export interface FindOptions {
  /**
   * match strategy for names
   *
   * `equal`: path segment and item name must be identical (default)
   *
   * `indexof`: path segment must be contained in the item name
   */
  match: "equal" | "indexof";
  // maxDepth: number;
  // maxResults: number;
}

  export class Resolver implements Resolvable {
    /**
     * @internal
     */
    resolveKeyPath(
      _keyPath: string[],
      _depth: number,
      _currentPartialKeyPath: (string | undefined)[],
      _options: FindOptions
    ): {
      thisItem: LottieItem;
      currentPartialKeyPath: (string | undefined)[];
    }[] {
      throw new Error("not impmlemented");
    }
    all(path: string | string[], options: Partial<FindOptions> = {}) {
      const keyPath = parsePath(path);
      const { match = "equal" } = options;
      const result = this.resolveKeyPath(keyPath, 0, [], {
        match,
      });
      return result.map(({ thisItem }) => thisItem);
    }

    first(
      path: string | string[],
      options: Partial<FindOptions> = {}
    ): LottieItem | null {
      return this.all(path, { ...options })[0] || null;
    }
  };

/**
 * TODO: document?
 */
export interface Resolvable {
  /**
   * @internal
   */
  resolveKeyPath(
    keyPath: string[],
    depth: number,
    currentPartialKeyPath: (string | undefined)[],
    options: FindOptions
  ): {
    thisItem: LottieItem;
    currentPartialKeyPath: (string | undefined)[];
  }[];
}

// helper method for all leave nodes
export const resolveCurrentItemHelper = (
  thisItem: { name?: string },
  keyPath: string[],
  depth: number,
  currentPartialKeyPath: (string | undefined)[],
  options: FindOptions
) => {
  if (
    fullyResolvesToKeyPath(
      keyPath,
      thisItem.name,
      depth,
      options
      // [ ...currentPartialKeyPath, thisItem.name, ]
    )
  ) {
    return [{ currentPartialKeyPath, thisItem: thisItem as LottieItem }];
  }
  return [];
};

// helper method for all containers (shapelayer, groupshape)
export const resolveChildren = (
  thisItem: { name?: string },
  keyPath: string[],
  depth: number,
  currentPartialKeyPath: (string | undefined)[],
  children: () => Generator<Resolvable, void, unknown>,
  options: FindOptions
) => {
  const resolved: {
    thisItem: LottieItem;
    currentPartialKeyPath: (string | undefined)[];
  }[] = [];
  if (!matchesKeyPath(keyPath, thisItem.name, depth, options)) {
    return [];
  }
  currentPartialKeyPath = [...currentPartialKeyPath, thisItem.name];
  if (
    fullyResolvesToKeyPath(
      keyPath,
      thisItem.name,
      depth,
      options
      // currentPartialKeyPath
    )
  ) {
    resolved.push({ currentPartialKeyPath, thisItem: thisItem as LottieItem });
  }

  if (propagateToChildrenKeyPath(keyPath, depth)) {
    for (const inc of incrementDepthByKeyPath(
      keyPath,
      thisItem.name,
      depth,
      options
    )) {
      const newDepth = depth + inc;
      for (const child of children()) {
        resolved.push(
          ...child.resolveKeyPath(
            keyPath,
            newDepth,
            currentPartialKeyPath,
            options
          )
        );
      }
    }
  }
  return resolved;
};

/**
 * @internal
 */
export const defaults = <T extends {}>(options: Partial<T>, defaultOptions: T) => {
  const result: any = {};
  for (const [key, defaultValue] of Object.entries(defaultOptions)) {
    result[key] = (options as any)[key] ?? defaultValue;
  }
  return result as T;
};

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export const timeSlice = <
  Args extends any[],
  T extends (...args: Args) => AsyncGenerator<any, any>,
>(
  generator: T,
): ((
  ...args: Args
) => Promise<Awaited<ReturnType<ReturnType<T>["return"]>>["value"]>) => {
  // TODO: use requestIdleCallback?
  return (...args: Args) =>
    new Promise((resolve) => {
      const gen = generator(...args);
      const next = async () => {
        const start = performance.now();
        let res: IteratorResult<any, any> | null = null;
        do {
          res = await gen.next();
        } while (!res.done && performance.now() - start < (1 / 60) * 1000); // stop work if it took more than a frame

        if (res.done) {
          resolve(res.value);
          return;
        }
        setTimeout(next);
      };
      next();
    });
};

import { Lottie, create as c, enums as en, easings as ea } from "tg-sticker-creator";

export const executeScript = async (
  script?: string,
  input?: Record<string, any>,
  animation?: Lottie
) => {
  let error: null | Error = null;
  const create = c;
  const enums = en;
  const easings = ea;

  if (!animation) {
    animation = create.sticker();
  }
  await (async () => {
    try {
      let execAsync: () => Promise<any> = () =>
        Promise.reject("failed to execute script");
      eval(`execAsync = async function() {${script}}`);
      await execAsync();
    } catch (e: any) {
      error = e;
    }
  })();
  return { animation, error };
};

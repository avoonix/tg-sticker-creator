import { objectToTgs } from "@/Library/tgsConverter";
import { Lottie } from "tg-sticker-creator";
import { useNotification } from "@/Notifications/notify";

const { createErrorNotification } = useNotification();

export const calculateFileSize = async (animation: Lottie) => {
  let size = 0;
  try {
    size = (await objectToTgs(animation)).size;
  } catch (error: any) {
    createErrorNotification(error);
  }
  return size;
};

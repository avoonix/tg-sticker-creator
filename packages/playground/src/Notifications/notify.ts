import { ref } from "vue";

export interface INotification {
  text: string;
}

const notification = ref<INotification | null>(null);
const open = ref(false);

const createNotification = async (n: INotification) => {
  closeNotification();
  await new Promise((r) => setTimeout(r, 200));
  open.value = true;
  notification.value = n;
};

const createErrorNotification = async (err: Error[] | Error) => {
  console.error("showing error notification for error(s)", err);
  await createNotification({
    text: "Error: " + 
      (Array.isArray(err)
        ? err.map((e) => e.message).join(", ")
        : err.message) || "unknown error occured",
  });
};

const closeNotification = () => {
  open.value = false;
};

export const useNotification = () => {
  return {
    notification,
    open,
    createNotification,
    closeNotification,
    createErrorNotification,
  };
};

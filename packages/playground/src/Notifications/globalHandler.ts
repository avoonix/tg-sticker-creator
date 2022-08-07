import { useNotification } from "./notify";

export const registerGlobalErrorHandlers = () => {
  const { createErrorNotification } = useNotification();
  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      if (event.reason) {
        createErrorNotification(event.reason);
        return true; // handled
      }
      return false;
    }
  );
  window.addEventListener(
    "error",
    (event: ErrorEvent) => {
      if (event.error) {
        createErrorNotification(event.error);
        return true; // handled
      }
      return false;
    },
    true
  );
};

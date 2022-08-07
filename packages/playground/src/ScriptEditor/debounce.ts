import { debounce } from "lodash";

export const useDebounce = <T extends (...args: any) => any>(
  func: T,
  time = 300
) => {
  return debounce(func, time);
};

import { pubSub } from "../App";

export function debouncerInit(eventName: string, fn: (...args: any[]) => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounce = (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      pubSub.unsubscribe(eventName, debounce);

      fn(...args);
      pubSub.subscribe(eventName, fn);
    }, 3000);
  };
  pubSub.subscribe(eventName, debounce);
  console.log(pubSub.cache);
}

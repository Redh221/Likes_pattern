import { pubSub } from "../App";

export function debouncerInit(
  eventName: string,
  fn: (...args: any[]) => void,
  fnInner: (...args: any[]) => void
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  pubSub.unsubscribe("sendLikes", fn);
  const debounce = (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      pubSub.unsubscribe(eventName, debounce);
      fnInner(...args);
      pubSub.subscribe(eventName, fn);
    }, 3000);
  };
  timer = setTimeout(() => {
    pubSub.unsubscribe(eventName, debounce);
    pubSub.subscribe(eventName, fn);
  }, 3000);
  pubSub.subscribe(eventName, debounce);
  console.log(pubSub.cache);
}

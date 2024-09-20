// export interface IPubSub {
//   // cache: any{};
//   // cache: {};
//   // cache: { [eventName: string]: EventCallback[] };
//   subscribe(eventName: string, fn: EventCallback): void;
//   unsubscribe(eventName: string, fn: EventCallback): void;
//   publish(eventName: string, ...args: any[]): void;
// }
type ArgsFn = unknown;
type EventCallback = (...args: ArgsFn[]) => void;
type CacheType = {
  [eventName: string]: EventCallback[];
};

export class PubSub<T extends keyof CacheType> {
  cache: CacheType;
  constructor() {
    this.cache = {};
  }
  subscribe(eventName: T, fn: EventCallback) {
    if (!this.cache[eventName]) {
      this.cache[eventName] = [];
    }

    if (!this.cache[eventName].includes(fn)) {
      this.cache[eventName].push(fn);
    }
  }
  unsubscribe(eventName: T, fn: EventCallback) {
    if (this.cache[eventName] && this.cache[eventName].length > 0) {
      let findResult = this.cache[eventName].findIndex((item) => item === fn);
      if (findResult > -1) {
        this.cache[eventName].splice(findResult, 1);
      }
    }
  }
  publish(eventName: T, ...args: ArgsFn[]) {
    if (this.cache[eventName] && this.cache[eventName].length > 0) {
      this.cache[eventName].forEach((item) => item(...args));
    }
  }
}

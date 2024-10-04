type ArgsFn = unknown;

type EventCallback = (...args: any[]) => void;
type CacheType = {
  [eventName: string]: EventCallback[];
};

export class PubSub<T extends string = string> {
  cache: CacheType;
  constructor() {
    this.cache = {};
  }
  subscribe(eventName: T, fn: EventCallback) {
    console.log("sub");
    if (!this.cache[eventName]) {
      this.cache[eventName] = [];
    }

    if (!this.cache[eventName].includes(fn)) {
      this.cache[eventName].push(fn);
    }
  }
  unsubscribe(eventName: T, fn: EventCallback) {
    console.log("unsub");
    if (this.cache[eventName] && this.cache[eventName].length > 0) {
      let findResult = this.cache[eventName].findIndex((item) => item === fn);
      if (findResult > -1) {
        this.cache[eventName].splice(findResult, 1);
      }
    }
  }
  publish(eventName: T, ...args: ArgsFn[]) {
    console.log("publish");
    if (this.cache[eventName] && this.cache[eventName].length > 0) {
      this.cache[eventName].forEach((item) => item(...args));
    }
  }
}

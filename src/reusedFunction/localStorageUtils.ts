import { pubSub } from "../App";
import { CurrentUserIdT } from "../types/StoreTypes";
import { debouncerInit } from "./customDebounce";

export const saveAllToLocalStorage = (
  par: CurrentUserIdT,
  booleanPar: boolean
) => {
  if (localStorage.getItem("ids") === null) {
    localStorage.setItem("ids", JSON.stringify([]));
  }

  const storedData = localStorage.getItem("ids");

  if (storedData) {
    let parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      if (parsedData.find((item) => item == par)) {
        if (!booleanPar) {
          parsedData = parsedData.filter((item) => item !== par);
        }
        console.log(`${par} имеется`);
      } else if (booleanPar) {
        parsedData.push(par);
      }
    } else {
      parsedData = [par];
    }

    localStorage.setItem("ids", JSON.stringify(parsedData));
  }
  pubSub.unsubscribe("sendLikes", saveAllToLocalStorage);
  debouncerInit("sendLikes", saveAllToLocalStorage);
};

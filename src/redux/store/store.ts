import { configureStore } from "@reduxjs/toolkit";
import { likeReducer } from "../reducers/rootReducer"; // Путь к вашему срезу

const storeV = configureStore({
  reducer: {
    like: likeReducer, // Добавляем редьюсер с правильным именем
  },
});

export default storeV;

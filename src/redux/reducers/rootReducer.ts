import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип для начального состояния
export interface LikesAmount {
  likes: number;
}

// Начальное состояние
const initialState: LikesAmount = {
  likes: 0,
};

// Создаем срез (slice)
const counterSlice = createSlice({
  name: "like", // Уникальное имя для этого среза
  initialState, // Начальное состояние
  reducers: {
    // Редьюсер для увеличения значения
    increment(state) {
      state.likes += 1;
    },
    // Редьюсер для уменьшения значения
    decrement(state) {
      state.likes -= 1;
    },
    // Редьюсер для изменения значения на произвольное число
    incrementToAmount(state, action: PayloadAction<number>) {
      state.likes = action.payload;
    },
  },
});

// Экспортируем actions, созданные createSlice
export const { increment, decrement, incrementToAmount } = counterSlice.actions;

// Экспортируем редьюсер для использования в store
export const likeReducer = counterSlice.reducer;

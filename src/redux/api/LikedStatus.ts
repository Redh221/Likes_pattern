import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ApiLikeUnit,
  ApiRequestIsLikedT,
  RootState,
} from "../../types/StoreTypes";

export const apiRequestIsLiked = createAsyncThunk<
  ApiRequestIsLikedT,
  void,
  { state: RootState }
>(
  "likes/apiRequestIsLiked",

  async (_, { getState }) => {
    const state = getState();
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: ApiLikeUnit[] = await response.json();

    return data.some((item) => item.id === state.userStore.id);
  }
);

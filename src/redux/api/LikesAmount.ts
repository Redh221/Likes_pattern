import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRequestLikesT, RootState } from "../../types/StoreTypes";
export const apiRequestLikes = createAsyncThunk<
  ApiRequestLikesT,
  void,
  { state: RootState }
>(
  "likes/apiRequestLikes",

  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.length;
  }
);

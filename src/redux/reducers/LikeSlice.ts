import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiRequestIsLiked } from "../api/LikedStatus";
import { apiRequestLikes } from "../api/LikesAmount";
import { likeStoreI } from "../../types/StoreTypes";

const initialState: likeStoreI = {
  likes: NaN,
  isLoading: false,
  isLiked: false,
};
export const likeSlice = createSlice({
  name: "likeStore",

  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<number>) => {
      state.likes = action.payload;
    },
    incrementLikes: (state, action: PayloadAction<number>) => {
      state.likes += action.payload;
      state.isLiked = true;
    },
    decrementLikes: (state, action: PayloadAction<number>) => {
      state.likes -= action.payload;
      state.isLiked = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(
        apiRequestLikes.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.likes = action.payload;
          state.isLoading = false;
        }
      )

      .addCase(
        apiRequestIsLiked.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isLiked = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});
export const { setLikes, decrementLikes, incrementLikes } = likeSlice.actions;
export default likeSlice.reducer;

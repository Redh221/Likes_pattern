import { createSlice } from "@reduxjs/toolkit";
import { CurrentUserStoreI } from "../../types/StoreTypes";

const initialState: CurrentUserStoreI = {
  id: 11,
  loginStatus: true,
};
export const userSlice = createSlice({
  name: "currentUserInfo",
  initialState,
  reducers: {
    logOut: (state) => {
      state.loginStatus = false;
      state.id = undefined;
    },
  },
});
export const { logOut } = userSlice.actions;
export default userSlice.reducer;

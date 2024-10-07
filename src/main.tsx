import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import likeSliceReducer from "./redux/reducers/LikeSlice";
import userSliceReducer from "./redux/reducers/UserSlice";

export const store = configureStore({
  reducer: { likeStore: likeSliceReducer, userStore: userSliceReducer },
});
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);

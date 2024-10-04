import { store } from "../main";
// redux/reducers/LikeSlice.ts
export interface likeStoreI {
  likes: number;
  isLoading: boolean;
  isLiked: boolean;
}
// redux/reducers/UserSlice.ts
export interface CurrentUserStoreI {
  id: number | undefined;
  loginStatus: boolean;
}
//Main.tsx
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// redux/api/LikeStatus.ts
export interface ApiLikeUnit {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type ApiRequestIsLikedT = likeStoreI["isLiked"];

// redux/api/LikeAmounts.ts
export type ApiRequestLikesT = likeStoreI["likes"];
//modal/Modal.tsx/
export type CurrentUserIdT = CurrentUserStoreI["id"];

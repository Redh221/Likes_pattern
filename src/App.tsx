import { useEffect } from "react";
import "./App.css";
import Modal from "./modal/Modal";

import { useDispatch } from "react-redux";
import { apiRequestLikes } from "./redux/api/LikesAmount";
import { apiRequestIsLiked } from "./redux/api/LikedStatus";
import { AppDispatch } from "./types/StoreTypes";
import { PubSub } from "./PubSubPattern";
export const pubSub = new PubSub();
function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRequestLikes());
    dispatch(apiRequestIsLiked());
  }, [dispatch]);

  return (
    <div>
      <Modal />
    </div>
  );
}

export default App;

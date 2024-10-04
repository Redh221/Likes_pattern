import React, { useEffect } from "react";
import "./Modal.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { decrementLikes, incrementLikes } from "../redux/reducers/LikeSlice";
import ClipLoader from "react-spinners/ClipLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  AppDispatch,
  CurrentUserIdT,
  likeStoreI,
  RootState,
} from "../types/StoreTypes";
import { StyledLikeButtonProps } from "../types/AppTypes";
import { PubSub } from "../PubSubPattern";
import { saveAllToLocalStorage } from "../reused functions/localStorageUtils";
import { pubSub } from "../App";
// interface ModalProps {
//   pubSubProps: PubSub<string>; // Убедитесь, что тип соответствует ожидаемому
// }

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const StyledLikeButton = styled(StyledButton).withConfig({
  shouldForwardProp: (prop) => prop !== "buttonStateProps",
})<StyledLikeButtonProps>`
  background-color: ${(props) => (props.buttonStateProps ? "red" : "blue")};
  color: ${(props) => (props.buttonStateProps === true ? "green" : "white")};
`;

const Modal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const likesRedux = useSelector((state: RootState) => state.likeStore.likes);
  const loadingLikeRedux = useSelector(
    (state: RootState) => state.likeStore.isLoading
  );
  const isLikedRedux = useSelector(
    (state: RootState) => state.likeStore.isLiked
  );
  const currentUserIdRedux = useSelector(
    (state: RootState) => state.userStore.id
  );

  const handleChangeLikes = () => {
    if (!isLikedRedux) {
      dispatch(incrementLikes(1));
      pubSub.publish("sendLikes", currentUserIdRedux, true);
    } else {
      pubSub.publish("sendLikes", currentUserIdRedux, false);
      dispatch(decrementLikes(1));
    }
  };
  useEffect(() => {
    pubSub.subscribe("sendLikes", saveAllToLocalStorage);

    return () => {
      pubSub.unsubscribe("sendLikes", saveAllToLocalStorage);
    };
  }, []);

  function formatNumber(par: likeStoreI["likes"]) {
    let formattedLikes;
    switch (true) {
      case par < 1000:
        formattedLikes = par;
        break;
      case par >= 1000 && par < 10000:
        formattedLikes = (Math.round(par / 100) / 10).toFixed(1) + "K";
        break;
      case par >= 10000:
        formattedLikes = Math.round(par / 1000) + "K";
        break;
      default:
        formattedLikes = par;
    }
    return formattedLikes;
  }

  // saveAllToLocalStorage(currentUserIdRedux, false);
  return (
    <div className="modal-container">
      <div className="modal-content">
        {loadingLikeRedux ? (
          <h2>
            Loading
            <ScaleLoader
              style={{ marginLeft: "40px" }}
              color="black"
              loading={loadingLikeRedux}
              height={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </h2>
        ) : (
          <h2>Do you like this?</h2>
        )}
        <div className="buttons">
          <StyledLikeButton
            buttonStateProps={isLikedRedux}
            onClick={handleChangeLikes}
          >
            {loadingLikeRedux ? (
              <ClipLoader
                color="yellow"
                loading={loadingLikeRedux}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              `👍 Like ${formatNumber(likesRedux)}`
            )}
          </StyledLikeButton>
          <button className="dislike-button">ASD 👎 Dislike </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementToAmount,
} from "../redux/reducers/rootReducer";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
const StyledLikeButton = styled(StyledButton).attrs((props) => ({
  isLiked: undefined, // Prevents isLiked from being passed to DOM
}))`
  background-color: ${(props) => (props.isLiked ? "lightblue" : "blue")};
  color: ${(props) => (props.isLiked ? "red" : "white")};
`;

const Modal = ({ apiProps, pubSubProps }) => {
  const likes = useSelector((state) => state.like?.likes);
  console.log(likes);

  const [dislikes, setDislikes] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  // const likesRef = useRef(0);
  const [showedLikes, setShowedLikes] = useState(0);
  const dispatch = useDispatch();
  function formatNumber(par) {
    let formattedLikes;
    dispatch(incrementToAmount(par));
    switch (true) {
      case par < 1000:
        formattedLikes = par;
        console.log("check1");
        break;
      case par >= 1000:
        formattedLikes = (Math.round(par / 100) / 10).toFixed(1) + "K"; // right way to round  / forces amount of decimal
        console.log("check2");
        break;
      case par > 10000:
        formattedLikes = Math.round(par / 1000) + "K"; // right way to round
    }

    if (formattedLikes != showedLikes) {
      setShowedLikes(formattedLikes);
    }
  }

  const handleLike = () => {
    if (buttonState === false) {
      formatNumber(likes + 1);
      setButtonState(true);
    } else if (buttonState === true) {
      formatNumber(likes - 1);
      setButtonState(false);
    }
  };

  const handleDislike = () => {
    // setDislikes(dislikes + 1);
  };

  useEffect(() => {
    pubSubProps.subscribe("fetch", console.log);
    apiProps().then((value: any) => {
      formatNumber(value.length + 9849);
      pubSubProps.publish("fetch", value);
    });
  }, []);

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Do you like this?</h2>
        <div className="buttons">
          <StyledLikeButton isLiked={buttonState} onClick={handleLike}>
            👍 Like {showedLikes}
          </StyledLikeButton>
          <button className="dislike-button" onClick={handleDislike}>
            ASD 👎 Dislike {dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// console.log(Math.round(1000) / 10);

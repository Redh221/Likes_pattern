import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import styled from "styled-components";
const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
const StyledLikeButton = styled(StyledButton)`
  background-color: ${(props) =>
    props.buttonStateProps === true ? "lightblue" : "blue"};
  color: ${(props) => (props.buttonStateProps === true ? "red" : "white")};
`;

const Modal = ({ apiProps, pubSubProps }) => {
  // const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const likesRef = useRef(0);

  const [showedLikes, setShowedLikes] = useState(0);
  function formatNumber(par) {
    let formattedLikes;
    likesRef.current = par;
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
      formatNumber(likesRef.current + 1);
      setButtonState(true);
    } else if (buttonState === true) {
      formatNumber(likesRef.current - 1);
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
          <StyledLikeButton buttonStateProps={buttonState} onClick={handleLike}>
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

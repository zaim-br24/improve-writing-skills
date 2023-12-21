import React from "react";
import Wrapper from "../styles/buttonRow";
export default function buttonRow({ text, handleBtnClick, type, backgroundColor }) {
  return (
    // backgroundColor={backgroundColor}
    <Wrapper  >
      <button type={type} onClick={handleBtnClick}>
        {text}
      </button>
    </Wrapper>
  );
}

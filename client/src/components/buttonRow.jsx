import React from "react";
import Wrapper from "../styles/buttonRow";
export default function buttonRow({ text, handleBtnClick }) {
  return (
    <Wrapper>
      <button onClick={handleBtnClick}>{text}</button>
    </Wrapper>
  );
}

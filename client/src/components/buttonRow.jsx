import React from "react";
import Wrapper from "../styles/buttonRow";
export default function buttonRow({ text, handleBtnClick, type }) {
  return (
    <Wrapper>
      <button type={type} onClick={handleBtnClick}>{text}</button>
    </Wrapper>
  );
}

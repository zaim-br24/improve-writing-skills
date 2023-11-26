import React from "react";
import Wrapper from "../styles/userTextContainer";
import { ButtonRow } from "../components";
export default function userTextContainer({
  handleTextareaChnage,
  value,
  showBtn,
}) {
  return (
    <Wrapper>
      <textarea
        rows="5"
        cols="50"
        placeholder="Write what you hear."
        onChange={handleTextareaChnage}
        value={value}
      ></textarea>
      {showBtn && <ButtonRow text="Check my Text" />}
    </Wrapper>
  );
}

import React from "react";
import Wrapper from "../styles/loader";
export default function Loader() {
  return (
    <Wrapper>
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </Wrapper>
  );
}

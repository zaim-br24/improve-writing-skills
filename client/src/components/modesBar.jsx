import React, { useState } from "react";
import Wrapper from "../styles/modesBar";
import { levels } from "../constants";
export default function modesBar() {
  const [activeMode, setActiveMode] = useState("beginner");

  const handleClick = (e) => {
    // setActiveMode(active)
    const active = e.target.getAttribute("name");
    setActiveMode(active);
    console.log(active);
  };
  return (
    <Wrapper>
      <p className="title">level:</p>
      <div className="modes-container">
        {levels.map((level, index) => {
          return (
            <div
              className={`${activeMode === level.level ? "mode active" : "mode"}`}
              key={index}
              name={level.level}
              onClick={handleClick}
            >
              {level.level}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

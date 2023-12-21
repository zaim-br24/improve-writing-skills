import React, { useState, useEffect } from "react";
import Wrapper from "../styles/modesBar";
import { levels } from "../constants";
import { useAppContext } from "../context/appContext";
export default function modesBar() {
  const { toggleCategory } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("beginner");

  const handleClick = (e) => {
    const active = e.target.getAttribute("name");
    setActiveCategory(active);
  };
  useEffect(() => {
    toggleCategory(activeCategory);
  }, [activeCategory]);
  return (
    <Wrapper>
      <p className="title">level:</p>
      <div className="modes-container">
        {levels.map((level, index) => {
          return (
            <div
              className={`${
                activeCategory === level.level ? "mode active" : "mode"
              }`}
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

import React from "react";
import Wrapper from "../styles/languageBar";
import { SpecialBtn } from ".";
import { languages } from "../constants";
import {IoAdd } from "react-icons/io5";

export default function languageBar() {
  return (
    <Wrapper>
      {languages.map((language, index) => {
        return (
          <div className="language-btn" key={index}>
            {language.name}
          </div>
        );
      })}
      <SpecialBtn
        className="special-btn"
        text="Practice"
        // handleClick={() => nextCustomText()}
        link="/settings/practice"
        icon={<IoAdd className="icon" />}
      />
    </Wrapper>
  );
}

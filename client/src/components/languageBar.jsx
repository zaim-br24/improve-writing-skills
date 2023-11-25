import React from "react";
import Wrapper from "../styles/languageBar";
import { languages } from "../constants";
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
    </Wrapper>
  );
}

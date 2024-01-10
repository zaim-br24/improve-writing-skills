import React from "react";
import Wrapper from "../styles/languageBar";
import { SpecialBtn } from ".";
import { languages } from "../constants";
import {IoAdd } from "react-icons/io5";
import { useAppContext } from "../context/appContext";
export default function languageBar() {
  const {user} = useAppContext()
  return (
    <Wrapper>
      {languages.map((language, index) => {
        return (
          <div className="language-btn" key={index}>
            {language.name + "-(US)"}
          </div>
        );
      })}
      <SpecialBtn
        className="special-btn"
        text="Practice"
        // handleClick={() => nextCustomText()}
        link={user ? "/settings/practice" : "/register"}
        icon={<IoAdd className="icon" />}
      />
    </Wrapper>
  );
}

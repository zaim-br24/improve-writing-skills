import React, { useState, useEffect } from "react";
import { Wrapper, Editor, Right, Left } from "../styles/WritingSkills";
import { Alert } from "../components";

import {
  AudioContainer,
  ButtonRow,
  LanguageBar,
  ModesBar,
  UserTextContainer,
  OriginalTextContainer,
} from "../components";
import { useAppContext } from "../context/appContext";
export default function WritingSkills() {
  const { checkValues, isLoading, mistakes, generatedText } = useAppContext();
  const [userText, setUserText] = useState("");
  const [showMistakes, setShowMistakes] = useState(false);

  const handleTextareaChnage = (e) => {
    setUserText(e.target.value);
  };
  const handleCheckBtn = () => {
    checkValues({ generatedText, userText });
    setShowMistakes(true);
  };
  const handleCloseMistakes = () => {
    setShowMistakes(false);
  };
  const handleFixErros = () => {
    setUserText(generatedText)
    handleCloseMistakes()
  }
  return (
    <Wrapper>
      <LanguageBar />
      <ModesBar />
      <Editor>
        <Right>
          <UserTextContainer
            handleTextareaChnage={handleTextareaChnage}
            placeholder={"Write what you hear."}
            value={userText}
            handleDelete={() => setUserText("")}
            handleCheckBtn={handleCheckBtn}
            showMistakes={showMistakes}
            handleCloseMistakes={handleCloseMistakes}
            handleFixErros={handleFixErros}
          />
        </Right>
        <Left>
          <AudioContainer />
          <OriginalTextContainer placeholder={generatedText}  showMistakes={showMistakes}/>
        </Left>
      </Editor>
    </Wrapper>
  );
}

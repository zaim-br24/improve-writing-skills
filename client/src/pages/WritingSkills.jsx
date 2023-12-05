import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Editor,
  Right,
  Left,
  Benefits,
  Title,
  Card,
  Cards,
} from "../styles/WritingSkills";
import { Alert } from "../components";
import styled from "styled-components";
import {
  AudioContainer,
  ButtonRow,
  LanguageBar,
  ModesBar,
  UserTextContainer,
  OriginalTextContainer,
  Footer,
} from "../components";
import { benefits } from "../constants/index";
import { useAppContext } from "../context/appContext";
export default function WritingSkills() {
  const { checkValues, isLoading, mistakes, generatedText, toggleMistakes } =
    useAppContext();
  const [userValue, setUserValue] = useState("");
  const [showMistakes, setShowMistakes] = useState(false);

  const handleTextareaChnage = (e) => {
    setUserValue(e.target.value);
  };
  const handleCheckBtn = () => {
    toggleMistakes(true);
    checkValues({ generatedText, userValue });
  };
  const handleCloseMistakes = () => {
    // setShowMistakes(false);
    toggleMistakes(false);
  };
  const handleFixErros = () => {
    setUserValue(generatedText);
    handleCloseMistakes();
  };
  return (
    <Wrapper>
      <>
        <LanguageBar />
        <ModesBar />
        <Editor>
          <Right>
            <UserTextContainer
              handleTextareaChnage={handleTextareaChnage}
              placeholder={"Write what you hear."}
              value={userValue}
              handleDelete={() => setUserValue("")}
              handleCheckBtn={handleCheckBtn}
              // showMistakes={showMistakes}
              handleCloseMistakes={handleCloseMistakes}
              handleFixErros={handleFixErros}
            />
          </Right>
          <Left>
            <AudioContainer />
            <OriginalTextContainer
              placeholder={generatedText}
              // showMistakes={showMistakes}
            />
          </Left>
        </Editor>
      </>
      <Benefits>
        <Title>Master Sentences for Effective Communication</Title>
        <Cards>
          {benefits.map((item, index) => {
            return (
              <Card key={index}>
                <p className="name">{item.name}</p>
                <p className="content">{item.content}</p>
              </Card>
            );
          })}
        </Cards>
      </Benefits>
      <Footer></Footer>
    </Wrapper>
  );
}

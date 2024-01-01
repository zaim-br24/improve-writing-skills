import React, { useState } from "react";
import { Wrapper, MistakesContainer } from "../styles/userTextContainer";
import { ButtonRow } from "../components";
import { MdDeleteOutline, MdClose } from "react-icons/md";
import { useAppContext } from "../context/appContext";

export default function userTextContainer({
  handleTextareaChnage,
  value,
  placeholder,
  handleDelete,
  handleCheckBtn,
  handleCloseMistakes,
  handleFixErros,
}) {
  const {
    mistakes,
    generatedText,
    mistakesCount,
    showMistakes,
    myCustomTexts,
  } = useAppContext();
  return (
    <Wrapper>
      {value.length > 5 && (
        <MdDeleteOutline onClick={handleDelete} className="delete-icon" />
      )}
      <textarea
        rows="5"
        cols="50"
        placeholder={placeholder}
        onChange={handleTextareaChnage}
        value={value}
      ></textarea>
      <div className="bottom-bar">
        {!!value.length && !myCustomTexts && (
          <ButtonRow
            type="click"
            handleBtnClick={handleCheckBtn}
            text="Check my Text"
          />
        )}
      </div>
      {showMistakes && (
        <MistakesContainer>
          <div className="mistakes">
            <div className="mistakes-text">
              <p className={mistakesCount >= 1 ? "error" : "correct"}>
                {Math.ceil(mistakesCount)} /
                {mistakesCount >= 1 ? "Errors" : "Error"}
              </p>

              {mistakes && mistakes.length === 0 && (
                <p className="correct">well done. No errors were found.</p>
              )}
              {mistakes &&
                mistakes.map((mistake, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index}>
                      <p
                        className={
                          isEven && mistakes.length > 1 ? "correct" : "error"
                        }
                      >
                        {mistake}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="mistakes-action">
              {mistakes && mistakes.length > 0 && (
                <ButtonRow text="Fix Errors" handleBtnClick={handleFixErros} />
              )}
            </div>
          </div>
          <div className="close-mistakes-btn">
            <MdClose className="close-icon" onClick={handleCloseMistakes} />
          </div>
        </MistakesContainer>
      )}
    </Wrapper>
  );
}

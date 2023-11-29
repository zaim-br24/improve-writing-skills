import React, { useEffect, useState } from "react";
import Wrapper from "../styles/originalTextContainer";
import { ButtonRow, Loader } from "../components";
import { useAppContext } from "../context/appContext";
import { HiEyeOff, HiEye } from "react-icons/hi";

export default function originalTextContainer({ placeholder }) {
  const { getContent, generatedText, activeCategory, isLoading } =
    useAppContext();
  const [hide, setHide] = useState(false);
  useEffect(() => {
    getContent();
  }, [activeCategory]);
  return (
    <Wrapper>
      {isLoading && <Loader />}
      {/* <Loader /> */}
      {hide ? (
        <div className="original-text-container">
          <p className="original-text">
            {hide && (placeholder || generatedText)}
          </p>
        </div>
      ) : (
        <div className="hidden-overlay-container">
          <div className="hidden-overlay">
            <p>Text is Hidden</p>
            <div className="show-text" onClick={() => setHide(true)}>
              Show Text <HiEyeOff />
            </div>
          </div>
        </div>
      )}

      <div className="bottom-bar">
        {<ButtonRow text="Generate a Text" handleBtnClick={getContent} />}
        {hide ? (
          <span className="show-text" onClick={() => setHide(false)}>
            Hide Text <HiEye />
          </span>
        ) : (
          <span className="show-text" onClick={() => setHide(true)}>
            Read Text <HiEyeOff />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

import React, { useEffect, useState } from "react";
import Wrapper from "../styles/originalTextContainer";
import { Loader, Switch, SpecialBtn } from "../components";
import { useAppContext } from "../context/appContext";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { IoReload, IoArrowForwardOutline } from "react-icons/io5";

export default function originalTextContainer({ placeholder }) {
  const {
    getContent,
    generatedText,
    activeCategory,
    isLoading,
    toggleMistakes,
    clearUserText,
    myCustomTexts,
    toggleContent,
    nextCustomText,
    currentCustomText,
    practiceMyText,
    getCustomTexts,
    customTexts,
    togglePlaying,
  } = useAppContext();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!myCustomTexts) {
      getContent();
    } else {
      practiceMyText();
    }
  }, [activeCategory, myCustomTexts, currentCustomText]);

  const handleGetContent = () => {
    if (!myCustomTexts) {
      getContent();
    }
    toggleContent(false);
    setHide(false);
    toggleMistakes(false);
    clearUserText();
    togglePlaying(false)
  };
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
        {/* <div className="generate-text" onClick={handleGetContent}>
          <span>Generate</span> <IoReload className="generate-icon" />
        </div> */}

        {myCustomTexts ? (
          <SpecialBtn
            className=""
            text="Next"
            handleClick={() => nextCustomText()}
            icon={<IoArrowForwardOutline className="icon" />}
          />
        ) : (
          <SpecialBtn
            className=""
            text="Generate"
            handleClick={handleGetContent}
            icon={<IoReload className="icon" />}
          />
        )}
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

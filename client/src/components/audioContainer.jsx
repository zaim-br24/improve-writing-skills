import React, { useState, useRef, useEffect } from "react";
import { Wrapper, PlayBtn, AddText } from "../styles/audio";
import { useAppContext } from "../context/appContext";
import { IoPlay } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { ButtonRow } from "../components";

export default function AudioContainer() {
  const { audioUrl, isLoading } = useAppContext();
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused || audio.ended) {
      setIsPlaying(true);
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <Wrapper>
      <div className="container-audio">
        <audio ref={audioRef} key={audioUrl} >
          <source src={audioUrl} type="audio/ogg"></source>
        </audio>
        <PlayBtn onClick={togglePlay}>
          <span className={isPlaying ? "special-btn" : ""}>
            {isPlaying ? (
              <>
                Stop
                <HiSpeakerWave className="icon" />
              </>
            ) : (
              <>
                Listen
                <IoPlay className="icon" />
              </>
            )}
          </span>
        </PlayBtn>
        {/* <AddText >+</AddText> */}
        {/* <ButtonRow
          backgroundColor
          className="addTextBtn"
          text="+"
          type="click"
        /> */}
      </div>
    </Wrapper>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Wrapper, PlayBtn, AddText } from "../styles/audio";
import { useAppContext } from "../context/appContext";
import { IoPlay, IoPlayBack } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { SpecialBtn } from "../components";

export default function AudioContainer() {
  const {
    audioUrl,
    isLoading,
    togglePlaying,
    isPlaying,
    activeSpeed,
    togglePlaySpeed,
  } = useAppContext();
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  // const [activeSpeed , setActiveSpeed] = useState("")

  useEffect(() => {
    const audio = audioRef.current;
    audio.playbackRate = activeSpeed;

    const handleEnded = () => {
      togglePlaying(false);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying, activeSpeed]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused || audio.ended) {
      togglePlaying(true);
      audio.play();
    } else {
      togglePlaying(false);
      audio.pause();
    }
  };

  const setAudioSpeed = (speedValue) => {
    togglePlaySpeed(speedValue);
    const audio = audioRef.current;
    setSpeed(speedValue);
    audio.playbackRate = speedValue;
  };
  const decreaseAudioTime = () => {
    const audio = audioRef.current;
    audio.currentTime -= 5;
    console.log(audio.currentTime)
  };
  return (
    <Wrapper>
      <div className="container-audio">
        <audio ref={audioRef} key={audioUrl}>
          <source src={audioUrl} type="audio/ogg"></source>
        </audio>
        
          {/* <IoPlayBack className="icon" onClick={decreaseAudioTime} /> */}
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
        
        <div className="speed-btns">
          <button
            className={
              activeSpeed === 1 ? "speed-btn active-speed" : "speed-btn"
            }
            name="1"
            onClick={() => setAudioSpeed(1)}
          >
            1x
          </button>

          <button
            className={
              activeSpeed === 0.75 ? "speed-btn active-speed" : "speed-btn"
            }
            name="0.75"
            onClick={() => setAudioSpeed(0.75)}
          >
            0.75x
          </button>
          <button
            className={
              activeSpeed === 0.5 ? "speed-btn active-speed" : "speed-btn"
            }
            name="0.5"
            onClick={() => setAudioSpeed(0.5)}
          >
            0.5x
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

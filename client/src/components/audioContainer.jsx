import React from "react";
import Wrapper from "../styles/audio";
import AudioPlayer from "./audioPlayer";
import Waves from "./waves";

export default function audioContainer() {
  return (
    <Wrapper>
      <div className="container-audio">
        <audio controls loop >
          <source
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.ogg"
            type="audio/ogg"
          ></source>
          Your browser dose not Support the audio Tag
        </audio>
        {/* <AudioPlayer
          audioSource={
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/new_year_dubstep_minimix.ogg"
          }
        /> */}
      </div>
      <Waves />
    </Wrapper>
  );
}

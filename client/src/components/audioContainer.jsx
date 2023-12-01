import React from "react";
import Wrapper from "../styles/audio";
import AudioPlayer from "./audioPlayer";
import Waves from "./waves";
import { useAppContext } from "../context/appContext";
export default function audioContainer() {
  const { audioUrl, isLoading } = useAppContext();
  return (
    <Wrapper>
      <div className="container-audio">
        <audio controls key={ Math.floor(Math.random()* 200)}>
          <source src={audioUrl} type="audio/ogg"></source>
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

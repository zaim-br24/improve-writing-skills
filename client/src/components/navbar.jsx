import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, WavyParagraph, Main, Profile } from "../styles/navbar";
import styled from "styled-components";
import { ButtonRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";
import profilePic from "../assets/profile.jpg";
export default function navbar() {
  const { user } = useAppContext();
  return (
    <Wrapper>
      {/* <WavyParagraph>
         Vocabulary Builder coming soon!!
      </WavyParagraph> */}
      <Main>
        <Logo />

        <div>
          {!user ? (
            <Link to="/register">
              <ButtonRow text="Sign up" />
            </Link>
          ) : (
            <Profile className="profile-container">
              {/* <img src={profilePic}  /> */}
            </Profile>
          )}
        </div>
      </Main>
    </Wrapper>
  );
}

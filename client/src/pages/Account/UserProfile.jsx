import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";

const UserProfile = () => {
  const { user } = useAppContext();

  return (
    <UserProfileContainer>
      <UserProfilePicture
        src="https://via.placeholder.com/100"
        alt="Profile picture"
      />
      <Username>{`${user ? `${user.firstname} ${user.lastname}` : ""} `}</Username>
      {/* <UserBio>
        A self-proclaimed coder from Earth. Here to share and learn new things!
      </UserBio> */}
    </UserProfileContainer>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--grey-50);
  padding: 20px;
  border-radius: var(--borderRadius-small);
  @media (max-width: 680px) {
    h1 {
      font-size: 1rem;
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const UserProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: var(--borderRadius-small);
  object-fit: cover;
`;

const Username = styled.h1`
  margin: 10px 0;
  font-size: 1.5rem;
`;

const UserBio = styled.p`
  font-size: 16px;
  margin: 10px 0;
  text-align: center;
`;

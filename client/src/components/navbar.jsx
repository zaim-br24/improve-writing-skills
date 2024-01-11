import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Wrapper, WavyParagraph, Main, Profile } from "../styles/navbar";
import styled from "styled-components";
import { ButtonRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";
import profilePic from "../assets/profile.jpg";
import { CgLogOut } from "react-icons/cg";
import { IoMdSettings, IoIosAddCircleOutline } from "react-icons/io";
export default function navbar() {
  const { user, logoutUser } = useAppContext();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    if (!user) {
      setIsOpen(false);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [user]);
  return (
    <Wrapper>
      {/* <WavyParagraph>
         Vocabulary Builder coming soon!!
      </WavyParagraph> */}
      <Main>
        <Link to="/">
          <Logo />
        </Link>

        <div>
          {!user ? (
            <Link to="/register">
              <ButtonRow text="Sign in" />
            </Link>
          ) : (
            <Profile
              className="profile-container"
              onClick={(event) => {
                event.stopPropagation();
                toggleDropdown();
              }}
              // onMouseOver={() => setIsOpen(true)}
            >
              {/* <img src={profilePic} /> */}
              {user && user.lastname && (
                <p className="short-name">
                  {`${user.firstname[0]} ${user.lastname[0]} `}
                </p>
              )}
            </Profile>
          )}
          <DropdownContainer ref={dropdownRef}>
            <DropdownContent open={isOpen}>
              <DropdownItem href="#" className="profile">
                {/* <img className="img" src={profilePic} /> */}

                {user && (
                  <Link className="link" to="/settings">
                    <p className="short-name">
                      {`${user.firstname} ${user.lastname} `}
                    </p>
                  </Link>
                )}
              </DropdownItem>
              <DropdownItem href="/settings">
                <IoMdSettings className="icon" /> Settings
              </DropdownItem>
              <DropdownItem className="logout" onClick={() => logoutUser()}>
                <CgLogOut className="icon" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownContainer>
        </div>
      </Main>
    </Wrapper>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  transition: var(--transition);
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 0;
  padding: 0.5rem;
  background-color: var(--white);
  max-width: 200px;
  border: 1px solid var(--grey-50);
  z-index: 1;
  border-radius: var(--borderRadius-small);
  box-shadow: var(--shadow-2);

  .logout {
    border-top: 1px solid var(--grey-50);
    margin-top: 1rem;
  }
  .img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--borderRadius-small);
  }
  .profile {
    display: flex;
    flex-direction: column;
    color: var(--primary-800);
    font-weight: 600;
  }
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
  color: var(--text-grey-dark);
  border-radius: var(--borderRadius-small);
  font-weight: 500;
  cursor: pointer;
  .icon {
    font-size: 1rem;
  }
  &:hover {
    color: var(--primary-800);
  }
`;

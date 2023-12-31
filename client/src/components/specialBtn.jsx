import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function specialBtn({
  text,
  handleClick,
  className,
  icon,
  link,
}) {
  return (
    <Link to={link}>
      <PlayBtn onClick={handleClick}>
        <span className={className}>
          <>
            {text}
            {icon}
          </>
        </span>
      </PlayBtn>
    </Link>
  );
}

const PlayBtn = styled.button`
  font-size: 1rem;
  color: rgb(218, 218, 218);
  border: none;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: var(--borderRadius-small);
  min-width: 130px;
  transition: transform 0.2s ease-in-out;

  span {
    width: 100%;
    border-radius: var(--borderRadius-small);
    padding: 0.6rem 1rem;
    padding-right: 1.2em;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    background-color: var(--primary-900);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &:hover span {
    opacity: 0.8;
    box-shadow: var(--shadow-2);
  }

  &:focus span {
    transform: scale(0.9);
  }

  @media (max-width: 600px) {
    width: 100%;
    border-top: 1px solid var(--grey-50);
    border-left: 1px solid var(--grey-50);
  }
`;

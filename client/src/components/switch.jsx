import React, { useState } from "react";
import styled from "styled-components";
const Switch = ({ handleSwitch, isChecked }) => {
  return (
    <Switcher
      type="checkbox"
      checked={isChecked}
      onChange={handleSwitch}
    ></Switcher>
  );
};

export default Switch;

const Switcher = styled.input`
  position: relative;
  height: 1rem; 
  width: 2rem; 
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 9999px;
  background-color: rgba(100, 116, 139, 0.377);
  transition: all 0.3s ease;

  &:checked {
    background-color: var(--yellow-dark);
  }

  &::before {
    position: absolute;
    content: "";
    display: block;
    height: 1rem; 
    width: 1rem; 
    cursor: pointer;
    border: 1px solid rgba(100, 116, 139, 0.527);
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 3px 10px rgba(100, 116, 139, 0.327);
    transition: all 0.3s ease;
  }

  &:hover::before {
    box-shadow: 0 0 0px 4px rgba(0, 0, 0, 0.15); 
  }

  &:checked:hover::before {
    box-shadow: 0 0 0px 4px var(--yellow-light); 
  }

  &:checked:before {
    transform: translateX(100%);
    border-color: var(--yellow-dark);
  }
`;

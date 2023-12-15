import React from 'react'
import styled from 'styled-components';
export default function checkbox({ text, handleChecked, isChecked }) {
    
  return (
    <Checkbox className="checkbox-label">
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={handleChecked}
      ></input>
      {text}
    </Checkbox>
  );
}

const Checkbox = styled.label`
  font-size: .7rem;
  color: var(--primary-700);
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: end;
  font-weight: 500;
  padding: 0 10px;

  .checkbox {
    appearance: none;
    width: 15px;
    height: 15px;
    border: 2px solid var(--primary-900);
    border-radius: 5px;
    background-color: transparent;
    display: inline-block;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
    &:before {
      content: "";
      background-color: var(--primary-900);
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%y) scale(0);
      width: 6px;
      height: 6px;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
    }

    &:checked:before {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
`;


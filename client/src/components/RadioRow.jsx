import React, { useState, useEffect } from "react";
import styled from "styled-components";
export default function RadioRow({active , handleRadioClick }) {
  return (
    <Wrapper className="radio-inputs">
      <label className="radio">
        <input
          type="radio"
          name="custom"
          onChange={(e) => handleRadioClick(e)}
          checked={active === "custom" ? true : false}
        ></input>
        <span className="name">Custom text</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="vocabulary"
          onChange={(e) => handleRadioClick(e)}
          checked={active === "vocabulary" ? true : false}
        ></input>
        <span className="name">Vocabulary</span>
      </label>

      <label className="radio">
        <input
          type="radio"
          name="mistakes"
          onChange={(e) => handleRadioClick(e)}
          checked={active === "mistakes" ? true : false}
        ></input>
        <span className="name">Mistakes</span>
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: var(--borderRadius-small);
  background-color: #eee;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.2rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio input {
    display: none;
  }

  .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.4rem 0;
    color: var(--grey-light);
    transition: all 0.15s ease-in-out;
    font-weight: 500;
  }

  .radio input:checked + .name {
    background-color: var(--white);
    font-weight: 600;
  }
`;

import React from "react";
import styled from "styled-components";
export default function InputRow({
  type,
  handleChange,
  text,
  value,
  name,
  placeholder,
  icon,
  className,
}) {
  return (
    <Label className="label">
      <input
        required=""
        placeholder={placeholder}
        type={type}
        className={`input ${className}`}
        onChange={handleChange}
        value={value}
        name={name}
      ></input>
      <span>{text}</span>

      <span className="input-icon">{icon}</span>
    </Label>
  );
}

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input {
    width: 100%;
    padding: 0.7rem;
    outline: 0;
    border: 1px solid var(--grey-500);
    border-radius: var(--borderRadius-medium);
    font-weight: 600;
  }

  .input + span {
    position: absolute;
    left: 10px;
    top: 10px;
    color: var(--grey-500);
    font-size: 0.8em;
    cursor: text;
    transition: 0.3s ease;
    pointer-events: none;
    /* font-weight: 400; */
  }

  .input:focus + span,
  .input:not(:placeholder-shown) + span {
    top: 20px;
    font-size: 0.7em;
  }
  @media (max-width: 990px) {
    .input {
      padding: 0.5rem;
      font-weight: 600;
    }
    .input + span {
      font-size: 0.8em;
    }
    .input:focus + span,
    .input:not(:placeholder-shown) + span {
      top: 35px;
      font-size: 0.6em;
    }
  }
`;

import React from "react";
import styled from "styled-components";

export default function TextareaRow({
  label,
  placeholder,
  handleTextareaChange,
  value,
  countdown,
  wordLimit
}) {
  return (
    <Wrapper>
      {label && (
        <Label>
          {label}
          <span
            className={
              countdown === wordLimit ? "danger" : "countdown"
            }
          >
            {countdown}/{wordLimit}
          </span>
        </Label>
      )}
      <Textarea
        rows="3"
        cols="50"
        placeholder={placeholder}
        onChange={handleTextareaChange}
        value={value}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; 
  margin: 1rem 0;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-800);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .countdown {
    color: var(--grey-200);
  }
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100%;
  border: 1px solid var(--grey-200);
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: var(--bodyFont);
  padding: 10px;
  color: var(--grey-800);
  border-radius: var(--borderRadius-small);
`;

// Add more styling properties as needed

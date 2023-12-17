import React, { useState } from "react";
import styled from "styled-components";
import { SpecialBtn, TextareaRow } from "../../components";
import { MdOutlineAdd } from "react-icons/md";

export default function Practice() {
  const [showForm, setShowForm]  = useState(false);

  const toggleAddText = () => {
    setShowForm(!showForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <div>
        <SpecialBtn
          className="special-btn"
          text="Add Text Practice"
          handleClick={toggleAddText}
          icon={<MdOutlineAdd className="icon" />}
        />
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <TextareaRow
            placeholder="Enter your text and start practing it."
            label="Your Text:"
          />
          <SpecialBtn
            className="right-btn"
            text="save changes"
            handleClick={handleSubmit}
          />
        </Form>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Form = styled.form`
  background-color: var(--grey-50);
  padding: 10px;
  border-radius: var(--borderRadius-small);
`;

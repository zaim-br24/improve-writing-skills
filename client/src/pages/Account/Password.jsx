import React, { useState } from "react";
import styled from "styled-components";
import { InputRow, ButtonRow, Alert, Checkbox } from "../../components";
import { useAppContext } from "../../context/appContext";
export default function Password() {
  const { user, displayAlert, showAlert, updatePassword } = useAppContext();
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
      const [isChecked, setIsChecked] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.oldPassword || !state.newPassword || !state.confirmPassword) {
      displayAlert();
      return;
    } else {
      updatePassword(state);
    }
    setState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    };
    const handleChecked = () => {
      setIsChecked(!isChecked);
      if (!isChecked) {
        console.log("Checkbox is checked");
      } else {
        console.log("Checkbox is unchecked");
      }
    };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        <InputRow
          className="input"
          type={isChecked ? "text" : "password"}
          name="oldPassword"
          value={state.oldPassword}
          handleChange={handleChange}
          placeholder="Old Passsword"
        />
        <Checkbox
          text={isChecked ? "Hide" : "show"}
          handleChecked={handleChecked}
          isChecked={isChecked}
        />
        <div className="flex">
          <InputRow
            className="input"
            type="text"
            name="newPassword"
            value={state.newPassword}
            handleChange={handleChange}
            placeholder="New Password"
          />
          <InputRow
            className="input"
            type="text"
            name="confirmPassword"
            value={state.confirmPassword}
            handleChange={handleChange}
            placeholder="Confirm New Passsword"
          />
        </div>
        <ButtonRow text="Change password" type="submit" />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Form = styled.form`
  width: 100%;
  display: grid;
  gap: 20px;
  transition: outline 2s ease-in;
  position: relative;

  .input {
    width: 100%;
    border-radius: var(--borderRadius-small);
    padding: .9rem 1rem;
    font-size: 1rem;
    &:hover {
      outline: 3.5px solid var(--yellow-light-alpha);
    }
  }
  @media (max-width: 680px) {
    .input {
      font-size: 0.8rem;
      padding: 0.9rem 0.7rem;
    }
  }
`;

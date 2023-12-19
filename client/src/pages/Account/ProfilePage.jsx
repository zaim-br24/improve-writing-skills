import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { ButtonRow, InputRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import { Title } from "../../styles/settings";

const ProfilePage = () => {
  const { user, updateUser, displayAlert, showAlert } = useAppContext();
  const [state, setState] = useState({
    firstname: user ? user.firstname : "",
    lastname: user ? user.lastname : "",
    email: user ? user.email : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.firstname || !state.lastname || !state.email) {
      displayAlert();
      return;
    } else {
      updateUser(state);
    }
  };

  return (
    <Wrapper>
      <Title>Edit profile</Title>
      <Form onSubmit={handleSubmit}>
        {showAlert && <Alert />}

        <div className="flex">
          <InputRow
            className="input"
            type="text"
            name="firstname"
            value={state.firstname}
            handleChange={handleChange}
            placeholder="Firstname"
          />
          <InputRow
            className="input"
            type="text"
            name="lastname"
            value={state.lastname}
            handleChange={handleChange}
            placeholder="Lastname"
          />
        </div>

        <InputRow
          className="input"
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
          placeholder="Email"
        />
        <ButtonRow text="Save Profile" type="submit" />
      </Form>
    </Wrapper>
  );
};

export default ProfilePage;
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
    padding: .8rem 1rem;
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

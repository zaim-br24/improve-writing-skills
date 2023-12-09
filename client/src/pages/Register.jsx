import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../styles/register";
import { InputRow, ButtonRow, Alert, Logo } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  // confirmPassword: "",
  isMember: false,
};

export default function registerPage() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, showAlert, displayAlert, setupUser, isLoading } =
    useAppContext();

  const toggelMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, password, email, isMember } = values;
    if (!email || !password || (!isMember && (!firstname || !lastname))) {
      displayAlert();
      return;
    }
    const currentUser = { firstname, lastname, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login successful! redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User created, redirecting...",
      });
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // ckeck if user exist
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
       <div className="logo"> <Logo  /></div> 

        <p className="title">{values.isMember ? "Sign in" : "Sign up"} </p>
        {showAlert && <Alert />}
        <p className="message">
          {values.isMember
            ? "Sign in to your account."
            : "Sign up now and get full access to our tools."}
        </p>
        <div className="flex">
          {!values.isMember && (
            <>
              <InputRow
                placeholder=""
                required="true"
                type="text"
                handleChange={handleChange}
                text="Firstname"
                value={values.firstname}
                name="firstname"
              />

              <InputRow
                placeholder=""
                required="true"
                type="text"
                handleChange={handleChange}
                text="Lastname"
                value={values.lastname}
                name="lastname"
              />
            </>
          )}
        </div>

        <InputRow
          placeholder=""
          required="true"
          type="Email"
          handleChange={handleChange}
          text="Email"
          value={values.email}
          name="email"
        />

        <InputRow
          placeholder=""
          required="true"
          type="password"
          handleChange={handleChange}
          text="Password"
          value={values.password}
          name="password"
        />
        {/* {!values.isMember && (
          <InputRow
            placeholder=""
            required="true"
            type="password"
            handleChange={handleChange}
            text="Confirm Password"
            value={values.confirmPassword}
            name="confirmPassword"
          />
        )} */}
        <button className="btn" type="submit">
          Submit
        </button>
        <p className="signin" onClick={toggelMember}>
          Already have an acount ?
          <a href="#">{values.isMember ? "Sign up" : "Sign in"}</a>{" "}
        </p>
      </form>
    </Wrapper>
  );
}

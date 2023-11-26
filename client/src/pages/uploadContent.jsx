import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../styles/register";
import { UserTextContainer, Alert } from "../components";
import { useAppContext } from "../context/appContext";

export default function UploadContent() {
  const [category, setCategory] = useState("beginner");
  const [content, setContent] = useState("");

  const { showAlert, displayAlert, isLoading, uploadContent } = useAppContext();

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!category || !content) {
      displayAlert();
      return;
    }
    ;
    console.log({ category, content });
    const currentPost = { category, content };
    uploadContent(currentPost);
  };
  const handleTextareaChnage = (e) => {
    setContent(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <Wrapper>
      {showAlert && <Alert/>}
      <form className="form" onSubmit={handleSubmit}>
        <select onChange={handleCategoryChange}>
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
        <UserTextContainer
          handleTextareaChnage={handleTextareaChnage}
          value={content}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
}

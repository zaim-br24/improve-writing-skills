import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SpecialBtn,
  TextareaRow,
  Loader,
  Alert,
  RadioRow,
} from "../../components";
import { _Vocabulary, _Mistakes } from "./index";
import {
  MdEdit,
  MdOutlineAdd,
  MdDelete,
  MdModeEdit,
  MdClose,
} from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import { IoOpen } from "react-icons/io5";
import { Title } from "../../styles/settings";
import { Wrapper, Form, Main, Card } from "../../styles/practice";
export default function Practice() {
  const {
    isLoading,
    showAlert,
    customTexts,
    getCustomTexts,
    addCustomText,
    myCustomTexts,
    deleteCustomText,
    updateCustomText,
    toggleContent,
    practiceMyText,
    showCustomTexts,
  } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [userCustomText, setUserCustomText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [targetedId, setTargetedId] = useState(null);
  const [activeRadio, setActiveRadio] = useState("custom");

  useEffect(() => {
    getCustomTexts();
  }, [showCustomTexts]);
  const toggleAddText = () => {
    setShowForm(!showForm);
    setUserCustomText("");
    setIsEdit(false);
    setTargetedId(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      addCustomText(userCustomText);
    } else {
      setIsEdit(false);
      updateCustomText({ userCustomText, targetedId });
    }
    setShowForm(false);
  };
  const handleTextareaChange = (e) => {
    setUserCustomText(e.target.value);
  };
  const handleDeleteText = (id) => {
    deleteCustomText(id);
    setConfirmAction(!confirmAction);
  };
  const handleEditText = (text, id) => {
    setShowForm(true);
    setUserCustomText(text);
    setIsEdit(true);
    setTargetedId(id);
  };
  const handlOpenToPractice = (id) => {
    // toggleContent(true);
    practiceMyText(id);
  };
  const handleRadioClick = (e) => {
    setActiveRadio(e.target.name);
  };

  return (
    <Wrapper>
      <Title>My custom texts</Title>
      {showAlert && <Alert />}
      <RadioRow active={activeRadio} handleRadioClick={handleRadioClick} />
      {activeRadio === "custom" && (
        <div className="flex">
          <SpecialBtn
            className="special-btn"
            text={showForm ? "Close" : "Add Text"}
            handleClick={toggleAddText}
            icon={
              showForm ? (
                <MdClose className="icon-btn" />
              ) : (
                <MdOutlineAdd className="icon-btn" />
              )
            }
          />
          {!!customTexts?.length && (
            <SpecialBtn
              link="/"
              text="Practice Now"
              handleClick={handlOpenToPractice}
              icon={<IoOpen className="icon-btn open" />}
            />
          ) }
        </div>
      )}

      {confirmAction && (
        <div className="confirm">
          <div className="confirm-container">
            <p
              className="confirm-btn confirm-delete"
              onClick={() => handleDeleteText(targetedId)}
            >
              Delete
            </p>
            <p
              className="confirm-btn confirm-cancel"
              onClick={() => setConfirmAction(!confirmAction)}
            >
              Cancel
            </p>
          </div>
        </div>
      )}
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <TextareaRow
            placeholder="Enter your text and start practing it."
            label="Your Text:"
            handleTextareaChange={handleTextareaChange}
            value={userCustomText}
          />
          <SpecialBtn
            className="right-btn"
            text={isEdit ? "Update Text" : "Create Text"}
            handleClick={handleSubmit}
          />
        </Form>
      )}
      {isLoading && <Loader />}
      <Main>
        {customTexts?.length <= 0 && (
          <div className="no-value">
            <h1 className="title">No Custom Text were Found</h1>
            <p className="sub-title">Add your texts and start practicing</p>
          </div>
        )}
        {activeRadio === "custom" &&
          customTexts &&
          customTexts.map((item, index) => {
            return (
              <Card key={index} id={item._id}>
                <p>{item.content}</p>
                <p></p>

                <div className="action-bar">
                  <Link to="/">
                    <IoOpen
                      className="icon-btn open"
                      onClick={() => handlOpenToPractice(item._id)}
                    />
                  </Link>

                  <div className="icons">
                    <MdDelete
                      className="icon-btn delete"
                      onClick={() => {
                        setConfirmAction(true);
                        setTargetedId(item._id);
                      }}
                    />
                    <MdModeEdit
                      className="icon-btn edit"
                      onClick={() => handleEditText(item.content, item._id)}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        {/* Vocabulary */}
        {activeRadio === "vocabulary" && <_Vocabulary />}
        {/* Mistakes */}
        {activeRadio === "mistakes" && <_Mistakes />}
      </Main>
    </Wrapper>
  );
}

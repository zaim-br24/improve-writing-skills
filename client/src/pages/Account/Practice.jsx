import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SpecialBtn, TextareaRow, Loader, Alert } from "../../components";
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
  // const handleSwitch = (e) => {
  //   const isChecked = e.target.checked;
  //   toggleContent(isChecked);
  // };

  return (
    <Wrapper>
      <Title>My custom texts</Title>
      {showAlert && <Alert />}

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
        {customTexts?.length > 0 ? (
          <SpecialBtn
            link="/"
            text="Practice Now"
            handleClick={handlOpenToPractice}
            icon={
              <IoOpen
                className="icon-btn open"
              />
            }
          />
        ) : null}
      </div>
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
      {customTexts?.length <= 0 ? (
        <div>
          <h2 className="title">Add your texts and start practicing</h2>
        </div>
      ) : (
        <Main>
          {customTexts &&
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
        </Main>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  .confirm {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(225, 225, 225, 0.5);
    z-index: 99;
    .confirm-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      border-radius: var(--borderRadius-small);
      background-color: var(--white);
      /* padding: 2rem; */
      width: 70%;
      height: 50%;

      .confirm-btn {
        border-radius: var(--borderRadius-small);
        padding: 4px 10px;
        box-shadow: var(--shadow-3);
        cursor: pointer;
        color: var(--white);
        font-size: 1rem;
        font-weight: 600;
      }
      .confirm-delete {
        background-color: var(--red-dark);
      }
      .confirm-cancel {
        background-color: var(--green-light);
        color: var(--green-dark);
      }
    }
  }
`;
const Form = styled.form`
  background-color: var(--grey-50);
  padding: 10px;
  margin: 10px 0;
  border-radius: var(--borderRadius-small);
  width: 100%;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* display: grid;    // for cards layout
  grid-template-columns: repeat(auto-fit, minmax( 200px, 1fr)); */
  gap: 10px;
  margin-top: 1rem;
`;
const Card = styled.div`
  background-color: var(--grey-50);
  padding: 1rem 10px;
  position: relative;

  border-radius: var(--borderRadius-small);
  min-width: 200px;

  &:hover {
    .action-bar {
      display: flex;
    }
  }
  p {
    font-size: 0.9rem;
  }

  .action-bar {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: space-between;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: var(--borderRadius-small);
    background-color: rgba(225, 225, 225, 0.5);
    padding: 10px;
    .practice {
      padding: 5px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .icon-btn {
      font-size: 2rem;
      padding: 7px;
      cursor: pointer;
      background-color: var(--white);
      border-radius: var(--borderRadius-small);
    }
    .icons {
      display: flex;
      gap: 10px;

      .delete {
        color: var(--red-dark);
      }
      .edit {
        color: var(--green-dark);
      }
    }
    .open {
      color: var(--primary-700);
    }
  }
  &:hover {
    outline: 2px solid var(--yellow-light);
  }
`;

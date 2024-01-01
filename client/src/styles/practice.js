import styled from "styled-components";
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

export { Wrapper, Form, Main, Card };

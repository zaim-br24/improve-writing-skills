import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gery-50);
  textarea {
    resize: none;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    font-family: var(--bodyFont);
    padding: 10px;
    color: var(--grey-800);
  }
  .bottom-bar {
    position: relative;
    /* height: 15%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.7rem;
  }
  .delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--primary-700);
  }
  /* button {
    position: absolute;
    bottom: 10px;
    right: 10px;
  } */
`;
const MistakesContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: rgba(225, 225, 225, 0.5);
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;

  .close-mistakes-btn {
    padding: 10px;
    .close-icon {
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  .mistakes {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 90%;
    background-color: white;
    overflow-y: scroll;
    padding: 0.2rem;
    scrollbar-width: thin; 
    scrollbar-color: darkgray lightgray; 

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }
    &::-webkit-scrollbar-track {
      background-color: lightgray;
      border-radius: 4px;
    }

    .mistakes-action {
      width: 100%;
      padding: 10px;
      button {
        color: var(--white);
        font-weight: 500;
        background-color: var(--green-dark);
      }
    }
    .mistakes-text {
      display: flex;
      flex-direction: column;
      .mistake-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50%, 50%));
        overflow-y: auto;
      }
      .error,
      .correct {
        font-size: 1rem;
        font-weight: 500;
        margin: 5px;
        cursor: pointer;
        padding: 5px 0.5rem;
        border-radius: 10px;
      }
      .error {
        background-color: var(--red-light);
        color: var(--red-dark);
      }
      .correct {
        background-color: var(--green-light);
        color: var(--green-dark);
      }
    }
  }
  @media (max-width: 680px) {
    .mistakes {
      .mistakes-text {
        .error,
        .correct {
          font-size: 0.7rem;
        }
      }
    }
  }
`;
export { Wrapper, MistakesContainer };

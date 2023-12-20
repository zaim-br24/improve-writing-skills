import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid var(--grey-50);
  position: relative;
  display: flex;
  flex-direction: column;

  .original-text-container {
    height: 85%;
    border-bottom: 1px solid var(--grey-50);
  }
  .original-text {
    font-size: 1rem;
    font-weight: 500;
    color: var(--grey-500);
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .hidden-overlay-container {
    height: 85%;
    position: relative;
    transform: var(--transition);
    .hidden-overlay {
      display: flex;
      flex-direction: column;
      background-color: rgba(225, 225, 225, 0.5);

      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.9;

      p {
        font-size: 2rem;
        font-weight: 500;
        color: var(--text-grey);
      }
    }
  }
  .show-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    background-color: var(--grey-50);
    font-weight: 500;
    border-radius: var(--borderRadius-small);
    &:hover {
      background-color: var(--grey-200);
    }
  }
  .bottom-bar {
    padding: 10px;
    position: relative;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .generate-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius-small);
    background-color: var(--primary-900);
    color: var(--text-grey);
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
    .generate-icon {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 680px) {
    p {
      font-size: 1.7rem;
    }
    .original-text {
      font-size: 0.9rem;
      color: var(--primary-700);
    }
    .show-text {
      padding: 0.29rem 0.7rem;
      font-size: 0.899rem;
    }
    .bottom-bar {
      height: 50px;
      /* button {
        font-size: 0.899rem;
      } */
    }
  }
`;

export default Wrapper;

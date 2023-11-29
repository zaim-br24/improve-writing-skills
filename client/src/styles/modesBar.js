import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5em;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--grey-200);
  border-bottom: 1px solid var(--grey-200);
  background-color: var(--white);
  .title {
    font-weight: 600;
  }
  .modes-container {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .mode {
      font-weight: 500;
      margin-right: 5px;
      color: var(--grey-700);
      text-transform: capitalize;
      padding: 10px;
      border-radius: var(--borderRadius-small);
      transition: var(--transition);
      &:hover {
        color: #008170;
        cursor: pointer;
        background-color: var(--green-light);
      }
    }
    .active {
      color: #008170;
      background-color: var(--green-light);
    }
  }
  @media (max-width: 680px) {
    .mode {
      padding: 5px ;
      font-size: 0.8rem;
    }
  }
`;

export default Wrapper;

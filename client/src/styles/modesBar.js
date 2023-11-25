import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.5em;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--grey-50);
  border-bottom: 1px solid var(--grey-50);
  background-color: var(--white);
  .title {
    font-weight: 600;
  }
  .modes-container {
    display: flex;
    align-items: center;
    margin-left: 1rem;

    .mode {
      font-weight: 500;
      margin-right: 10px;
      color: var(--grey-700);
      text-transform: capitalize;
      padding: 10px;
      border-radius: var(--borderRadius);
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
`;

export default Wrapper;

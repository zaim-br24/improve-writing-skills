import styled from "styled-components";

const Wrapper = styled.div`
  /* padding: 0.5rem 0.7rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  .language-btn {
    padding: 10px;
    border-top-right-radius: var(--borderRadius);
    border-top-left-radius: var(--borderRadius);

    background-color: #eee;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default Wrapper;

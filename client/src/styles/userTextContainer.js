import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  position: relative;
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
  button {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

export default Wrapper;

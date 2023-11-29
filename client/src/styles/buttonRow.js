import styled from "styled-components";

const Wrapper = styled.div`
  button {
    border-radius: 20px;
    appearance: none;
    position: relative;
    padding: 0.555rem 1rem;
    border: 0;
    background-color: var(--primary-800);
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    /* z-index: 2; */
    cursor: pointer;
    &:active,
    &:hover {
      background-color: #213131;
      box-shadow: var(--shadow-4);
    }
    @media (max-width: 680px) {
      font-size: 0.899rem;
    }
  }
`;

export default Wrapper;

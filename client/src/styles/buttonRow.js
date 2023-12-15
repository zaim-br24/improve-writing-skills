import styled from "styled-components";

const Wrapper = styled.div`
  button {
    border-radius: var(--borderRadius-small);
    position: relative;
    padding: 0.555rem 1rem;
    border: 0;
    background-color: ${(props) =>
      props.backgroundColor ? "var(--grey-50)" : "var(--primary-900)"};
    font-size: 18px;
    font-weight: 600;
    color: ${(props) =>
      props.backgroundColor ? "var(--primary-900)" : " var(--text-grey)"};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
    @media (max-width: 680px) {
      font-size: 0.899rem;
    }
  }
`;

export default Wrapper;

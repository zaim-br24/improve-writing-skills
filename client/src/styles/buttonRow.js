import styled from "styled-components";

const Wrapper = styled.div`
  button {
    border-radius: var(--borderRadius-small);
    position: relative;
    padding: 0.555rem 1rem;
    border: 0;
    background-color: var(--primary-900);
    font-size: 18px;
    font-weight: 500;
    color: var(--text-grey);
    cursor: pointer;
    
    &:hover{
      opacity: .8;
    }
    @media (max-width: 680px) {
      font-size: 0.899rem;
    }
  }
`;

export default Wrapper;

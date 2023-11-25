import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;
const Editor = styled.div`
  @media (min-width: 680px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    height: 500px;
    background-color: var(--white);
    position: relative;
  }
`;
const Left = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Right = styled.aside`
  height: 100%;
`;

export { Wrapper, Editor, Left, Right };

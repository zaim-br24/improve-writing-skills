import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;
const Editor = styled.div`
  @media (min-width: 680px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    height: 400px;
    background-color: var(--white);
    position: relative;
  }
`;
const Left = styled.aside`
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 680px) {
    display: flex;
    flex-direction: column-reverse;
    height: 320px;
  }
`;
const Right = styled.aside`
background-color: var(--white);
`;

export { Wrapper, Editor, Left, Right };

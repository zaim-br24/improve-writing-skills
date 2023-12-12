import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

`;
const Editor = styled.div`
  @media (min-width: 680px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    height: 60vh;
    background-color: var(--white);
    position: relative;
    box-shadow: var(--shadow-2);
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
const Benefits = styled.div`
  margin: 4rem 0;
  width: 100%;
`;
const Title = styled.div`
  margin: 2rem auto;
  text-align: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-grey-dark);
`;
const Cards = styled.div`
  width: 100%;
  margin: 4rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  @media (max-width: 680px) {
  gap: 10px;
  }
`;
const Card = styled.div`
  background-color: whitesmoke;
  padding: 10px;
  border-radius: var(--borderRadius-small);
  .name {
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--primary-900);
  }
  .content {
    color: var(--text-grey-dark);
  }
  @media (max-width: 680px) {
    .name {
      font-weight: 600;
      font-size: 1rem;
    }
    .content {
      color: var(--text-grey-dark);
      font-size: 0.8rem;
    }
  }
`;

export { Wrapper, Editor, Left, Right, Benefits, Title, Card, Cards };

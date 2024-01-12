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
    height: 35vh;
  }
`;
const Right = styled.aside`
  background-color: var(--white);
  height: 100%;
  @media (max-width: 680px) {
    display: flex;
    flex-direction: column-reverse;
    height: 25vh;
  }
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
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 20px;
  background-color: var(--primary-200);
  padding: 10px;
  border-radius: var(--borderRadius-small);

  .card-container {
    grid-column: span 1;
  }
  @media (max-width: 680px) {
    gap: 10px;
    .img {
      width: 100px;
    }
    .full-width {
      grid-column: span 2;
    }
  }
  .img {
    max-width: 120px;
    margin: 0 auto;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: var(--borderRadius-small);
  border: 3px solid var(--yellow-dark);
  text-align: center;

  .name {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--primary-900);
  }
  .content {
    color: var(--text-grey-dark);
    font-size: 0.8rem;
  }
  @media (max-width: 900px) {
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

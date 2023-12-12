import styled, { keyframes } from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  max-width: 100vw;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--white);
  position: sticky;
  top: 0;
  z-index: 999;
  @media (min-width: 992px) {
    /* position: sticky;
    top: 0; */
  }
  .logo {
    display: flex;
    align-items: center;
    width: 8rem;
  }
`;

const waveAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }

`;

const WavyParagraph = styled.p`
  animation: ${waveAnimation} 3s ease-in-out infinite;
  color: var(--yellow-dark);
`;
const Main = styled.main`
  width: 95vw;
  margin: 0rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 992px) {
    margin: 0rem auto;
    width: 85vw;
  }
`;

const Profile = styled.div`
  height: 40px;
  width: 40px;
  background-color: whitesmoke;
  border-radius: var(--borderRadius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    border-radius: var(--borderRadius-small);
  }
  .short-name{
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--primary-900);
  }

`;
export { Wrapper, WavyParagraph, Main, Profile };

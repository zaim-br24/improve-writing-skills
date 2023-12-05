import styled, { keyframes } from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--white);
  position: sticky;
  top: 0;
  z-index: 999;
  @media (min-width: 992px) {
    /* position: sticky;
    top: 0; */
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
export  { Wrapper, WavyParagraph };

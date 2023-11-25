import styled from "styled-components";

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
  @media (min-width: 992px) {
    /* position: sticky;
    top: 0; */
  }
`;
export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
  }
  .dashboard-page {
    margin: 2rem auto;
    width: 95vw;
    background-color: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns:  1fr;
    }
    .dashboard-page {
      margin: 0rem auto;
      width: 85vw;
      margin-top: 2rem;
    }
  }
`;
export default Wrapper;

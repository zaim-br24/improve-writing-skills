import styled from "styled-components";

const Wrapper = styled.section`

  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
  }
  .dashboard-page {
    margin: 1rem auto;
    width: 95vw;
    border-radius: var(--borderRadius);
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: 1fr;
    }
    .dashboard-page {
      margin: 1rem auto;
      width: 80vw;
      margin-top: 1rem;
    }
  }
`;
export default Wrapper;

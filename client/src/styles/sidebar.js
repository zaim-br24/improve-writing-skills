import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    background-color: var(--black);
    height: 100vh;
    position: sticky;
    top: 0;
    .sidebar-container {
      color: var(--white);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      transition: var(--transition);
      width: var(--sidebar-width);
      padding: 10px;
      color: black;
    }
    .content {
     
    }
    .show-sidebar {
      margin-left: 0;
    }
  }
`;
export default Wrapper;

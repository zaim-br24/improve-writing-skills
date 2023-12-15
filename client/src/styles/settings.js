import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .full-container {
    width: 100%;
    display: flex;
    gap: 20px;
    padding: 10px;
  }
`;
const Sidebar = styled.div`
  height: 300px;
  width: 250px;
  display: flex;
  flex-direction: column;
  .link {
    padding: 0.3rem;
    border-radius: var(--borderRadius-small);
    a {
      display: block;
      width: 100%;
      color: var(--text-grey-dark);
      text-transform: capitalize;
      transition: var(--transition);
      padding: 5px;
      &:hover:not(.active) {
        cursor: pointer;
        color: var(--primary-800);
      }
    }
  }

  .active {
    a {
      color: var(--primary-900);
      font-weight: 700;
    }
  }
  @media (max-width: 815px) {
    display: none;
  }
`;
const Content = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  margin: 1.2rem 0;
`;

export { Wrapper, Content, Sidebar, Header };

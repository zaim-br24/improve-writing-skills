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
    @media (max-width: 815px) {
      display: flex;
      flex-direction: column;
    }
    .link {
      padding: 0.3rem;
      border-radius: var(--borderRadius-small);
      display: flex;
      align-items: center;
      justify-content: space-between;
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
        @media (max-width: 815px) {
         padding: 10px;
        }
      }
    }
    .active {
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--primary-900);
        font-weight: 700;
        background-color: white;
        border-radius: var(--borderRadius-small);
      }
    }
  }
`;
const Title = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-900);
  @media (max-width: 815px) {
    display: none;
  }
`;
const Sidebar = styled.div`
  height: 300px;
  width: 250px;
  display: flex;
  flex-direction: column;
  
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
  /* margin: 1.2rem 0; */
`;

const Secondary = styled.div`
  display: none;
  @media (max-width: 815px) {
    display: block;
  }
  border-radius: var(--borderRadius-small);
  background-color: var(--grey-50);
`;
export { Wrapper, Content, Sidebar, Header, Title, Secondary };

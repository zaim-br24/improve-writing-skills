import styled from 'styled-components'


const Wrapper = styled.div`
  button {
    border-radius: 20px;
    appearance: none;
    position: relative;
    padding: 0.7rem 1rem;
    border: 0;
    background-color: #212121;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    z-index: 2;
    cursor: pointer;
    &:active,
    &:hover {
      background-color: #213131;
      box-shadow: var(--shadow-4);
    }
  }
`;

export default Wrapper
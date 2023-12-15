import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 10px;
  position: relative;
  gap: 10px;
  border-left: 1px solid var(--grey-50);
  width: 100%;
  .container-audio {
    width: 100%;
    height: 45px;
    margin: 0px auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
`;

const PlayBtn = styled.button`
  font-size: 1rem;
  color: rgb(218, 218, 218);
  border: none;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: var(--borderRadius-small);
  min-width: 130px;

  span {
    width: 100%;
    border-radius: var(--borderRadius-small);
    padding: 0.6rem 1rem;
    padding-right: 1.2em;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    background-color: var(--primary-900);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover span {
    opacity: 0.8;
    box-shadow: var(--shadow-2);
  }
  .icon {
    width: 15px;
    height: 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    border-top: 1px solid var(--grey-50);
    border-left: 1px solid var(--grey-50);
  }
`;
const AddText = styled.div`
  background-color: var(--text-grey);
  padding: 10px;
  /* color: white; */
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: var(--borderRadius-small);
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export { Wrapper, PlayBtn, AddText };

import styled from "styled-components";

const Wrapper = styled.footer`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .social-media {
    display: flex;
    gap: 10px;
    .social-media-icon {
      color: var(--primary-900);
      font-size: 1.6rem;
    }
  }
`;

export default Wrapper;

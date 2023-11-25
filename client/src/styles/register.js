import styled from "styled-components";
const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title {
    font-size: 28px;
    color: var(--primary-800);
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: var(--primary-800);
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: var(--primary-800);
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: var(--grey-800);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: var(--primary-500);
  }

  .signin a:hover {
    text-decoration: underline var(--primary-500);
  }

  .or-separator {
    display: block;
    text-align: center;
    font-weight: bold;
    margin: 0.3rem 0;
    color: var(--grey-200);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.div`
  @media (max-width: 522px) {
    width: 100%;
    border-top: 1px solid var(--grey-50);
    border-left: 1px solid var(--grey-50);
    display: flex;
    flex-direction: column;
  }
  padding: 0.5rem 0.7rem;
  max-height: 130px;
  position: relative;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  gap: 10px;
  border-left: 1px solid var(--grey-50);
  .container-audio {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #eee;
    color: #444;
    margin: 0px auto;
    overflow: hidden;
  }
  .waves {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  audio {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }

  audio:nth-child(2),
  audio:nth-child(4),
  audio:nth-child(6) {
    margin: 0;
  }
  .container-audio .colum1 {
    width: 10px;
    height: 2rem;
    border-radius: 5px;
    margin: 0 5px 0 0;
    display: inline-block;
    position: relative;
  }
  .container-audio .colum1:last-child {
    margin: 0;
  }
  .container-audio .colum1 .row {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(to up, #7700aa, #8800ff);
    position: absolute;
    -webkit-animation: Rofa 20s infinite ease-in-out;
    animation: Rofa 10s infinite ease-in-out;
    bottom: 0;
  }
 
  @-webkit-keyframes Rofa {
    0% {
      height: 30%;
      -webkit-transform: translatey(0);
      transform: translatey(0);
      background-color: yellow;
    }

    5% {
      height: 100%;
      -webkit-transform: translatey(15px);
      transform: translatey(15px);
      background-color: black;
    }
    10% {
      height: 90%;
      transform: translatey(0);
      -webkit-transform: translatey(0);
      background-color: bisque;
    }

    15% {
      height: 80%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    20% {
      height: 70%;
      -webkit-transform: translatey(0);
      transform: translatey(0);
      background-color: black;
    }
    25% {
      height: 20%;
      -webkit-transform: translatey(0);
      transform: translatey(0);
      background-color: black;
    }
    30% {
      height: 70%;
      -webkit-transform: translatey(0);
      transform: translatey(0);
      background-color: black;
    }
    35% {
      height: 20%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    40% {
      height: 60%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    45% {
      height: 20%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    50% {
      height: 50%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    55% {
      height: 10%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    60% {
      height: 40%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    65% {
      height: 10%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    70% {
      height: 30%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    75% {
      height: 20%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    80% {
      height: 20%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    85% {
      height: 10%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    90% {
      height: 10%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    95% {
      height: 25%;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
    100% {
      height: 10;
      -webkit-transform: translatey(0);
      transform: translatey(0);

      background-color: black;
    }
  }

`;

export default Wrapper;

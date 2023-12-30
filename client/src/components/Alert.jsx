import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAppContext } from "../context/appContext"; // Import your context

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  const [visible, setVisible] = useState(true);
  const [percentRemaining, setPercentRemaining] = useState(100);

  const alertClassName = `alert alert-${alertType} ${
    visible ? "show" : "hide"
  }`;
useEffect(() => {
  const intervalDuration = 50; // Set a shorter interval for more frequent updates
  const decrementValue = (intervalDuration / 5000) * 100; // Adjust based on animation duration

  const timer = setInterval(() => {
    setPercentRemaining((prevPercent) =>
      Math.max(prevPercent - decrementValue, 0)
    );
  }, intervalDuration);

  // Clear the interval when the component is unmounted or when percentRemaining reaches 0
  return () => {
    clearInterval(timer);
  };
}, []);

  useEffect(() => {
    if (percentRemaining <= 0) {
      setVisible(false);
    }
  }, [percentRemaining]);

  return (
    <AlertContainer className={`${alertClassName}`}>
      {alertText}
      {/* <ProgressBar
        percentRemaining={percentRemaining}
      /> */}
    </AlertContainer>
  );
};

const FadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 5px;
  animation: ${FadeOut} 3s linear forwards; 
  z-index: 1000;
`;

const ProgressBar = styled.div`
  height: 3px;
  width: 100%;
  background-color: var(--primary-500);
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: left;
  animation: ${FadeOut} 5s linear forwards;
  width: ${(props) => props.percentRemaining}%;
`;

export default Alert;

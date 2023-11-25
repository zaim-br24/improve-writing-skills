import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext"; // Import your context

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(5); //

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsVisible(false);
    }
  }, [timeRemaining]);

  const alertClassName = `alert alert-${alertType} ${
    isVisible ? "show" : "hide"
  }`;

  const progressBarWidth = (timeRemaining / 5) * 100;

  return (
    <div className={`${alertClassName} `}>
      {alertText}
      {/* <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div> */}
      <span className="close-btn">x</span>
    </div>
  );
};

export default Alert;

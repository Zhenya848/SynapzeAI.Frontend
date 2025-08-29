import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CountdownTimerHandle } from "./CountdownTimerHandle";
import { Typography } from "@mui/material";

interface ICountdownTimerInfo {
    seconds: number;
    minutes: number;
    onTimeOut?: any
}

export const CountdownTimer = forwardRef<CountdownTimerHandle, ICountdownTimerInfo>(({ seconds, minutes, onTimeOut } : ICountdownTimerInfo, ref) => {
  const [timeLeft, setTimeLeft] = useState(seconds + minutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = 0;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } 
    else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);

      if (onTimeOut)
        onTimeOut();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useImperativeHandle(ref, () => ({
    reset: resetTimer,
    pause: pauseTimer,
    start: startTimer,
    getExpiredTime: getExpiredTime
  }));

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(seconds + minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getExpiredTime = () => seconds + minutes * 60 - timeLeft;

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h5" color={timeLeft > 20 ? 'white' : 'error'}>Осталось времени:</Typography>
      <Typography variant="h5" color={timeLeft > 20 ? 'white' : 'error'}>{formatTime(timeLeft)}</Typography>
    </div>
  );
});
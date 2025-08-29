import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Typography } from "@mui/material";
import { StopwatchHandle } from "./StopwatchHandle";

export const Stopwatch = forwardRef<StopwatchHandle>((_, ref) => {
  const [expiredTime, setExpiredTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = 0;
    
    if (isActive) {
      interval = setInterval(() => {
        setExpiredTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, expiredTime]);

  useImperativeHandle(ref, () => ({
    reset: resetStopwatch,
    pause: pauseStopwatch,
    start: startStopwatch,
    getExpiredTime: getExpiredTime
  }));

  const startStopwatch = () => {
    setIsActive(true);
  };

  const pauseStopwatch = () => {
    setIsActive(false);
  };

  const resetStopwatch = () => {
    setExpiredTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getExpiredTime = () => expiredTime;

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h5">Время решения:</Typography>
      <Typography variant="h5">{formatTime(expiredTime)}</Typography>
    </div>
  );
});
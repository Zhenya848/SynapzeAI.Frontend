export type CountdownTimerHandle = {
  reset: () => void;
  pause: () => void;
  start: () => void;
  getExpiredTime: () => number;
};
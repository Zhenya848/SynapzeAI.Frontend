export type StopwatchHandle = {
  reset: () => void;
  pause: () => void;
  start: () => void;
  getExpiredTime: () => number;
};
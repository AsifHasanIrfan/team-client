import { useEffect, useState } from 'react';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const useTimer = (deadline : any) => {
  //@ts-ignore
  const [timeSpan, setTimeSpan] = useState(new Date(deadline) - Date.now());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpan((_timeSpan) => _timeSpan - 1000);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /* If the initial deadline value changes */
  useEffect(() => {
    //@ts-ignore
    setTimeSpan(new Date(deadline) - Date.now());
  }, [deadline]);

  const days = Math.floor(timeSpan / DAY)
  const hours = Math.floor((timeSpan / HOUR) % 24)
  const minutes = Math.floor((timeSpan / MINUTE) % 60)
  const seconds = Math.floor((timeSpan / SECOND) % 60)

  useEffect(() => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setIsExpired(true);
    }
  }, [days, hours, minutes, seconds]);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired
  };
};

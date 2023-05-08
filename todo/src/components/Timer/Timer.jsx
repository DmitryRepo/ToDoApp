import React, { useState, useEffect } from 'react';

const Timer = ({ time, onComplete }) => {
  const [timeTask, setTimeTask] = useState(time || 0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [timerId, setTimerId] = useState('');

  const transformTime = (timeTask) => {
    const min = `${Math.trunc(timeTask / 60)}`.padStart(2, '0');
    const sec = `${timeTask - min * 60}`.padStart(2, '0');
    return `${min}:${sec}`;
  };

  const transformedTime = transformTime(timeTask);

  const toggleInterval = () => {
    if (isActiveTimer === true && !timerId) {
      const interval = setInterval(() => {
        setTimeTask((timeTask) => {
          return timeTask > 0 && isActiveTimer === true ? timeTask - 1 : 0;
        });
      }, 1000);

      setTimerId(interval);
    } else if (isActiveTimer === false) {
      clearInterval(timerId);
      setTimerId('');
    }
  };

  const StartTimer = () => {
    if (!onComplete) {
      setIsActiveTimer((isActiveTimer) => {
        return isActiveTimer === false ? !isActiveTimer : true;
      });
    }
  };

  const StopTimer = () => {
    setIsActiveTimer((isActiveTimer) => {
      return isActiveTimer === true ? !isActiveTimer : false;
    });
  };

  useEffect(() => {
    toggleInterval();
  }, [isActiveTimer]);

  return (
    <div className="timer-block">
      <button className="icon icon-play" type="button" onClick={StartTimer}></button>
      <button className="icon icon-pause" type="button" onClick={StopTimer}></button>
      <span className={'timer-indicator'}>{transformedTime}</span>
    </div>
  );
};

export default Timer;

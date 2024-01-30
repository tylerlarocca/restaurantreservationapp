import React, { useState, useEffect } from 'react';
import { formatAsTime, printableTime } from '../../utils/date-time';

const Clock = () => {
  const [time, setTime] = useState(new Date().toTimeString());

  let timeFormat = printableTime(formatAsTime(time));

  const getTime = () => {
    const newTime = new Date().toTimeString();
    setTime(newTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h4>{timeFormat}</h4>
    </div>
  );
};

export default Clock;
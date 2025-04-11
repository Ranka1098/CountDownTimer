import React, { useEffect, useRef, useState } from "react";
import "./timer.css";

const Timer = () => {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isRunning, setIsRunnig] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value.trim(), 10) || 0;

    if (isNaN(value)) {
      return;
    }

    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;
    setTime(copyTime);
  };

  const handleResetTimer = () => {
    setIsRunnig(false);
    setTime({
      hour: "",
      minute: "",
      second: "",
    });
  };
  const handleStartTimer = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      console.log("time zero");
      return;
    }
    setIsRunnig(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const copyPrevTime = { ...prev };
          copyPrevTime.second--; // copyPrevTime.second = copyPrevTime.second - 1
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
          }
          if (copyPrevTime.minute < 0) {
            copyPrevTime.hour--;
            copyPrevTime.minute = 59;
          }
          if (copyPrevTime.hour < 0) {
            clearInterval(intervalRef.current);
            return { hour: "", minute: "", second: "" };
          }

          return copyPrevTime;
        });
      }, 1000);
    }
  }, [isRunning]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="HH"
          onChange={(e) => handleChange(e, "hour")}
          value={time.hour}
        />
        :
        <input
          type="text"
          placeholder="MM"
          onChange={(e) => handleChange(e, "minute")}
          value={time.minute}
        />
        :
        <input
          type="text"
          placeholder="SS"
          onChange={(e) => handleChange(e, "second")}
          value={time.second}
        />
      </div>
      <div>
        <button type="button" onClick={handleStartTimer}>
          {isRunning ? "Paused" : "Start"}
        </button>
        <button type="button" onClick={handleResetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

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
    const value = parseInt(e.target.value.trim(), 10);
    if (isNaN(value)) {
      return;
    }
    console.log("value", value, field);
    const copyTime = { ...time };
    copyTime[field] = value;

    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;
    setTime(copyTime);
  };

  const handleClicked = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      return;
    }
    setIsRunnig(!isRunning);
  };
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        console.log("interval");
        setTime((prev) => {
          const copyTime = { ...prev };
          copyTime.second--;
          if (copyTime.second < 0) {
            copyTime.minute--;
            copyTime.second = 59;
          }
          if (copyTime.minute < 0) {
            copyTime.hour--;
            copyTime.minute = 59;
          }
          if (copyTime.hour < 0) {
            setIsRunnig(!isRunning);
            return { hour: "", minute: "", second: "" };
          }
          return copyTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTime({ hour: "", minute: "", second: "" });
    clearInterval(intervalRef.current);
    setIsRunnig(false);
  };

  // --------------------UI Part--------------------------------------------------------------------
  return (
    <>
      <div>
        <input
          type="text"
          disabled={isRunning}
          placeholder="HH"
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
        />
        :
        <input
          type="text"
          disabled={isRunning}
          placeholder="MM"
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
        />
        :
        <input
          type="text"
          disabled={isRunning}
          placeholder="SS"
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
        />
      </div>
      <div>
        <button onClick={handleClicked}>
          {isRunning ? "paused" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
};

export default Timer;

// 1.input box banaya hour , minute and second ke liye
// 2.input ko state se control karenge
// 3.decimal base 10 integer number ko hi accept karna
// 4.value ko state me save karna

// logic start now
// 1.agar user 65 second dede to usse 1 min 5 second me conver karo
// copyTime.minute += Math.floor(copyTime.second / 60);
// copyTime.second = copyTime.second % 60;
// setTime(copyTime);
// 2.agar user 65 minute dede to usse 1 hour 5 min me conver karo
// copyTime.hour += Math.floor(copyTime.minute / 60);
// copyTime.minute = copyTime.minute % 60;
// setTime(copyTime);

// main logic start
// 1.jab start button per click karu pause button show karna or count down start karna
// count down ke liye setInterval ka use karenge is Liye hum Useefect hook ka use karenge kyu setInterval clear bhi karna hota hai.
// useEffect hook ko isRunning depedency per chalayenge

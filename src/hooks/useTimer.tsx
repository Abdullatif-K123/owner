import { useState, useEffect } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState("1:00");
  const [refresh, setRefresh] = useState(true);

  const timerReset = () => {
    setTimer("1:00");
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    let seconds = 60;
    const interval = setInterval(() => {
      seconds === 0 ? 0 : seconds--;
      setTimer(`0:${seconds < 10 ? "0" : ""}${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [refresh]);

  return { timer, timerReset };
};

export default useTimer;

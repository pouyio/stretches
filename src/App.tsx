import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import "./App.css";
import { useWakeLock } from "react-screen-wake-lock";

const exercises = [
  { name: "Psoas stretch, left", seconds: 2 },
  { name: "Psoas stretch, right", seconds: 120 },
];

const Timer: React.FC<{ expireTime: Date; onExpire: () => void }> = ({
  expireTime,
  onExpire,
}) => {
  const { isRunning, minutes, seconds, start, resume, pause, restart } =
    useTimer({
      expiryTimestamp: expireTime,
      onExpire,
    });

  useEffect(() => {
    restart(expireTime);
  }, [expireTime]);

  return (
    <>
      <p>
        {minutes}:{seconds}
      </p>
      <button onClick={start}>Start</button>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={resume}>Resume</button>
      )}
    </>
  );
};
const App = () => {
  const [index, setIndex] = useState(0);
  const [nextTime, setNextTime] = useState<Date>();
  const { isSupported, released, request, release } = useWakeLock();

  useEffect(() => {
    request();
    return () => {
      release();
    };
  }, []);

  useEffect(() => {
    if (!exercises.at(index)) {
      return;
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + exercises[index].seconds);
    setNextTime(time);
  }, [index]);

  const onExpire = () => {
    setIndex((i) => i + 1);
  };

  if (!exercises.at(index)) {
    release();
    return (
      <>
        <h1>Finished!!</h1>
        <a href=".">
          <button>Start Again</button>
        </a>
      </>
    );
  }

  return (
    <>
      <h2>{exercises[index].name}</h2>
      {!!nextTime && <Timer expireTime={nextTime} onExpire={onExpire} />}
      <div>
        <button onClick={() => setIndex((i) => i - 1)}>Pre</button>
        <button onClick={() => setIndex((i) => i + 1)}>Next</button>
      </div>
    </>
  );
};

export default App;

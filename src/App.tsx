import { useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
import "./App.css";
import exercises from "./assets/exercises.json";
import { Timer } from "./components/Timer";

const App = () => {
  const [index, setIndex] = useState(-1);
  const [nextTime, setNextTime] = useState<Date>();
  const { request, release } = useWakeLock();

  useEffect(() => {
    if (index === -1 || index === exercises.length) {
      return;
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + exercises[index].seconds);
    setNextTime(time);
  }, [index]);

  const onExpire = () => {
    setIndex((i) => i + 1);
  };

  if (index === exercises.length) {
    release();
    return (
      <>
        <h1>Finished!!</h1>
      </>
    );
  }

  if (index === -1) {
    return (
      <button
        onClick={() => {
          request();
          setIndex(0);
        }}
      >
        Start now
      </button>
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

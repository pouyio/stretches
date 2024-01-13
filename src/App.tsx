import { useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
// @ts-ignore
import useSound from "use-sound";
import "./App.css";
import endExercise from "./assets/end_exercise.wav";
import end from "./assets/end.wav";
import exercises from "./assets/exercises.json";
import { Timer } from "./components/Timer";

const App = () => {
  const [index, setIndex] = useState(-1);
  const [nextTime, setNextTime] = useState<Date>();
  const { request, release } = useWakeLock();
  const [playExercise] = useSound(endExercise);
  const [playEnd] = useSound(end, { volume: 0.1 });

  useEffect(() => {
    if (index === -1 || index === exercises.length) {
      return;
    }
    const time = new Date();
    time.setSeconds(time.getSeconds() + exercises[index].seconds);
    setNextTime(time);
  }, [index]);

  const onExpire = () => {
    if (index !== exercises.length - 1 && exercises[index].name !== "Rest") {
      playExercise();
    }
    setIndex((i) => i + 1);
  };

  if (index === exercises.length) {
    playEnd();
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

  const name = exercises[index].name;
  const nextName =
    name === "Rest"
      ? exercises.at(index + 1)?.name
      : exercises.at(index + 2)?.name;
  const exercisesRemaining = exercises
    .slice(index)
    .filter((e) => e.name !== "Rest").length;

  return (
    <>
      <h2>{exercises[index].name}</h2>
      {exercises[index].img && (
        <img src={`/${exercises[index].img}`} alt="execise" />
      )}
      {nextName && <p>Next: {nextName}</p>}
      {nextName && <p>Remaining: {exercisesRemaining}</p>}
      {!!nextTime && (
        <Timer
          expireTime={nextTime}
          onExpire={onExpire}
          duration={exercises[index].seconds}
        />
      )}
      <div>
        <button onClick={() => setIndex((i) => i - 1)}>Pre</button>
        <button onClick={() => setIndex((i) => i + 1)}>Next</button>
      </div>
    </>
  );
};

export default App;

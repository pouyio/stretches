import { useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
// @ts-ignore
import useSound from "use-sound";
import "./App.css";
import endExercise from "./assets/end_exercise.wav";
import end from "./assets/end.wav";
import exercises from "./assets/exercises.json";
import { Timer } from "./components/Timer";
import { Button } from "./components/Button";

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
      <Button
        onClick={() => {
          request();
          setIndex(0);
        }}
      >
        Start now
      </Button>
    );
  }

  const name = exercises[index].name;
  const nextExercise =
    name === "Rest" ? exercises.at(index + 1) : exercises.at(index + 2);

  const isResting = name === "Rest";

  const exercisesRemaining = exercises
    .slice(index)
    .filter((e) => e.name !== "Rest").length;

  return (
    <div
      style={{ gridTemplateRows: "10% 50% 40%" }}
      className={`grid items-center h-full w-full flex flex-col`}
    >
      <div className="title-area text-4xl">
        <h2>{exercises[index].name}</h2>
      </div>

      <div className="image-area">
        {exercises[index].img && (
          <img
            style={{ maxWidth: "100%" }}
            className="m-auto"
            src={`/${exercises[index].img}`}
            alt="execise"
          />
        )}

        {nextExercise && isResting && (
          <>
            <img
              style={{ maxWidth: "100%" }}
              src={`/${nextExercise.img}`}
              className="m-auto"
              alt="execise"
            />
            <p>Next: {nextExercise.name}</p>
          </>
        )}
      </div>

      <div className="controls-area">
        {nextExercise && <p>Remaining: {exercisesRemaining}</p>}
        <div className="">
          {!!nextTime && (
            <Timer
              resting={isResting}
              expireTime={nextTime}
              onExpire={onExpire}
              duration={exercises[index].seconds}
            />
          )}
        </div>

        <div className="flex justify-around items-center m-2 content-center">
          <Button className="w-2/5" onClick={() => setIndex((i) => i - 1)}>
            Pre
          </Button>
          <Button className="w-2/5" onClick={() => setIndex((i) => i + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;

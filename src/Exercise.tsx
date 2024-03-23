import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWakeLock } from "react-screen-wake-lock";
// @ts-ignore
import useSound from "use-sound";

import ConfettiExplosion from "react-confetti-explosion";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import end from "./assets/end.wav";
import endExercise from "./assets/end_exercise.wav";
import { Step } from "./assets/exercises";
import { Button } from "./components/Button";
import { Timer } from "./components/Timer";
import { NumberIcon } from "./components/icons/NumberIcon";
import { TimeIcon } from "./components/icons/TimeIcon";
import { LaunchIcon } from "./components/icons/LaunchIcon";
import { CloseIcon } from "./components/icons/CloseIcon";
import { PrevIcon } from "./components/icons/PrevIcon";
import { NextIcon } from "./components/icons/NextIcon";
import { ExercisesContext } from "./contexts/ExercisesContext";

const ExerciseContainer: React.FC<
  PropsWithChildren<{
    title?: string;
    totalSteps: number;
    currentStep: number;
  }>
> = ({ title, totalSteps, currentStep, children }) => {
  const percentage = (currentStep * 100) / (totalSteps - 1);
  return (
    <div
      style={{ gridTemplateRows: "4.5rem auto 12.5rem" }}
      className={`grid w-full h-full`}
    >
      <div className="title-area text-2xl font-bold px-4 flex items-center">
        <div className="flex flex-col w-full h-full">
          <div className="flex items-center flex-1">
            <h1 className="flex-1">{title ? title : ""}</h1>
            <Link to="/">
              <CloseIcon />
            </Link>
          </div>
          <div className={`flex flex-col ${totalSteps ? "" : "hidden"}`}>
            <progress
              max="100"
              value={percentage}
              className="w-full h-2 rounded"
            />
            <div className="flex w-full place-content-between h-1">
              {Array(totalSteps)
                .fill(0)
                .map((mark: number, index) => (
                  <div
                    key={mark}
                    className={
                      [0, totalSteps - 1].includes(index)
                        ? "opacity-0"
                        : "" +
                          " h-1 w-1 rounded-b-lg " +
                          (currentStep >= index
                            ? "bg-green-700"
                            : "bg-gray-300")
                    }
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const PreviewItem: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <div className="m-1 rounded bg-zinc-700 h-full flex flex-col justify-center font-light">
      {step.img && <img className="p-2" src={`/${step.img}`} alt="execise" />}
      {step.name} <br />
      {step.seconds ? (
        <span className="inline-flex mx-auto items-center">
          {step.seconds} <TimeIcon />
        </span>
      ) : null}
      {step.repetitions ? (
        <span className="inline-flex m-auto items-center">
          {step.repetitions} <NumberIcon />
        </span>
      ) : null}
    </div>
  );
};

export const Exercise = () => {
  const { id = "" } = useParams();
  const [index, setIndex] = useState(-1);
  const [nextTime, setNextTime] = useState<Date>();
  const { request, release } = useWakeLock();
  const [playExercise] = useSound(endExercise);
  const [playEnd] = useSound(end, { volume: 0.1 });
  const { exercises } = useContext(ExercisesContext);
  const exercise = exercises[id];

  useEffect(() => {
    if (index === -1 || index === exercise.steps.length) {
      return;
    }
    const time = new Date();
    time.setSeconds(
      time.getSeconds() + (exercise.steps.at(index)?.seconds ?? 0),
    );
    setNextTime(time);
  }, [index]);

  const onExpire = () => {
    if (
      index !== exercise.steps.length - 1 &&
      exercise.steps[index].name !== "Rest"
    ) {
      playExercise();
    }
    setIndex((i) => i + 1);
  };

  if (index === exercise.steps.length) {
    playEnd();
    release();
    return (
      <ExerciseContainer currentStep={0} totalSteps={0}>
        <div className="image-area">
          <div className="flex h-full">
            <h1 className="row-span-2 self-center text-4xl m-auto">
              <ConfettiExplosion duration={4000} />
              Finished!!
            </h1>
          </div>
        </div>
        <div className="controls-area">
          <div className="inline-flex items-center">
            <Button
              className="m-4 w-full inline-flex justify-center"
              onClick={() => setIndex(-1)}
            >
              Retry?
            </Button>
          </div>
        </div>
      </ExerciseContainer>
    );
  }

  if (index === -1) {
    return (
      <ExerciseContainer title={id} currentStep={0} totalSteps={0}>
        <div className="overflow-y-auto">
          {exercise.description && (
            <p className="mb-4 font-light whitespace-pre">
              {exercise.description}
            </p>
          )}
          <ul className="flex flex-wrap">
            {exercise.steps
              .filter((step) => step.name !== "Rest")
              .map((step, index) => (
                <li className="w-1/2 p-1" key={index}>
                  <PreviewItem step={step} />
                </li>
              ))}
          </ul>
        </div>
        <div className="self-end mb-10 inline-flex">
          <Button
            className="m-4 w-full inline-flex justify-center "
            onClick={() => {
              request();
              setIndex(0);
            }}
          >
            <LaunchIcon />
          </Button>
        </div>
      </ExerciseContainer>
    );
  }

  const name = exercise.steps[index].name;
  const nextExercise =
    name === "Rest"
      ? exercise.steps.at(index + 1)
      : exercise.steps.at(index + 2);

  const isResting = name === "Rest";

  return (
    <ExerciseContainer
      title={exercise.steps[index].name}
      currentStep={index}
      totalSteps={exercise.steps.length}
    >
      <>
        <div className="image-area self-center">
          {exercise.steps[index].img && (
            <img
              style={{ maxWidth: "100%" }}
              className="m-auto"
              src={`/${exercise.steps[index].img}`}
              alt="execise"
            />
          )}

          {nextExercise && isResting && (
            <>
              {nextExercise.img && (
                <img
                  style={{ maxWidth: "100%" }}
                  src={`/${nextExercise.img}`}
                  className="m-auto"
                  alt="execise"
                />
              )}
              <p className="inline-flex items-center">
                Next: {nextExercise.name}{" "}
                {nextExercise.seconds
                  ? nextExercise.seconds
                  : nextExercise.repetitions}
                {nextExercise.seconds ? <TimeIcon /> : <NumberIcon />}
              </p>
            </>
          )}
        </div>

        <div className="controls-area self-end mb-10">
          {exercise.steps[index].repetitions && (
            <div className="inline-flex items-center">
              <p className="text-4xl">{exercise.steps[index].repetitions}</p>
              <NumberIcon big />
            </div>
          )}
          {exercise.steps[index].seconds && (
            <>
              {!!nextTime && (
                <Timer
                  resting={isResting}
                  expireTime={nextTime}
                  onExpire={onExpire}
                  duration={exercise.steps[index].seconds!}
                />
              )}
            </>
          )}

          <div className="flex justify-around items-center m-4 content-center">
            <Button
              disabled={index === 0}
              className="bg-zinc-700 w-full inline-flex justify-center mr-4"
              onClick={() => setIndex((i) => i - 1)}
            >
              <PrevIcon />
            </Button>
            <Button
              className="bg-zinc-700 w-full inline-flex justify-center ml-4"
              onClick={() => setIndex((i) => i + 1)}
            >
              <NextIcon />
            </Button>
          </div>
        </div>
      </>
    </ExerciseContainer>
  );
};

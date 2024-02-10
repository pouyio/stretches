import React, { PropsWithChildren, useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";
// @ts-ignore
import useSound from "use-sound";

import ConfettiExplosion from "react-confetti-explosion";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import end from "./assets/end.wav";
import endExercise from "./assets/end_exercise.wav";
import { Step, exercises } from "./assets/exercises";
import { Button } from "./components/Button";
import { Timer } from "./components/Timer";

const ExerciseContainer: React.FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <div
      style={{ gridTemplateRows: "4.5rem auto 12.5rem" }}
      className={`grid w-full h-full items-stretch`}
    >
      <div className="title-area text-2xl font-bold px-4 flex items-center">
        <h1 className="flex-1">{title ? title : ""}</h1>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      {children}
    </div>
  );
};

const PreviewItem: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <div className="m-1 rounded bg-zinc-700 h-full flex flex-col justify-center font-light">
      <img className="p-2" src={`/${step.img}`} alt="execise" />
      {step.name} <br />
      {step.seconds ? (
        <span className="inline-flex mx-auto">
          {step.seconds}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
      ) : null}
      {step.repetitions ? (
        <span className="inline-flex m-auto">
          {step.repetitions}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
              clipRule="evenodd"
            />
          </svg>
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
  const exercise = exercises[id];

  useEffect(() => {
    if (index === -1 || index === exercise.steps.length) {
      return;
    }
    const time = new Date();
    time.setSeconds(
      time.getSeconds() + (exercise.steps.at(index)?.seconds ?? 0)
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
      <ExerciseContainer>
        <h1 className="row-span-2 self-center text-4xl m-auto">
          <ConfettiExplosion duration={4000} />
          Finished!!
        </h1>
      </ExerciseContainer>
    );
  }

  if (index === -1) {
    return (
      <ExerciseContainer title={id}>
        <div className="overflow-y-auto">
          <ul className="flex flex-wrap">
            {exercise.steps
              .filter((step) => step.name !== "Rest")
              .map((step) => (
                <li className="w-1/2 p-1">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
            </svg>
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
    <ExerciseContainer title={exercise.steps[index].name}>
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

        <div className="controls-area self-end mb-10">
          {exercise.steps[index].repetitions && (
            <div className="inline-flex items-center">
              <p className="text-4xl">{exercise.steps[index].repetitions}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                  clipRule="evenodd"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <Button
              className="bg-zinc-700 w-full inline-flex justify-center ml-4"
              onClick={() => setIndex((i) => i + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </>
    </ExerciseContainer>
  );
};

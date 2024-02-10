import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "./Button";

export const Timer: React.FC<{
  expireTime: Date;
  onExpire: () => void;
  duration: number;
  resting: boolean;
}> = ({ expireTime, onExpire, duration, resting }) => {
  const { isRunning, minutes, seconds, resume, pause, restart, totalSeconds } =
    useTimer({
      expiryTimestamp: expireTime,
      onExpire,
    });

  useEffect(() => {
    restart(expireTime);
  }, [expireTime]);

  const progress = (duration - totalSeconds) / duration;

  return (
    <>
      <div className="m-4">
        <p>
          {minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        {isRunning ? (
          <Button className="w-full inline-flex justify-center" onClick={pause}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        ) : (
          <Button
            className="w-full inline-flex justify-center"
            onClick={resume}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        )}
      </div>
      <div
        style={{ width: `100%`, zIndex: -1 }}
        className={`absolute top-0 h-screen bg-pink-900`}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            zIndex: 5,
          }}
          className={`absolute h-full ${
            isRunning ? "duration-1000 ease-linear" : ""
          } bg-sky-900 ${resting ? "right-0" : "left-0"} `}
        ></div>
      </div>
    </>
  );
};

import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "./Button";
import { PauseIcon } from "./icons/PauseIcon";
import { PlayIcon } from "./icons/PlayIcon";

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
        <Button
          className="w-full inline-flex justify-center items-center"
          onClick={() => (isRunning ? pause() : resume())}
        >
          <p className="text-xl mr-2">
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
          {isRunning ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
      <div
        style={{ width: `100%`, zIndex: -1 }}
        className={`absolute top-0 left-0 h-screen bg-pink-900`}
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

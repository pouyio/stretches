import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "./Button";

export const Timer: React.FC<{
  expireTime: Date;
  onExpire: () => void;
  duration: number;
}> = ({ expireTime, onExpire, duration }) => {
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
    <div className="m-2">
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
      <p>
        <progress id="file" value={progress} max="1" />
      </p>
      <div className="">
        {isRunning ? (
          <Button className="w-2/5" onClick={pause}>
            Pause
          </Button>
        ) : (
          <Button className="w-2/5" onClick={resume}>
            Resume
          </Button>
        )}
      </div>
    </div>
  );
};

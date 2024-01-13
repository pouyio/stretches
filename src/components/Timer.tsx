import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export const Timer: React.FC<{
  expireTime: Date;
  onExpire: () => void;
  duration: number;
}> = ({ expireTime, onExpire, duration }) => {
  const { isRunning, minutes, seconds, resume, pause, restart } = useTimer({
    expiryTimestamp: expireTime,
    onExpire,
  });

  useEffect(() => {
    restart(expireTime);
  }, [expireTime]);

  const progress = (duration - seconds) / duration;

  return (
    <>
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
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={resume}>Resume</button>
      )}
    </>
  );
};

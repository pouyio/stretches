import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export const Timer: React.FC<{ expireTime: Date; onExpire: () => void }> = ({
  expireTime,
  onExpire,
}) => {
  const { isRunning, minutes, seconds, resume, pause, restart } = useTimer({
    expiryTimestamp: expireTime,
    onExpire,
  });

  useEffect(() => {
    restart(expireTime);
  }, [expireTime]);

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
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={resume}>Resume</button>
      )}
    </>
  );
};

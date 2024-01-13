import { useWakeLock } from "react-screen-wake-lock";

export const Settings = () => {
  const { request, release } = useWakeLock();

  const onClick = () => {
    request();
  };
  const onRelease = () => {
    release();
  };

  return (
    <>
      <h1>Settings</h1>
      <button onClick={onClick}>Request</button>
      <button onClick={onRelease}>Release</button>

      <code></code>
    </>
  );
};

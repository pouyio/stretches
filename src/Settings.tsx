import { Fragment, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";

export const Settings = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { request, release } = useWakeLock({
    onError: (e) => setLogs((l) => [...l, `onError: ${JSON.stringify(e)}`]),
    onRelease: (e) => setLogs((l) => [...l, `onRelease: ${JSON.stringify(e)}`]),
    onRequest: () => setLogs((l) => [...l, `onRequested`]),
  });

  const onClick = () => {
    request()
      .then((e) => setLogs((l) => [...l, `requested: ${JSON.stringify(e)}`]))
      .catch((e) =>
        setLogs((l) => [...l, `error requested: ${JSON.stringify(e)}`])
      );
  };
  const onRelease = () => {
    release()
      .then((e) => setLogs((l) => [...l, `release: ${JSON.stringify(e)}`]))
      .catch((e) => {
        setLogs((l) => [...l, `error release: ${JSON.stringify(e)}`]);
      });
  };

  return (
    <>
      <h1>Settings</h1>
      <button onClick={onClick}>Request</button>
      <button onClick={onRelease}>Release</button>

      <code>
        {logs.map((l, i) => (
          <Fragment key={i}>
            <br />
            {l}
          </Fragment>
        ))}
      </code>
    </>
  );
};

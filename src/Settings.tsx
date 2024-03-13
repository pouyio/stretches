import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Exercise, exercises } from "./assets/exercises";

// TODO improve UI. First select Exercise only modify one at a time
const getInitialValue = (): string => {
  const userExercises = localStorage.getItem("userExercises") ?? "";
  if (userExercises) {
    return userExercises;
  } else {
    return JSON.stringify(exercises, undefined, 4);
  }
};
export const Settings = () => {
  const [localExercisesRaw, setLocalExercisesRaw] = useState<string>("");

  useEffect(() => {
    setLocalExercisesRaw(getInitialValue());
  }, []);

  const onValueChange = (newValue: string) => {
    setLocalExercisesRaw(newValue);
  };

  const onSave = () => {
    if (validate(localExercisesRaw)) {
      localStorage.setItem("userExercises", localExercisesRaw);
    } else {
      console.log("ha fallado el parseo");
    }
  };

  const onReset = () => {
    setLocalExercisesRaw(getInitialValue());
  };

  const validate = (value: string): boolean => {
    try {
      JSON.parse(value) as Record<string, Exercise>;
      return true;
    } catch (e) {
      console.log("error: ", e);
      return false;
    }
  };

  return (
    <div className="flex flex-col w-full h-92">
      <h1>Settings</h1>
      <h2>Custom settings</h2>
      <textarea
        className="text-black"
        onChange={(e) => onValueChange(e.target.value)}
        value={localExercisesRaw}
      />
      <div>
        <Button onClick={onReset}>Reset</Button>
        <Button
          disabled={!localExercisesRaw || !validate(localExercisesRaw)}
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

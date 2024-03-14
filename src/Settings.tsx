import { useContext, useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Exercise } from "./assets/exercises";
import { ExercisesContext } from "./contexts/ExercisesContext";
import { Link } from "react-router-dom";
import { CloseIcon } from "./components/icons/CloseIcon";

// TODO improve UI. First select Exercise only modify one at a time
export const Settings = () => {
  const { exercises, saveExercises, resetExercises } =
    useContext(ExercisesContext);

  const [localExercisesRaw, setLocalExercisesRaw] = useState<string>("");

  useEffect(() => {
    setLocalExercisesRaw(JSON.stringify(exercises, undefined, 4));
  }, [exercises]);

  const onValueChange = (newValue: string) => {
    setLocalExercisesRaw(newValue);
  };

  const onSave = () => {
    if (validate(localExercisesRaw)) {
      saveExercises(JSON.parse(localExercisesRaw) as Record<string, Exercise>);
      localStorage.setItem("userExercises", localExercisesRaw);
    } else {
      console.log("ha fallado el parseo");
    }
  };

  const onReset = () => {
    setLocalExercisesRaw(JSON.stringify(exercises, undefined, 4));
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
    <div
      style={{ gridTemplateRows: "4.5rem auto 12.5rem" }}
      className={`grid w-full h-full items-stretch`}
    >
      <div className="title-area text-2xl font-bold px-4 flex items-center">
        <h1 className="flex-1">Settings</h1>
        <Link to="/">
          <CloseIcon />
        </Link>
      </div>
      <div className="image-area flex flex-col w-full">
        <textarea
          className="text-black h-full"
          onChange={(e) => onValueChange(e.target.value)}
          value={localExercisesRaw}
        />
      </div>
      <div className="controls-area">
        <Button onClick={resetExercises}>Delete local</Button>
        <Button onClick={onReset}>Reset form</Button>
        <Button
          disabled={
            !localExercisesRaw ||
            !validate(localExercisesRaw) ||
            localExercisesRaw === JSON.stringify(exercises, undefined, 4)
          }
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

import { useContext, useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Exercise } from "./assets/exercises";
import { ExercisesContext, validate } from "./contexts/ExercisesContext";
import { Link } from "react-router-dom";
import { CloseIcon } from "./components/icons/CloseIcon";

export const Settings = () => {
  const { exercises, saveExercises, resetExercises } =
    useContext(ExercisesContext);
  const [selectedKey, setSelectedKey] = useState<string>();
  const [localEditedExercise, setLocalEditedExercise] = useState<Exercise>();

  useEffect(() => {
    if (selectedKey) {
      setLocalEditedExercise(exercises[selectedKey]);
    }
  }, [exercises]);

  const onValueChange = (newValue: string) => {
    if (validate(newValue)) {
      setLocalEditedExercise(JSON.parse(newValue) as Exercise);
    }
  };

  const onSave = () => {
    if (selectedKey) {
      saveExercises({
        ...exercises,
        [selectedKey]: localEditedExercise,
      } as Record<string, Exercise>);
    } else {
      console.log("ha fallado el parseo");
    }
  };

  const onReset = () => {
    setLocalEditedExercise(exercises[selectedKey!]);
  };

  const onSelect = (e: string) => {
    setSelectedKey((os) => {
      const newSelected = os !== e ? e : undefined;
      if (newSelected) {
        setLocalEditedExercise(exercises[newSelected]);
      } else {
        setLocalEditedExercise(undefined);
      }
      return newSelected;
    });
  };

  const isDirty =
    JSON.stringify(localEditedExercise) !==
    JSON.stringify(exercises[selectedKey]);

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
        <ul>
          {Object.keys(exercises).map((e) => (
            <li
              key={e}
              className={`${selectedKey === e ? "bg-gray-700" : "bg-zinc-700"} rounded-full px-6 py-1 my-2 cursor-pointer`}
              onClick={() => onSelect(e)}
            >
              {e}
            </li>
          ))}
        </ul>
        {selectedKey && (
          <textarea
            className="text-black h-full"
            onChange={(e) => onValueChange(e.target.value)}
            value={JSON.stringify(localEditedExercise, undefined, 4)}
          />
        )}
      </div>
      <div className="controls-area">
        <Button onClick={resetExercises}>Delete local</Button>
        <Button disabled={!selectedKey || !isDirty} onClick={onReset}>
          Reset form
        </Button>
        {selectedKey && (
          <Button disabled={!selectedKey || !isDirty} onClick={onSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

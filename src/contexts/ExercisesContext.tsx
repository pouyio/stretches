import { createContext, ReactNode, useEffect, useState } from "react";
import { Exercise, exercises } from "../assets/exercises";

export const ExercisesContext = createContext<{
  saveExercises: (exercises: Record<string, Exercise>) => void;
  exercises: Record<string, Exercise>;
  resetExercises: () => void;
}>({ saveExercises: () => {}, exercises: {}, resetExercises: () => {} });

const validate = (value: string): boolean => {
  try {
    JSON.parse(value) as Record<string, Exercise>;
    return true;
  } catch (e) {
    console.log("error: ", e);
    return false;
  }
};

export const ExercisesProvider = ({ children }: { children: ReactNode }) => {
  const [localExercises, setLocalExercises] = useState<
    Record<string, Exercise>
  >({});

  useEffect(() => {
    const userExercises = localStorage.getItem("userExercises") ?? "";
    if (validate(userExercises)) {
      setLocalExercises(JSON.parse(userExercises) as Record<string, Exercise>);
    } else {
      setLocalExercises(exercises);
    }
  }, []);

  const localSetExercises = (newExercises: Record<string, Exercise>) => {
    localStorage.setItem("userExercises", JSON.stringify(newExercises));
    setLocalExercises(newExercises);
  };

  const localResetExercises = () => {
    localStorage.removeItem("userExercises");
    setLocalExercises(exercises);
  };

  return (
    <ExercisesContext.Provider
      value={{
        exercises: localExercises,
        saveExercises: localSetExercises,
        resetExercises: localResetExercises,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

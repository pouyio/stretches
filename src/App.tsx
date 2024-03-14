import { Link } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { ExercisesContext } from "./contexts/ExercisesContext";

export const App: React.FC = () => {
  const { exercises } = useContext(ExercisesContext);
  return (
    <ul>
      {Object.keys(exercises).map((e) => (
        <li key={e} className="bg-zinc-700 rounded-full px-6 py-1 my-2">
          <Link to={e}>{e}</Link>
        </li>
      ))}
      <li className="bg-gray-700 rounded-full px-6 py-1 my-2">
        <Link to="/settings">Settings</Link>
      </li>
    </ul>
  );
};

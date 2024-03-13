import { Link } from "react-router-dom";
import "./App.css";
import { exercises } from "./assets/exercises";

export const App: React.FC = () => {
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

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Exercise } from "./Exercise";
import { Settings } from "./Settings";
import "./index.css";

const routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/settings", element: <Settings /> },
  { path: "/:id", element: <Exercise /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

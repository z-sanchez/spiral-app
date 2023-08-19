import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { ScorePage } from "./pages/ScorePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/scores",
    element: <ScorePage />,
  },
]);

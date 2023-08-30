import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { ScorePage } from "./pages/ScorePage";
import { LoginPage } from "./pages/LoginPage";
// import { getAuth } from "firebase/auth";

const PrivateRoutes = () => {
  const auth = true; //getAuth().currentUser;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<ScorePage />} path="/scores" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route path="*" element={<p>No Page Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

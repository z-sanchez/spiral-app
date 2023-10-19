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
import { useRecoilValue } from "recoil";
import { authenticationState } from "./state/AuthState";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";

const PrivateRoutes = () => {
  const authState = useRecoilValue(authenticationState);
  return authState.signedIn ? <Outlet /> : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<ScorePage />} path="/scores" />
          <Route element={<ProfileSettingsPage />} path="/profileSettings" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route path="*" element={<p>No Page Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

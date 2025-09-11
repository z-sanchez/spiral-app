import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { ScorePage } from "./pages/ScorePage";
import { LoginPage } from "./pages/LoginPage";
import { useRecoilValue } from "recoil";
import { authenticationState } from "./state/AuthState";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import { JoinLeaguePage } from "./pages/JoinLeaguePage";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const authState = useRecoilValue(authenticationState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.signedIn && !authState.user?.leagueId) {
      navigate("/join-league" + window.location.search);
    }
  }, [authState, navigate]);

  return authState.signedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/login" + window.location.search} />
  );
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<ScorePage />} path="/scores" />
          <Route element={<ProfileSettingsPage />} path="/profileSettings" />
          <Route element={<JoinLeaguePage />} path="/join-league" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route path="*" element={<p>No Page Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

import { ReactComponent as HouseIcon } from "../assets/icons/house.svg";
import { ReactComponent as CupIcon } from "../assets/icons/cup.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";

import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authenticationState } from "../state/AuthState";
import { setCookie } from "../utils/helpers/cookie";

const BottomNavBar = () => {
  const setAuthState = useSetRecoilState(authenticationState);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      setCookie(import.meta.env.VITE_COOKIE, "", 365);
      setAuthState({ signedIn: false, authUser: null, user: null });
    });
  };

  return (
    <div className="flex-shrink-0 bg-white w-full pb-8 pt-2 flex items-center justify-between px-20 border-t-2 border-gray-50">
      <NavLink
        onClick={(e) => e.stopPropagation()}
        to="/"
        className={({ isActive }) => (isActive ? "fill-purple-500" : "")}
      >
        <HouseIcon />
      </NavLink>
      <NavLink
        to="/scores"
        className={({ isActive }) => (isActive ? "fill-purple-500" : "")}
      >
        <CupIcon />
      </NavLink>
      <LogoutIcon onClick={handleSignOut} />
    </div>
  );
};

export { BottomNavBar };

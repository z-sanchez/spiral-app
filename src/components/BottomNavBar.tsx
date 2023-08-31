import { ReactComponent as HouseIcon } from "../assets/icons/house.svg";
import { ReactComponent as CupIcon } from "../assets/icons/cup.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/users.svg";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authenticationState } from "../state/AuthState";

const BottomNavBar = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setAuthState = useSetRecoilState(authenticationState);

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      setAuthState({ signedIn: false });
    });
  };

  return (
    <div className="flex-shrink-0 bg-white w-full h-14 flex items-center justify-between px-20 border-t-2 border-gray-50">
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
      <UsersIcon onClick={handleSignOut} />
    </div>
  );
};

export { BottomNavBar };

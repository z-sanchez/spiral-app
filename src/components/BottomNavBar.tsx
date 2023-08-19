import { ReactComponent as HouseIcon } from "../assets/icons/house.svg";
import { ReactComponent as CupIcon } from "../assets/icons/cup.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/users.svg";
import { NavLink } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <div className="flex-shrink-0 bg-white w-full h-14 flex items-center justify-between px-20 border-t-2 border-gray-50">
      <NavLink
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
      <UsersIcon />
    </div>
  );
};

export { BottomNavBar };

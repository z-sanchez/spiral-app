import { ReactComponent as HouseIcon } from "../assets/icons/house.svg";
import { ReactComponent as CupIcon } from "../assets/icons/cup.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/users.svg";

const BottomNavBar = () => {
  return (
    <div className="h-14 flex items-center justify-between px-20 border-t-2 border-gray-50 w-full">
      <HouseIcon className="fill-purple-500" />
      <CupIcon />
      <UsersIcon />
    </div>
  );
};

export { BottomNavBar };

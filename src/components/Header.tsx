import { useRecoilValue } from "recoil";
import { ReactComponent as CoinIcon } from "../assets/icons/coin.svg";
import { authenticationState } from "../state/AuthState";
import { UserObject } from "../types/Firebase";
import { ProfileIcon } from "./ProfileIcon";
import { useNavigate } from "react-router";

const Header = () => {
  const { user } = useRecoilValue(authenticationState) as { user: UserObject };
  const navigate = useNavigate();

  return (
    <div className="flex h-16 px-6 w-full justify-between items-center flex-shrink-0">
      <div className="flex items-center">
        <CoinIcon className="stroke-purple-500" />
        <p className="text-purple-500 font-bold text-sm ml-1">Pot $125</p>
      </div>
      <ProfileIcon
        character={user.username[0]}
        backgroundColor={user.color ? user.color : "rgb(168 85 247)"}
        handleClick={() => navigate("/profileSettings")}
      />
    </div>
  );
};

export { Header };

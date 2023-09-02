import { ProfileIcon } from "./ProfileIcon";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as CoinIcon } from "../assets/icons/coin.svg";
import { User } from "../types/User";

type LeaderboardLineProps = User & {
  increaseIcon?: boolean;
  decreaseIcon?: boolean;
};

const LeaderboardLine = ({
  record,
  iconCharacter,
  roi,
  username,
  color,
}: LeaderboardLineProps) => {
  return (
    <div className="w-full flex items-center justify-around border-b-2 py-3 border-gray-50">
      <div className="flex items-center">
        <UpArrowIcon className="fill-green-500" />
        <ProfileIcon
          character={iconCharacter}
          styles="bg-cyan-500 drop-shadow-none w-5 h-5"
          backgroundColor={color}
        />
      </div>
      <p className="text-gray-700 w-1/4 text-start truncate">{username}</p>
      <p className="bg-gray-100 rounded-full text-purple-500 text-sm  px-3">
        {record.wins}-{record.loses}
      </p>
      <div className="flex items-center">
        <CoinIcon className="stroke-purple-500" />
        <p className="text-purple-500 font-bold text-sm ml-1">{roi}</p>
      </div>
    </div>
  );
};

export { LeaderboardLine };

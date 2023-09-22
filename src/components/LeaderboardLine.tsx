import { ProfileIcon } from "./ProfileIcon";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as CoinIcon } from "../assets/icons/coin.svg";
import { User } from "../types/User";
import { Record } from "../types/Record";

type LeaderboardLineProps = User & {
  increaseIcon?: boolean;
  decreaseIcon?: boolean;
  record: Record;
  rank: number;
  allTime: boolean;
};

const LeaderboardLine = ({
  record,
  iconCharacter,
  rank,
  username,
  color,
  allTime,
}: LeaderboardLineProps) => {
  return (
    <div className="w-full flex items-center justify-between border-b-2 py-3 border-gray-50">
      <p className="text-purple-500 font-bold text-sm ml-1">{rank}</p>
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
        {rank === 1 && allTime ? (
          <CoinIcon className="stroke-purple-500" />
        ) : (
          <CoinIcon />
        )}
      </div>
    </div>
  );
};

export { LeaderboardLine };

import { ProfileIcon } from "./ProfileIcon";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { Record } from "../types/Record";

type LeaderboardLineProps = {
  iconCharacter: string;
  username: string;
  color: string;
  increaseIcon?: boolean;
  decreaseIcon?: boolean;
  hotStreakIcon?: boolean;
  silverMedalIcon?: boolean;
  bronzeMedalIcon?: boolean;
  trophyIcon?: boolean;
  lastPlace?: boolean;
  record: Record;
  rank: number;
  allTimeLeader?: boolean;
  gamesBack?: number;
  streak?: { count: number; type: "win" | "loss" };
};

const Streak = ({
  streak,
}: {
  streak?: { count: number; type: "win" | "loss" };
}) => {
  if (!streak) return "";
  const text = `${streak.count}${streak.type === "win" ? "W" : "L"}`;

  return (
    <p
      className={` bg-gray-100 text-sm w-16 text-center rounded-full ${streak?.type === "win" ? "text-green-500" : "text-red-500"}`}
    >
      {text}
    </p>
  );
};

const LeaderboardLine = ({
  record,
  iconCharacter,
  rank,
  username,
  color,
  increaseIcon,
  decreaseIcon,
  hotStreakIcon,
  silverMedalIcon,
  bronzeMedalIcon,
  trophyIcon,
  lastPlace,
  allTimeLeader,
  gamesBack,
  streak,
}: LeaderboardLineProps) => {
  const showEmblems = false;
  return (
    <div className="w-full flex items-center justify-between border-b-2 py-3 border-gray-50">
      <p className="text-purple-500 font-bold text-sm text-center w-4">
        {rank}
      </p>
      <div className="flex items-center">
        {!increaseIcon && !decreaseIcon ? (
          <p className=""></p>
        ) : (
          <>
            {increaseIcon ? (
              <UpArrowIcon className="fill-green-500 w-8" />
            ) : null}
            {decreaseIcon ? (
              <DownArrowIcon className="fill-red-500 w-8" />
            ) : null}
          </>
        )}

        <ProfileIcon character={iconCharacter} backgroundColor={color} />
      </div>
      <p className="text-gray-700 w-5/12 px-2 text-start truncate">
        {username}
      </p>
      <p className="bg-gray-100 rounded-full text-purple-500 text-sm w-16 text-center">
        {record.wins}-{record.losses}
      </p>
      <p className="text-gray-500 text-sm w-16 text-center">
        {gamesBack !== undefined ? `${gamesBack} GB` : ""}
      </p>
      <Streak streak={streak} />
      {showEmblems ? (
        <p className="w-10 ">
          {allTimeLeader ? <>&#128081;</> : null}
          {lastPlace ? <>&#128546;</> : null}
          {hotStreakIcon ? <>&#128293;</> : null}
          {bronzeMedalIcon ? <>&#129353;</> : null}
          {silverMedalIcon ? <>&#129352;</> : null}
          {trophyIcon ? <>&#127942;</> : null}
        </p>
      ) : null}
    </div>
  );
};

export { LeaderboardLine };

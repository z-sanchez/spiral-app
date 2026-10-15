import { ProfileIcon } from "./ProfileIcon";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { Record } from "../types/Record";

type LeaderboardLineProps = {
  winPercentage?: number;
  isAllTime: boolean;
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
  if (!streak)
    return (
      <p className="bg-gray-100 text-xs w-12 text-center rounded-full">-</p>
    );
  const text = `${streak.count}${streak.type === "win" ? "W" : "L"}`;

  return (
    <p
      className={` bg-gray-100 text-xs w-12 text-center rounded-full ${streak?.type === "win" ? "text-green-500" : "text-red-500"}`}
    >
      {text}
    </p>
  );
};

const NewStreak = ({
  streak,
}: {
  streak?: { count: number; type: "win" | "loss" };
}) => {
  if (!streak) return <p className="text-sm w-14 shrink-0 text-center">-</p>;
  const text = `${streak.count}${streak.type === "win" ? "W" : "L"}`;

  return (
    <p
      className={` text-sm w-14 shrink-0 text-center ${streak?.type === "win" ? "text-green-500" : "text-red-500"}`}
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
  isAllTime,
  winPercentage,
}: LeaderboardLineProps) => {
  const showEmblems = false;
  return (
    <div className="w-full flex items-center justify-between border-b-2 py-3 border-gray-50">
      <p className="text-purple-500 font-bold text-sm text-start w-8">
        {rank} &#128081;
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

      <p className="text-gray-700 w-4/12 px-2 text-start truncate">
        {username}
      </p>
      <p className="bg-gray-100 rounded-full text-purple-500 text-sm w-12 text-center">
        {record.wins}-{record.losses}
      </p>
      <p className="text-gray-500 text-xs w-12 text-center">
        {gamesBack !== undefined ? `${gamesBack} GB` : "0 GB"}
      </p>
      <p className="text-gray-500 text-xs w-12 text-center">
        {winPercentage !== undefined ? winPercentage.toFixed(3) : "-"}
      </p>
      {isAllTime ? null : <Streak streak={streak} />}
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

type NewProfileIconProps = {
  character: string;
  backgroundColor?: string;
  size?: "large" | "small";
  handleClick?: () => void;
};
const NewProfileIcon = ({
  character,
  backgroundColor,
  handleClick,
}: NewProfileIconProps) => {
  return (
    <div
      onClick={() => (handleClick ? handleClick() : null)}
      className={
        "flex justify-center items-center rounded-full outline-2 outline-white drop-shadow-md h-7 w-7 mx-2"
      }
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "",
      }}
    >
      <p className={"text-center font-semibold text-white text-sm "}>
        {character}
      </p>
    </div>
  );
};

const NewLeaderboardLine = ({
  record,
  iconCharacter,
  rank,
  username,
  color,
  increaseIcon,
  decreaseIcon,
  // hotStreakIcon,
  // silverMedalIcon,
  // bronzeMedalIcon,
  // trophyIcon,
  // lastPlace,
  // allTimeLeader,
  gamesBack,
  streak,
  isAllTime,
  winPercentage,
}: LeaderboardLineProps) => {
  // const showEmblems = false;
  return (
    <div className="flex items-center py-2 text-gray-700">
      <p className="text-sm w-12 text-start sticky left-0 flex-shrink-0 z-10 text-purple-500 font-bold bg-white">
        {rank} <span className="text-xs">&#128081; &#128081;</span>
      </p>
      <p className="flex w-52 text-start sticky left-12 flex-shrink-0 bg-white">
        {!increaseIcon && !decreaseIcon ? null : (
          <>
            {increaseIcon ? <UpArrowIcon className="fill-green-500" /> : null}
            {decreaseIcon ? <DownArrowIcon className="fill-red-500" /> : null}
          </>
        )}
        <NewProfileIcon character={iconCharacter} backgroundColor={color} />{" "}
        <span className="w-36 truncate text-gray-700 px-1">{username}</span>
      </p>

      <p className="bg-gray-100 rounded-full text-purple-500 text-sm w-16 text-center">
        {record.wins}-{record.losses}
      </p>
      <p className="text-sm w-16 shrink-0 text-center">
        {" "}
        {gamesBack !== undefined ? `${gamesBack} GB` : "0 GB"}
      </p>
      <p className="text-sm w-16 shrink-0 text-center">
        {winPercentage !== undefined ? winPercentage.toFixed(3) : "-"}
      </p>
      {isAllTime ? null : <NewStreak streak={streak} />}
    </div>
  );
};

export { LeaderboardLine, NewLeaderboardLine };

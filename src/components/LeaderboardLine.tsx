import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { Record as WinLossRecord } from "../types/Record";
import { EmblemType } from "../types/Emblems";

type LeaderboardLineProps = {
  winPercentage?: number;
  isAllTime: boolean;
  iconCharacter: string;
  username: string;
  color: string;
  increaseIcon?: boolean;
  decreaseIcon?: boolean;
  emblems?: EmblemType[];
  record: WinLossRecord;
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

type ProfileIconProps = {
  character: string;
  backgroundColor?: string;
  size?: "large" | "small";
  handleClick?: () => void;
};
const ProfileIcon = ({
  character,
  backgroundColor,
  handleClick,
}: ProfileIconProps) => {
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

const EmblemMap: Record<EmblemType, () => JSX.Element> = {
  allTimeLeader: () => <>&#128081;</>,
  allTimeSecondPlace: () => <>&#129352;</>,
  allTimeThirdPlace: () => <>&#129353;</>,
  onFire: () => <>&#128293;</>,
  lastWeekWinner: () => <>&#127942;</>,
  allTimeLastPlace: () => <>&#128546;</>,
};

const renderEmblems = (emblems?: EmblemType[]) => {
  if (!emblems || emblems.length === 0) return null;
  return (
    <div className="flex space-x-1">
      {emblems.map((emblem, index) => (
        <span key={index}>{EmblemMap[emblem]()}</span>
      ))}
    </div>
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
  gamesBack,
  streak,
  isAllTime,
  winPercentage,
  emblems,
}: LeaderboardLineProps) => {
  return (
    <div className="flex items-center py-2 text-gray-700">
      <div className="flex flex-row w-12 sticky left-0 flex-shrink-0 z-10 items-start">
        <p className=" text-purple-500 font-bold bg-white text-sm">{rank}</p>
        <p className="text-xs ml-2 text-center">{renderEmblems(emblems)}</p>
      </div>

      <p className="flex w-52 text-start sticky left-12 flex-shrink-0 bg-white">
        {!increaseIcon && !decreaseIcon ? (
          <span className="w-6" />
        ) : (
          <>
            {increaseIcon ? (
              <UpArrowIcon className="fill-green-500 w-6" />
            ) : null}
            {decreaseIcon ? (
              <DownArrowIcon className="fill-red-500 w-6" />
            ) : null}
          </>
        )}
        <ProfileIcon character={iconCharacter} backgroundColor={color} />{" "}
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
      {isAllTime ? null : <Streak streak={streak} />}
    </div>
  );
};

export { LeaderboardLine };

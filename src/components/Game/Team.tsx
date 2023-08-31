import { ReactComponent as RightPickIcon } from "../../assets/icons/right-pick.svg";
import { ReactComponent as WrongPickIcon } from "../../assets/icons/wrong-pick.svg";

import { Team as TeamType } from "../../types/Team";

type TeamProps = TeamType & {
  showPickResult?: boolean;
  correctPick?: boolean;
  score?: string;
  pick?: boolean;
  isHome: boolean;
};

const Team = ({
  abbreviation,
  color,
  alternateColor,
  name,
  showPickResult,
  correctPick,
  score,
  pick,
  isHome,
}: TeamProps) => {
  const correctPickAndGameOver = showPickResult && correctPick && pick;
  const wrongPickAndGameOver = showPickResult && !correctPick && pick;
  const emptyOutline = (!showPickResult && !pick) || (showPickResult && !pick);
  const displayColor = isHome ? color : alternateColor;
  return (
    <div className="flex items-center h-full w-full">
      {emptyOutline && <div className={"w-1 h-10"}></div>}
      {pick && (
        <div
          className={"w-1 h-10"}
          style={{ backgroundColor: "#" + displayColor }}
        ></div>
      )}
      {correctPickAndGameOver && <div className="w-1 h-10 bg-green-500"></div>}
      {wrongPickAndGameOver && <div className="w-1 h-10 bg-red-500"></div>}
      <div className="w-2/3 flex items-center">
        <p className="font-bold text-lg pl-2" style={{ color: displayColor }}>
          <span className="text-sm font-normal text-gray-700 pr-2">
            {abbreviation}
          </span>
          {name}
        </p>
        {showPickResult &&
          pick &&
          (correctPick ? (
            <RightPickIcon className="ml-2" />
          ) : (
            <WrongPickIcon className="ml-2" />
          ))}
      </div>
      <p className="ml-2">{score}</p>
    </div>
  );
};

export { Team };

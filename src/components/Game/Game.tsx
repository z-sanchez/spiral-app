import { Team } from "./Team";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { Competitors } from "../../types/Competitors";

type GameProps = {
  gameId: string;
  lock?: boolean;
  wager?: string;
  live?: boolean;
  showPickResult?: boolean;
  correctPick?: boolean;
  homeTeam: Competitors & { score?: string; pick?: boolean };
  awayTeam: Competitors & { score?: string; pick?: boolean };
  onClick: () => void;
};

const Game = ({
  lock,
  live,
  homeTeam,
  awayTeam,
  showPickResult,
  correctPick,
  onClick,
}: GameProps) => {
  return (
    <div className="border-b-2 py-3 border-gray-100" onClick={() => onClick()}>
      {lock || live ? (
        <div className=" flex items-center justify-between">
          {lock ? <LockIcon className="w-5 h-5 fill-purple-500" /> : null}
          {live ? (
            <div className="ml-auto flex items-center">
              <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>

              <p className="text-purple-500 font-bold text-sm">LIVE</p>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="flex w-full justify-between items-center">
        <div className="w-10/12">
          <Team
            {...awayTeam}
            showPickResult={showPickResult}
            correctPick={correctPick}
          />
          <Team
            {...homeTeam}
            showPickResult={showPickResult}
            correctPick={correctPick}
          />
        </div>
        <div className="flex items-center w-2/12">
          <p className="text-purple-500 font-bold text-sm text-center">
            {!homeTeam.pick && !awayTeam.pick ? "no pick" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export { Game };

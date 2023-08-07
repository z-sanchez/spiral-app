import { Team } from "./Team";
import { ReactComponent as CoinIcon } from "../../assets/icons/coin.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { Team as TeamType } from "../../types/Team";

type GameProps = {
  lock?: boolean;
  wager?: string;
  live?: boolean;
  showPickResult?: boolean;
  correctPick?: boolean;
  homeTeam: TeamType & { score?: string; pick?: boolean };
  awayTeam: TeamType & { score?: string; pick?: boolean };
};

const Game = ({
  lock,
  wager,
  live,
  homeTeam,
  awayTeam,
  showPickResult,
  correctPick,
}: GameProps) => {
  return (
    <div className="border-b-2 pb-3 border-gray-50">
      <div className="py-1 flex items-center justify-between">
        {lock ? <LockIcon className="w-5 h-5 fill-purple-500" /> : null}
        {live ? (
          <div className="ml-auto flex items-center">
            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>

            <p className="text-purple-500 font-bold text-sm">LIVE</p>
          </div>
        ) : null}
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="w-full">
          <Team
            {...homeTeam}
            showPickResult={showPickResult}
            correctPick={correctPick}
          />
          <Team
            {...awayTeam}
            showPickResult={showPickResult}
            correctPick={correctPick}
          />
        </div>
        <div className="flex items-center">
          <CoinIcon className="stroke-purple-500" />
          <p className="text-purple-500 font-bold text-sm">{wager}</p>
        </div>
      </div>
    </div>
  );
};

export { Game };

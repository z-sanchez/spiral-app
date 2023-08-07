import { Team } from "./Team";
import { ReactComponent as CoinIcon } from "../../assets/icons/coin.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";

const Game = () => {
  return (
    <div className="border-b-2 pb-3 border-gray-50">
      <div className="py-1 flex items-center justify-between">
        <LockIcon className="w-5 h-5 fill-purple-500" />
        <div className="self-end flex items-center">
          <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
          <p className="text-purple-500 font-bold text-sm">LIVE</p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="w-full">
          <Team />
          <Team />
        </div>
        <div className="flex items-center">
          <CoinIcon className="stroke-purple-500" />
          <p className="text-purple-500 font-bold text-sm">123</p>
        </div>
      </div>
    </div>
  );
};

export { Game };

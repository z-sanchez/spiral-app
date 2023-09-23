import { ReactComponent as CoinIcon } from "../assets/icons/coin.svg";

const Header = () => {
  return (
    <div className="flex h-16 px-6 justify-between w-full items-center flex-shrink-0">
      <div className="flex items-center">
        <CoinIcon className="stroke-purple-500" />
        <p className="text-purple-500 font-bold text-sm ml-1">Pot $250</p>
      </div>
    </div>
  );
};

export { Header };

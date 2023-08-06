import { ReactComponent as CoinIcon } from "../assets/icons/coin.svg";
import { ReactComponent as BrightnessIcon } from "../assets/icons/brightness.svg";

const Header = () => {
  return (
    <div className="flex justify-between w-full h-16 items-center">
      <div className="flex items-center">
        <CoinIcon className="stroke-purple-500" />
        <p className="text-purple-500 font-bold text-sm ml-1">123</p>
      </div>
      <BrightnessIcon />
    </div>
  );
};

export { Header };

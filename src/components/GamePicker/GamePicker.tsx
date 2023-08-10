import { AwayTeam } from "./AwayTeam";
import { HomeTeam } from "./HomeTeam";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";

const GamePicker = () => {
  return (
    <>
      <div className="absolute bg-gray-300 opacity-40 h-full w-full"></div>
      <div className="absolute  max-w-3xl h-full w-full flex justify-center items-center">
        <div className="w-11/12 flex flex-col justify-center items-center bg-white rounded-xl">
          <div className="w-full flex items-center py-5 px-4 justify-between">
            <ExitIcon className="w-6 h-6  drop-shadow-md" />
            <p className="font-light text-gray-300 text-sm">1 of 20</p>
            <InfoIcon className="w-6 h-6  drop-shadow-md" />
          </div>
          <div className="flex items-center w-full">
            <AwayTeam />
            <HomeTeam />
          </div>
          <div className="w-full flex items-center py-5 justify-center">
            {/* <CoinIcon className="stroke-purple-500 h-7 w-7" /> */}
            <div className="flex border-2 border-purple-500 rounded-full px-4">
              <p className="font-bold text-purple-500">$</p>
              <input
                type="number"
                placeholder="0"
                className=" text-purple-500  w-12 text-center font-semibold"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { GamePicker };

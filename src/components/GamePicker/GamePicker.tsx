import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { TeamPicker } from "./TeamPicker";
// import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
// import { GameDetails } from "./GameDetails";

const GamePicker = () => {
  return (
    <>
      <div className="absolute bg-gray-300 opacity-40 h-full w-full"></div>
      <div className="absolute  max-w-3xl h-full w-full flex justify-center items-center">
        <div className="relative w-11/12 h-3/5 min-h-[500px]  flex flex-col justify-between items-center bg-white rounded-xl">
          <div className="w-full flex items-center py-5 px-4 justify-between">
            <ExitIcon className="w-6 h-6  drop-shadow-md" />
            <p className="font-light text-gray-300 text-sm">1 of 20</p>
            <InfoIcon className="w-6 h-6  drop-shadow-md" />
          </div>
          {/* <div className="absolute h-full w-full flex justify-center items-center">
            <LockIcon className="fill-purple-500 h-8 w-8" />
          </div> */}
          {/* <GameDetails /> */}
          <TeamPicker />
        </div>
      </div>
    </>
  );
};

export { GamePicker };

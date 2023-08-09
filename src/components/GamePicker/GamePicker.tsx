import { AwayTeam } from "./AwayTeam";
import { HomeTeam } from "./HomeTeam";

const GamePicker = () => {
  return (
    <>
      <div className="absolute bg-gray-300 opacity-40 h-full w-full"></div>
      <div className="absolute h-full w-full max-w-3xl flex justify-center items-center ">
        <div className="flex items-center w-11/12 h-3/5 bg-white rounded-xl">
          <AwayTeam />
          <HomeTeam />
        </div>
      </div>
    </>
  );
};

export { GamePicker };

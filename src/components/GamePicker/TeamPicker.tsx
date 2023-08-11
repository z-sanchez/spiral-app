import { AwayTeam } from "./AwayTeam";
import { HomeTeam } from "./HomeTeam";

const TeamPicker = () => (
  <>
    <div className="flex items-center w-full">
      <AwayTeam />
      <HomeTeam />
    </div>
    <div className="w-full flex items-center py-5 justify-center">
      <div className="flex border-2 border-purple-500 rounded-full px-4">
        <p className="font-bold text-purple-500">$</p>
        <input
          type="number"
          placeholder="0"
          className=" text-purple-500 w-12 text-center font-semibold"
        ></input>
      </div>
    </div>
  </>
);

export { TeamPicker };

import { Team } from "../../types/Team";
import { AwayTeam } from "./AwayTeam";
import { HomeTeam } from "./HomeTeam";

type TeamPickerProps = {
  homeTeam: Team;
  awayTeam: Team;
  onPick: (pick: string) => void;
};

const TeamPicker = ({ homeTeam, awayTeam, onPick }: TeamPickerProps) => (
  <>
    <div className="flex items-center w-full">
      <AwayTeam team={awayTeam} onPick={onPick} />
      <HomeTeam team={homeTeam} onPick={onPick} />
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

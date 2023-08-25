import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { Team } from "../../types/Team";
import { TeamPicker } from "./TeamPicker";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
// import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
// import { GameDetails } from "./GameDetails";

type GamePickerProps = {
  homeTeam: Team;
  awayTeam: Team;
  handleClose: () => void;
};

const GamePicker = ({ homeTeam, awayTeam, handleClose }: GamePickerProps) => {
  return (
    <>
      <div className="absolute bg-gray-300 opacity-40 h-full w-full"></div>
      <div className="absolute max-w-3xl h-full w-full flex justify-center items-center">
        <ClickAwayListener
          onClickAway={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          <div className="relative w-11/12 h-3/5 min-h-[500px]  flex flex-col justify-between items-center bg-white rounded-xl">
            <div className="w-full flex items-center py-5 px-4 justify-between">
              <ExitIcon
                className="w-6 h-6  drop-shadow-md"
                onClick={() => {
                  handleClose();
                }}
              />
              <p className="font-light text-gray-300 text-sm">1 of 20</p>
              <InfoIcon className="w-6 h-6  drop-shadow-md" />
            </div>
            {/* <div className="absolute h-full w-full flex justify-center items-center">
            <LockIcon className="fill-purple-500 h-8 w-8" />
          </div> */}
            {/* <GameDetails /> */}
            <TeamPicker homeTeam={homeTeam} awayTeam={awayTeam} />
          </div>
        </ClickAwayListener>
      </div>
    </>
  );
};

export { GamePicker };

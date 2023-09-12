import { ReactComponent as HelmetIcon } from "../../assets/icons/away-teamhelmet.svg";
import { ReactComponent as CheckmarkIcon } from "../../assets/icons/checkmark.svg";
import { Team } from "../../types/Team";
import { ProfileIcon } from "../ProfileIcon";

const AwayTeam = ({
  team,
  onPick,
}: {
  team: Team;
  onPick: (pick: string) => void;
}) => {
  const { name, location, alternateColor, record, abbreviation } = team;
  return (
    <div
      className="w-1/2 px-5 flex flex-col items-center justify-center border-r-2 border-gray-100"
      onClick={() => onPick(abbreviation)}
    >
      <p className="mb-12 w-fit px-4 text-purple-500 text-sm text-center border-2 rounded-full border-purple-500 drop-shadow-sm bg-white">
        18%
      </p>
      <div className="flex relative justify-center items-center w-full">
        <div>
          <HelmetIcon
            className="w-28 h-28 flex-shrink-0"
            style={{ fill: alternateColor }}
          />
          <div className="flex items-center justify-between w-full ">
            <div className="flex flex-col items-start">
              <p>{location}</p>
              <p
                className="font-semibold text-xl"
                style={{ color: alternateColor }}
              >
                {name}
              </p>
              <p className="font-light text-gray-400">
                {record?.wins}-{record?.loses}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex relative">
              <ProfileIcon
                character="Z"
                styles="bg-cyan-500 z-10 absolute left-0"
              />
              <ProfileIcon
                character="B"
                styles="bg-pink-500 z-20 absolute left-4"
              />
              <ProfileIcon
                character="S"
                styles="bg-red-500 z-30 absolute left-8"
              />
              <ProfileIcon
                character="D"
                styles="bg-purple-500 z-40 absolute left-12"
              />
              <ProfileIcon
                character="..."
                styles="bg-purple-500 z-50 absolute left-16"
              />
            </div>
            <p className="mt-10 font-light text-sm text-gray-300">4 votes</p>
          </div>
        </div>

        <CheckmarkIcon className="absolute right-0  h-5 w-5" />
      </div>
    </div>
  );
};

export { AwayTeam };

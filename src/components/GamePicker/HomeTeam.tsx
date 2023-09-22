import { useState } from "react";
import { ReactComponent as HelmetIcon } from "../../assets/icons/home-team-helmet.svg";
// import { ReactComponent as CheckmarkIcon } from "../../assets/icons/checkmark.svg";

// import { ProfileIcon } from "../ProfileIcon";
import { Team } from "../../types/Team";

const HomeTeam = ({
  team,
  pick,
  onPick,
  makeContinuousPick,
}: {
  team: Team;
  pick: boolean;
  onPick: (pick: string) => void;
  makeContinuousPick: boolean;
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const { name, location, color, record, abbreviation } = team;
  return (
    <div
      className="w-1/2 px-5 flex flex-col items-center justify-center border-r-2 border-gray-100 gamePicker-team"
      onClick={() =>
        makeContinuousPick ? setShowAnimation(true) : onPick(abbreviation)
      }
    >
      <p
        onAnimationEnd={() => {
          onPick(abbreviation);
          setShowAnimation(false);
        }}
        className={
          "mb-12 w-fit px-4 text-white text-sm text-center rounded-full  bg-purple-500 h-5 " +
          (pick ? "" : "invisible") +
          (showAnimation ? "visible pickAnimation" : "")
        }
      >
        Your Pick
      </p>
      <div className="flex relative justify-center items-center w-full">
        {/* <CheckmarkIcon className="absolute left-0  h-5 w-5" /> */}
        <div>
          <HelmetIcon
            className="w-28 h-28 flex-shrink-0"
            style={{ fill: color }}
          />
          <div className="flex items-center justify-end w-full">
            <div className="flex flex-col items-end">
              <p>{location}</p>
              <p className="font-semibold text-xl" style={{ color }}>
                {name}
              </p>
              <p className="font-light text-gray-400">
                {record?.wins}-{record?.loses}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            {/* <div className="flex relative">
              <ProfileIcon
                character="Z"
                styles="bg-cyan-500 z-10 absolute right-0"
              />
              <ProfileIcon
                character="B"
                styles="bg-pink-500 z-20 absolute right-4"
              />
              <ProfileIcon
                character="S"
                styles="bg-red-500 z-30 absolute right-8"
              />
              <ProfileIcon
                character="D"
                styles="bg-purple-500 z-40 absolute right-12"
              />
              <ProfileIcon
                character="..."
                styles="bg-purple-500 z-50 absolute right-16"
              />
            </div>
            <p className="mt-10 font-light text-sm self-end text-gray-300">
              4 votes
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomeTeam };

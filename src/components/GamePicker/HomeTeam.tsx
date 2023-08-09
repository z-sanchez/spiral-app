import { ReactComponent as HelmetIcon } from "../../assets/icons/home-team-helmet.svg";
import { ProfileIcon } from "../ProfileIcon";

const HomeTeam = () => {
  return (
    <div className="w-1/2 h-4/5 px-5 flex justify-center flex-col">
      <p className="mb-16 mx-auto px-4 text-purple-500 text-sm text-center border-2 rounded-full border-purple-500">
        18%
      </p>
      <HelmetIcon className="w-28 h-28 flex-shrink-0 self-center" />
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-end">
          <p>Philidelphia</p>
          <p className="font-bold text-xl">Eagles</p>
          <p className="font-light text-gray-400">3-2</p>
        </div>
      </div>
      <div className="flex flex-col self-center items-end mt-8">
        <div className="flex relative">
          <ProfileIcon
            character="..."
            styles="bg-purple-500 z-50 absolute -left-16"
          />
          <ProfileIcon
            character="Z"
            styles="bg-cyan-500 z-40 absolute -left-12"
          />
          <ProfileIcon
            character="B"
            styles="bg-pink-500 z-30 absolute -left-8"
          />
          <ProfileIcon
            character="S"
            styles="bg-red-500 z-20 absolute -left-4 "
          />
          <ProfileIcon
            character="D"
            styles="bg-purple-500 z-10 absolute left-0"
          />
        </div>
        <p className="mt-10 font-light text-sm text-gray-300">4 votes</p>
      </div>
    </div>
  );
};

export { HomeTeam };

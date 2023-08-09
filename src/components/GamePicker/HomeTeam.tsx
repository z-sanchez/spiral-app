import { ReactComponent as HelmetIcon } from "../../assets/icons/home-team-helmet.svg";
import { ReactComponent as CheckmarkIcon } from "../../assets/icons/checkmark.svg";

const HomeTeam = () => {
  return (
    <div className="w-1/2 h-4/5 px-5 flex items-center flex-col">
      <p className="mb-16 mx-auto">Prediction</p>
      <HelmetIcon className="w-28 h-28" />
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-end">
          <p>Philidelphia</p>
          <p className="font-bold text-2xl">Eagles</p>
          <p className="font-light text-gray-400">3-2</p>
        </div>
      </div>
    </div>
  );
};

export { HomeTeam };

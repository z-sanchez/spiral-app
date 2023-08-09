import { ReactComponent as HelmetIcon } from "../../assets/icons/away-teamhelmet.svg";
import { ReactComponent as CheckmarkIcon } from "../../assets/icons/checkmark.svg";

const AwayTeam = () => {
  return (
    <div className="w-1/2 h-4/5 px-5 flex items-center flex-col">
      <p className="mb-16 mx-auto">Prediction</p>
      <HelmetIcon className="w-28 h-28" />
      <div className="flex items-center justify-between w-full">
        <div>
          <p>Dallas</p>
          <p className="font-bold text-2xl">Cowboys</p>
          <p className="font-light text-gray-400">3-2</p>
        </div>
        <CheckmarkIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export { AwayTeam };

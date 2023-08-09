import { ReactComponent as HelmetIcon } from "../../assets/icons/away-teamhelmet.svg";

const AwayTeam = () => {
  return (
    <div className="w-1/2 h-4/5 px-5 flex justify-center border-r-2 border-gray-100">
      <div className="flex flex-col items-center">
        <p className="mb-16 mx-auto">Prediction</p>
        <HelmetIcon className="w-28 h-28" />
        <div className="flex items-center justify-between w-full">
          <div>
            <p>Dallas</p>
            <p className="font-bold text-2xl">Cowboys</p>
            <p className="font-light text-gray-400">3-2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AwayTeam };

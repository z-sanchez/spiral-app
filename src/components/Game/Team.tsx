import { ReactComponent as RightPickIcon } from "../../assets/icons/right-pick.svg";

const Team = () => {
  return (
    <div className="flex items-center h-full w-full">
      <div className="w-1 h-10 bg-green-400"></div>
      <div className="w-2/3 flex items-center">
        <p className="text-blue-900 font-bold text-lg pl-2">
          <span className="text-sm font-normal text-gray-700 pr-2">DAL</span>
          Cowboys
        </p>
        <RightPickIcon className="ml-2" />
      </div>
      <p className="ml-2">7</p>
    </div>
  );
};

export { Team };

export const LeaderboardHeader = ({ isAllTime }: { isAllTime: boolean }) => {
  return (
    <div className="flex items-center justify-between w-full text-purple-500 py-2 ">
      <p className="text-sm w-8 text-start">RNK</p>
      <p className="text-sm w-4/12 text-center">Name</p>
      <p className="text-sm w-7 text-center"></p>
      <p className="text-xs w-12 text-center">W/L</p>
      <p className="text-xs w-12 text-center">GB</p>
      <p className="text-xs w-12 text-center">W%</p>
      {isAllTime ? null : <p className="text-xs w-12 text-center">STRK</p>}
    </div>
  );
};

export const NewLeaderboardHeader = ({ isAllTime }: { isAllTime: boolean }) => {
  return (
    <div className="flex items-center text-purple-500 py-2">
      <p className="text-sm w-12 left-0 text-start sticky shrink-0 z-10 bg-white">
        RNK
      </p>
      <p className="text-sm w-52 left-12 text-start sticky shrink-0 z-10 bg-white">
        Name
      </p>

      <p className="text-sm w-16 text-center shrink-0">W/L</p>
      <p className="text-sm w-16 text-center shrink-0">GB</p>
      <p className="text-sm w-16 text-center shrink-0">W%</p>
      {isAllTime ? null : (
        <p className="text-sm w-16 text-center shrink-0">STRK</p>
      )}
    </div>
  );
};

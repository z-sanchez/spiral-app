export const LeaderboardHeader = ({ isAllTime }: { isAllTime: boolean }) => {
  return (
    <div className="flex items-center justify-between w-full text-purple-500 py-2 ">
      <p className="text-sm w-8 text-center">RNK</p>
      <p className="text-sm w-4/12 text-center">Name</p>
      <p className="text-sm w-7 text-center"></p>
      <p className="text-sm w-12 text-center">W/L</p>
      <p className="text-sm w-12 text-center">GB</p>
      <p className="text-sm w-12 text-center">W%</p>
      {isAllTime ? null : <p className="text-sm w-12 text-center">STRK</p>}
    </div>
  );
};

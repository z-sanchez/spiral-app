const Score = ({
  score,
  text,
  outline,
  style,
}: {
  score?: string;
  text?: string;
  outline?: boolean;
  style?: string;
}) => {
  return (
    <div
      className={
        "flex flex-col justify-center items-center w-2/6  " +
        (outline ? "border-x-2 border-gray-100 " : "")
      }
    >
      <p className="font-bold text-purple-500">{text}</p>
      <p className={"text-xl pt-2 " + style}>{score}</p>
    </div>
  );
};

const Scoreboard = () => {
  return (
    <div className="flex w-full justify-center">
      <Score text="W" score="7" />
      <Score text="L" score="3" outline={true} />
      <Score text="ROI" score="+712" style="text-green-500" />
    </div>
  );
};

export { Scoreboard };

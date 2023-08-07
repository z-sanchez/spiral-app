import { Score } from "./Score";

type ScoreboardProps = {
  wins: string;
  loses: string;
  roi: string;
  roiStyle?: string;
};

const Scoreboard = ({ wins, loses, roi, roiStyle }: ScoreboardProps) => {
  return (
    <div className="flex w-full justify-center">
      <Score text="W" score={wins} />
      <Score text="L" score={loses} outline={true} />
      <Score text="ROI" score={roi} style={roiStyle} />
    </div>
  );
};

export { Scoreboard };

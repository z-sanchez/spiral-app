import { Score } from "./Score";

type ScoreboardProps = {
  wins: string;
  loses: string;
  rank: string;
  rankStyle?: string;
};

const Scoreboard = ({ wins, loses, rank, rankStyle }: ScoreboardProps) => {
  return (
    <div className="flex w-full justify-center">
      <Score text="W" score={wins} />
      <Score text="L" score={loses} outline={true} />
      <Score text="rank" score={rank} style={rankStyle} />
    </div>
  );
};

export { Scoreboard };

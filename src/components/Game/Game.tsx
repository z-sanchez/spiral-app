import { Competitors } from "../../types/Competitors";
import { GameTeam } from "./GameTeam";

type GameProps = {
  readonly: boolean;
  gameId: string;
  showResults?: boolean;
  correctPick?: boolean;
  showScores?: boolean;
  homeTeam: Competitors & { score?: string; isPicked?: boolean };
  awayTeam: Competitors & { score?: string; isPicked?: boolean };
  onPick: (team: string) => void;
};

const Game = ({
  homeTeam,
  awayTeam,
  readonly,
  showScores,
  showResults,
  correctPick,
  onPick,
}: GameProps) => {
  return (
    <div className="py-4 flex justify-between">
      <GameTeam
        {...awayTeam}
        showScore={showScores}
        isCorrectPick={
          showResults && awayTeam.isPicked ? correctPick : undefined
        }
        readonly={readonly}
        handlePick={() => onPick(awayTeam.abbreviation)}
        testId="awayTeam"
      />
      <GameTeam
        {...homeTeam}
        showScore={showScores}
        isCorrectPick={
          showResults && homeTeam.isPicked ? correctPick : undefined
        }
        readonly={readonly}
        handlePick={() => onPick(homeTeam.abbreviation)}
        testId="homeTeam"
      />
    </div>
  );
};

export { Game };

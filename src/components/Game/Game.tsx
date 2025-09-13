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
  onPick: (team: string) => Promise<boolean>;
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
  const pick = awayTeam.isPicked
    ? awayTeam.abbreviation
    : homeTeam.isPicked
    ? homeTeam.abbreviation
    : "";

  const handlePick = (team: string) => {
    if (readonly) return;
    onPick(team);
  };

  const homeTeamIsPicked = pick === homeTeam.abbreviation;
  const awayTeamIsPicked = pick === awayTeam.abbreviation;

  return (
    <div className="py-4 flex justify-between">
      <GameTeam
        {...awayTeam}
        isPicked={awayTeamIsPicked}
        showScore={showScores}
        isCorrectPick={
          showResults && awayTeamIsPicked ? correctPick : undefined
        }
        readonly={readonly}
        handlePick={() => handlePick(awayTeam.abbreviation)}
        testId="awayTeam"
      />
      <GameTeam
        {...homeTeam}
        isPicked={homeTeamIsPicked}
        showScore={showScores}
        isCorrectPick={
          showResults && homeTeamIsPicked ? correctPick : undefined
        }
        readonly={readonly}
        handlePick={() => handlePick(homeTeam.abbreviation)}
        testId="homeTeam"
      />
    </div>
  );
};

export { Game };

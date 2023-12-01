import { Competitors } from "../../types/Competitors";
import { NewTeam } from "./NewTeam";

type GameProps = {
  readonly: boolean;
  gameId: string;
  showResults?: boolean;
  showScores?: boolean;
  homeTeam: Competitors & { score?: string; isPicked?: boolean };
  awayTeam: Competitors & { score?: string; isPicked?: boolean };
  onPick: (team: string) => void;
};

const NewGame = ({
  homeTeam,
  awayTeam,
  readonly,
  showScores,
  showResults,
  correctPick,
  onPick,
}: GameProps) => {
  return (
    <div className="py-2 flex justify-between">
      <NewTeam
        {...awayTeam}
        isPicked={true}
        isCorrectPick={true}
        readonly={readonly}
        handlePick={() => onPick(awayTeam.abbreviation)}
      />
      <NewTeam
        {...homeTeam}
        isPicked={true}
        isCorrectPick={true}
        readonly={readonly}
        handlePick={() => onPick(awayTeam.abbreviation)}
      />
    </div>
  );
};

export { NewGame };

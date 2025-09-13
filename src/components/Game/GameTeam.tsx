import { Competitors } from "../../types/Competitors";

type TeamProps = Competitors & {
  showScore?: boolean;
  isPicked?: boolean;
  score?: string;
  isCorrectPick?: boolean;
  readonly: boolean;
  testId: string;
  handlePick: () => void;
};

const pickedStyles = {
  outline: "1px solid rgba(168, 85, 247, 0.76)",
  background: "rgba(168, 85, 247, 0.04)",
};

const correctPickStyles = {
  outline: "1px solid #4EDB76",
  background: "rgba(78, 219, 118, 0.04)",
};

const wrongPickStyles = {
  outline: "1px solid #ef4444",
  background: "rgba(239, 68, 68, 0.04)",
};

const GameTeam = ({
  isPicked,
  isCorrectPick,
  readonly,
  color,
  score,
  alternateColor,
  handlePick,
  name,
  isHome,
  record,
  abbreviation,
  showScore,
  testId,
}: TeamProps) => {
  let styles = {};
  let displayColor = isHome ? color : alternateColor;

  if (abbreviation === "NYJ") {
    displayColor = color;
  }

  if (abbreviation === "IND") {
    displayColor = color;
  }

  if (abbreviation === "ARI") {
    displayColor = color;
  }

  if (isPicked && isCorrectPick === undefined) {
    styles = pickedStyles;
  } else if (isCorrectPick !== undefined) {
    styles = isCorrectPick ? correctPickStyles : wrongPickStyles;
  }

  return (
    <div
      data-testid={testId}
      onClick={() => (readonly ? null : handlePick())}
      style={styles}
      className="shadow-[0_0_4px_0_rgba(0,0,0,0.1)] w-[49%] px-2 py-4 rounded-md flex items-center justify-between text-xs"
    >
      <div className="flex items-center">
        <p style={{ color: displayColor }} className="w-24">
          {abbreviation}{" "}
          <span className="font-bold text-[0.85rem]">{name}</span>
        </p>
        <p className="text-xs text-gray-400 text-center ml-1 min-w-fit">
          ({record.wins} - {record.losses})
        </p>
      </div>
      {showScore ? (
        <p
          className="mr-2 font-bold text-purple-500 text-center"
          data-testid={isHome ? "homeTeamScore" : "awayTeamScore"}
        >
          {score}
        </p>
      ) : null}
    </div>
  );
};

export { GameTeam };

import { Competitors } from "../../types/Competitors";

type TeamProps = Competitors & {
  showScore?: string;
  isPicked?: boolean;
  score?: string;
  isCorrectPick?: boolean;
  readonly: boolean;
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
  background: "rgb(239, 68, 68, 0.04)",
};

const NewTeam = ({
  isPicked,
  isCorrectPick,
  readonly,
  color,
  alternateColor,
  handlePick,
  name,
  isHome,
  record,
  abbreviation,
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
      onClick={() => (readonly ? null : handlePick())}
      style={styles}
      className="shadow-[0_0_4px_0_rgba(0,0,0,0.1)] w-[49%] px-3 py-4 rounded-md flex items-center text-sm justify-start"
    >
      <p style={{ color: displayColor }}>
        {abbreviation} <span className="font-bold">{name}</span>
      </p>
      <p className="text-xs text-gray-400 text-center ml-1">
        ({record.wins} - {record.loses})
      </p>
    </div>
  );
};

export { NewTeam };

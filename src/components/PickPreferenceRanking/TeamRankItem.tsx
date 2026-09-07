import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type RankableTeam = {
  abbreviation: string;
  color: string;
  name: string;
};

const TeamRankItem = ({ team, rank }: { team: RankableTeam; rank: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: team.abbreviation });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`team-rank-item-${team.abbreviation}`}
      className={`flex items-center justify-between w-full px-3 py-3 mb-2 rounded-md bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.1)] ${
        isDragging ? "opacity-50 z-10" : ""
      }`}
    >
      <div className="flex items-center">
        <p className="w-7 text-center text-sm font-bold text-purple-500">
          {rank}
        </p>
        <p style={{ color: team.color }} className="ml-2 w-14 font-semibold">
          {team.abbreviation}
        </p>
        <p className="text-sm" style={{ color: team.color }}>
          {team.name}
        </p>
      </div>
      <div
        {...attributes}
        {...listeners}
        data-testid={`drag-handle-${team.abbreviation}`}
        className="touch-none px-2 py-1 cursor-grab active:cursor-grabbing"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="6" r="1.5" fill="#9ca3af" />
          <circle cx="16" cy="6" r="1.5" fill="#9ca3af" />
          <circle cx="8" cy="12" r="1.5" fill="#9ca3af" />
          <circle cx="16" cy="12" r="1.5" fill="#9ca3af" />
          <circle cx="8" cy="18" r="1.5" fill="#9ca3af" />
          <circle cx="16" cy="18" r="1.5" fill="#9ca3af" />
        </svg>
      </div>
    </div>
  );
};

export { TeamRankItem };

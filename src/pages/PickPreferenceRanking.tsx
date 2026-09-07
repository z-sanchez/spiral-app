import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PageLayout } from "../layouts/PageLayout";
import { SectionLabel } from "../components/SectionLabel";
import { FormButton } from "../components/Form/FormButton";
import {
  RankableTeam,
  TeamRankItem,
} from "../components/PickPreferenceRanking/TeamRankItem";
import { usePicks } from "../hooks/usePicks";

const DEFAULT_TEAM_ORDER: RankableTeam[] = [
  { abbreviation: "SEA", color: "#002a5c", name: "Seahawks" },
  { abbreviation: "NE", color: "#002a5c", name: "Patriots" },
  { abbreviation: "LAR", color: "#003594", name: "Rams" },
  { abbreviation: "SF", color: "#aa0000", name: "49ers" },
  { abbreviation: "CIN", color: "#fb4f14", name: "Bengals" },
  { abbreviation: "TB", color: "#bd1c36", name: "Buccaneers" },
  { abbreviation: "DET", color: "#0076b6", name: "Lions" },
  { abbreviation: "NO", color: "#d3bc8d", name: "Saints" },
  { abbreviation: "TEN", color: "#4495d2", name: "Titans" },
  { abbreviation: "NYJ", color: "#115740", name: "Jets" },
  { abbreviation: "IND", color: "#003b75", name: "Colts" },
  { abbreviation: "BAL", color: "#29126f", name: "Ravens" },
  { abbreviation: "PIT", color: "#000000", name: "Steelers" },
  { abbreviation: "ATL", color: "#a71930", name: "Falcons" },
  { abbreviation: "CAR", color: "#0085ca", name: "Panthers" },
  { abbreviation: "CHI", color: "#0b1c3a", name: "Bears" },
  { abbreviation: "JAX", color: "#007487", name: "Jaguars" },
  { abbreviation: "CLE", color: "#472a08", name: "Browns" },
  { abbreviation: "HOU", color: "#021018", name: "Texans" },
  { abbreviation: "BUF", color: "#00338d", name: "Bills" },
  { abbreviation: "LV", color: "#000000", name: "Raiders" },
  { abbreviation: "MIA", color: "#008e97", name: "Dolphins" },
  { abbreviation: "MIN", color: "#4f2683", name: "Vikings" },
  { abbreviation: "GB", color: "#204e32", name: "Packers" },
  { abbreviation: "PHI", color: "#06424d", name: "Eagles" },
  { abbreviation: "WSH", color: "#5a1414", name: "Commanders" },
  { abbreviation: "LAC", color: "#0080c6", name: "Chargers" },
  { abbreviation: "ARI", color: "#a40227", name: "Cardinals" },
  { abbreviation: "NYG", color: "#003c7f", name: "Giants" },
  { abbreviation: "DAL", color: "#002a5c", name: "Cowboys" },
  { abbreviation: "KC", color: "#e31837", name: "Chiefs" },
  { abbreviation: "DEN", color: "#0a2343", name: "Broncos" },
];

export const PickPreferenceRankingPage = () => {
  const navigate = useNavigate();
  const { userPicks, updatePickPreferenceRanking } = usePicks({});
  const [teams, setTeams] = useState<RankableTeam[]>(DEFAULT_TEAM_ORDER);

  // seed the list order from any previously saved ranking once picks load
  useEffect(() => {
    const savedRanking = userPicks?.pickPreferenceRanking;
    if (!savedRanking || Object.keys(savedRanking).length === 0) return;

    const teamsByAbbreviation = new Map(
      DEFAULT_TEAM_ORDER.map((team) => [team.abbreviation, team]),
    );

    const orderedTeams = Object.keys(savedRanking)
      .sort((a, b) => savedRanking[a] - savedRanking[b])
      .map((abbreviation) => teamsByAbbreviation.get(abbreviation))
      .filter((team): team is RankableTeam => Boolean(team));

    if (orderedTeams.length === DEFAULT_TEAM_ORDER.length) {
      setTeams(orderedTeams);
    }
  }, [userPicks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTeams((prev) => {
      const oldIndex = prev.findIndex(
        (team) => team.abbreviation === active.id,
      );
      const newIndex = prev.findIndex((team) => team.abbreviation === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSubmit = async () => {
    const ranking = teams.reduce<{ [key: string]: number }>(
      (acc, team, index) => {
        acc[team.abbreviation] = index + 1;
        return acc;
      },
      {},
    );

    const success = await updatePickPreferenceRanking(ranking);
    if (success) navigate("/");
  };

  return (
    <PageLayout>
      <SectionLabel label="Pick Preference Ranking" />
      <p className="text-sm text-gray-500">
        Drag and drop your teams from most to least preferred. If you ever
        forget to make a pick, we'll automatically use your highest-ranked team
        in that matchup. You can change these rankings anytime in profile
        settings.
        <span className="font-bold">
          DON'T FORGET TO SAVE YOUR RANKINGS AT THE BOTTOM OF THE PAGE!
        </span>
      </p>
      <div className="mt-4 mb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={teams.map((team) => team.abbreviation)}
            strategy={verticalListSortingStrategy}
          >
            {teams.map((team, index) => (
              <TeamRankItem
                key={team.abbreviation}
                team={team}
                rank={index + 1}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <FormButton text="Save Rankings" onClick={() => handleSubmit()} />
    </PageLayout>
  );
};

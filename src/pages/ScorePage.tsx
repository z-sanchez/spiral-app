import { LeaderboardLine } from "../components/LeaderboardLine";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
import { User } from "../types/User";

const testTabs = [
  { id: "weekly", text: "Week 1 Picks", active: true },
  { id: "all-time", text: "All Time", active: false },
];

const testPlayers: User[] = [
  {
    username: "Bruhdot777",
    color: "#4ea5fc",
    iconCharacter: "Z",
    record: {
      wins: 7,
      loses: 3,
      ties: 0,
    },
    id: "12",
    roi: 345,
    picks: [],
  },
  {
    username: "Test User",
    color: "#f44efc",
    iconCharacter: "T",
    record: {
      wins: 7,
      loses: 3,
      ties: 0,
    },
    id: "13",
    roi: 345,
    picks: [],
  },
];
const ScorePage = () => {
  return (
    <>
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={testTabs}></Tabs>
        </div>
        <WeekSelector activeWeekNumber={3} />
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard wins="7" loses="3" roi="+723" roiStyle="text-green-500" />
        <SectionLabel label={"League Scores"}></SectionLabel>
        <div className="flex w-full items-center justify-center flex-col">
          {testPlayers.map((player) => {
            return <LeaderboardLine {...player} key={player.id} />;
          })}
        </div>
      </PageLayout>
    </>
  );
};

export { ScorePage };

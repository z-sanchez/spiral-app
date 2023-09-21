import { useState } from "react";
// import { LeaderboardLine } from "../components/LeaderboardLine";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
// import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
// import { User } from "../types/User";
import { usePicks } from "../hooks/usePicks";
import { LeaderboardLine } from "../components/LeaderboardLine";

const testPlayers = [
  {
    record: {
      wins: 12,
      loses: 4,
      ties: 0,
    },
    roi: 1,
    iconCharacter: "R",
    username: "Rick",
    color: "#A855F7",
    id: "rick",
    photoURL: "",
  },
  {
    record: {
      wins: 10,
      loses: 6,
      ties: 0,
    },
    roi: 2,
    iconCharacter: "B",
    username: "Bella",
    color: "#A855F7",
    id: "bella",
    photoURL: "",
  },
  {
    record: {
      wins: 10,
      loses: 6,
      ties: 0,
    },
    roi: 2,
    iconCharacter: "S",
    username: "Sam",
    color: "#A855F7",
    id: "sam",
    photoURL: "",
  },
  {
    record: {
      wins: 9,
      loses: 7,
      ties: 0,
    },
    roi: 3,
    iconCharacter: "Z",
    username: "Ziek",
    color: "#A855F7",
    id: "ziek",
    photoURL: "",
  },
  {
    record: {
      wins: 9,
      loses: 7,
      ties: 0,
    },
    roi: 3,
    iconCharacter: "A",
    username: "Amanda",
    color: "#A855F7",
    id: "amanda",
    photoURL: "",
  },
];
const ScorePage = () => {
  const { getUserRank, allTimeRecord, getCurrentWeekRecord } = usePicks();

  const tabs = [
    { id: "weekly", text: "Week 3 Picks", active: true },
    { id: "all-time", text: "All Time", active: false },
  ];
  const [tabData, setTabData] = useState(tabs);
  const activeTab = tabData.find(({ active }) => active);

  const { wins, loses } =
    activeTab?.id === "all-time" ? allTimeRecord : getCurrentWeekRecord();

  const handleTabClick = (selectedTabId: string) => {
    const newTabs = tabData.map((tab) => {
      if (tab.id === selectedTabId) {
        return { ...tab, active: true };
      }

      return {
        ...tab,
        active: false,
      };
    });

    setTabData(newTabs);
  };

  return (
    <>
      <PageLayout>
        <div className="flex justify-center">
          <Tabs
            tabs={tabData}
            onTabChange={(selectedTabId: string) =>
              handleTabClick(selectedTabId)
            }
          ></Tabs>
        </div>
        {/* <WeekSelector activeWeekNumber={3} /> */}
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard
          wins={String(wins)}
          loses={String(loses)}
          rank={String(getUserRank())}
          rankStyle="text-green-500"
        />
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

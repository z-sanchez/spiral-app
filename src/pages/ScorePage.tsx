import { useState } from "react";
// import { LeaderboardLine } from "../components/LeaderboardLine";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
// import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
// import { User } from "../types/User";
import { usePicks } from "../hooks/usePicks";

const testTabs = [
  { id: "weekly", text: "Week 2 Picks", active: true },
  { id: "all-time", text: "All Time", active: false },
];

// const testPlayers: User[] = [];
const ScorePage = () => {
  const [tabData, setTabData] = useState(testTabs);
  const { roi, allTimeRecord, getCurrentWeekRecord } = usePicks();
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
          roi={String(roi)}
          roiStyle="text-green-500"
        />
        <SectionLabel label={"League Scores"}></SectionLabel>
        <div className="flex w-full items-center justify-center flex-col">
          {/* {testPlayers.map((player) => {
            return <LeaderboardLine {...player} key={player.id}  />;
          })} */}
        </div>
      </PageLayout>
    </>
  );
};

export { ScorePage };

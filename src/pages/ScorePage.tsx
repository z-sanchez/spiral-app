import { useState } from "react";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
// import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
import { usePicks } from "../hooks/usePicks";
import { LeaderboardLine } from "../components/LeaderboardLine";
import { useGameSchedule } from "../hooks/useGameSchedule";

const ScorePage = () => {
  const {
    getUserAllTimeRank,
    allTimeRecord,
    getCurrentWeekRecord,
    getUserWeekRank,
    getGroupUsersRankedByCurrentWeek,
    getGroupUsersRankedByAllTime,
  } = usePicks();
  const { currentWeekNumber } = useGameSchedule();
  const tabs = [
    { id: "weekly", text: `Week ${currentWeekNumber} Picks`, active: true },
    { id: "all-time", text: "All Time", active: false },
  ];
  const [tabData, setTabData] = useState(tabs);
  const activeTab = tabData.find(({ active }) => active);
  const isAllTime = activeTab?.id === "all-time";

  const groupRanked = isAllTime
    ? getGroupUsersRankedByAllTime()
    : getGroupUsersRankedByCurrentWeek();

  const { wins, loses } = isAllTime ? allTimeRecord : getCurrentWeekRecord();

  const rank = isAllTime ? getUserAllTimeRank() : getUserWeekRank();

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
          rank={String(rank)}
          rankStyle="text-green-500"
        />
        <SectionLabel label={"League Scores"}></SectionLabel>
        <div className="flex w-full items-center justify-center flex-col">
          {groupRanked.map((player) => {
            return (
              <LeaderboardLine
                allTime={isAllTime}
                {...player}
                key={player.id}
              />
            );
          })}
        </div>
      </PageLayout>
    </>
  );
};

export { ScorePage };

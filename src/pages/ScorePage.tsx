import { useState } from "react";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
// import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
import { usePicks } from "../hooks/usePicks";
import { LeaderboardLine } from "../components/LeaderboardLine";
import { useGameSchedule } from "../hooks/useGameSchedule";
import { Collapse } from "@mui/material";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";

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
    // { id: "all-time", text: "All-Time", active: false },
  ];
  const [tabData, setTabData] = useState(tabs);
  const [showEmojiGuide, setShowEmojiGuide] = useState(false);
  const activeTab = tabData.find(({ active }) => active);
  const isAllTime = activeTab?.id === "all-time";

  const groupRankedForAllTime = getGroupUsersRankedByAllTime();

  const groupRankedForWeek = getGroupUsersRankedByCurrentWeek();

  const selectedGroupRank = isAllTime
    ? groupRankedForAllTime
    : groupRankedForWeek;

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
          {selectedGroupRank.map((player) => {
            const allTimeRank = groupRankedForAllTime.find(
              ({ id }) => id === player.id
            )?.rank;
            const lastPlace =
              allTimeRank ===
              groupRankedForAllTime[groupRankedForAllTime.length - 1].rank;
            const firstPlace =
              groupRankedForAllTime.find(({ id }) => id === player.id)?.rank ===
              1;

            return (
              <LeaderboardLine
                {...player}
                key={player.id}
                lastPlace={lastPlace}
                allTimeLeader={firstPlace}
                increaseIcon={
                  !isAllTime
                    ? player.rankingNotifications?.weekRankIncreased
                    : false
                }
                decreaseIcon={
                  !isAllTime
                    ? player.rankingNotifications?.weekRankDecreased
                    : false
                }
                hotStreakIcon={
                  !isAllTime
                    ? player.rankingNotifications?.isHotWeekStreak
                    : false
                }
                bronzeMedalIcon={player.rankingNotifications?.bronzeMedal}
                silverMedalIcon={player.rankingNotifications?.silverMedal}
                trophyIcon={player.rankingNotifications?.trophy}
              />
            );
          })}
        </div>
        <div
          className="flex justify-between items-center"
          onClick={() => setShowEmojiGuide((prev) => !prev)}
        >
          <SectionLabel label={"Emoji Guide"}></SectionLabel>
          {showEmojiGuide ? (
            <DownArrowIcon className="fill-purple-500" />
          ) : (
            <UpArrowIcon className="fill-purple-500" />
          )}
        </div>
        <Collapse in={showEmojiGuide}>
          <div className="flex flex-col">
            <p>
              &#128081;
              <span className="text-sm font-light">= All-Time Leader</span>
            </p>
            <p>
              &#128293;
              <span className="text-sm font-light">
                = 1st place for two weeks or more
              </span>
            </p>
            <p>
              &#129353;
              <span className="text-sm font-light">= All-Time 3rd Place</span>
            </p>
            <p>
              &#129352;
              <span className="text-sm font-light">= All-Time 2nd Place</span>
            </p>
            <p>
              &#127942;
              <span className="text-sm font-light">= Last Week Winner</span>
            </p>
            <p>
              &#128546;
              <span className="text-sm font-light">= All-Time Last Place</span>
            </p>
          </div>
        </Collapse>
      </PageLayout>
    </>
  );
};

export { ScorePage };

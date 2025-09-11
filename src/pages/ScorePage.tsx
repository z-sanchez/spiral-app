import { useState } from "react";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
// import { WeekSelector } from "../components/WeekSelector";
import { PageLayout } from "../layouts/PageLayout";
import { LeaderboardLine } from "../components/LeaderboardLine";
import { useGameSchedule } from "../hooks/useGameSchedule";
import { Collapse } from "@mui/material";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { useLeague } from "../hooks/useLeague";
import { UserStanding } from "../types/Firebase";

const ScorePage = () => {
  const { currentWeekNumber } = useGameSchedule();
  const {
    userAllTimeRecord,
    userCurrentWeekRecord,
    userAllTimeRank,
    userCurrentWeekRank,
    allTimeStandings,
    currentWeekStandings,
  } = useLeague();
  const tabs = [
    { id: "weekly", text: `Week ${currentWeekNumber} Picks`, active: true },
    { id: "all-time", text: "All-Time", active: false },
  ];
  const [tabData, setTabData] = useState(tabs);
  const [showEmojiGuide, setShowEmojiGuide] = useState(false);
  const activeTab = tabData.find(({ active }) => active);
  const isAllTime = activeTab?.id === "all-time";

  const wins = isAllTime
    ? userAllTimeRecord?.wins
    : userCurrentWeekRecord?.wins;
  const loses = isAllTime
    ? userAllTimeRecord?.losses
    : userCurrentWeekRecord?.losses;
  const rank = isAllTime ? userAllTimeRank : userCurrentWeekRank;

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

  const standings: UserStanding[] = isAllTime
    ? allTimeStandings
    : currentWeekStandings;

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
          {standings
            .sort((a, b) => b.record.wins - a.record.wins)
            .map((player) => {
              const lastPlace = standings.every(
                (p) => p.record.wins >= player.record.wins
              );

              const firstPlace = player.rank === 1;

              return (
                <LeaderboardLine
                  key={player.id}
                  lastPlace={lastPlace}
                  record={player.record}
                  username={player.name}
                  rank={player.rank}
                  color={player.color}
                  iconCharacter={player.name.charAt(0).toUpperCase()}
                  allTimeLeader={firstPlace}
                  increaseIcon={false}
                  decreaseIcon={false}
                  hotStreakIcon={false}
                  bronzeMedalIcon={false}
                  silverMedalIcon={false}
                  trophyIcon={false}
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

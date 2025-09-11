import { Game } from "../components/Game/Game";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { ReactComponent as LockIcon } from "../assets/icons/lock.svg";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { useGameSchedule } from "../hooks/useGameSchedule";
import { Competitors } from "../types/Competitors";
import { usePicks } from "../hooks/usePicks";
import { getAwayTeam, getHomeTeam } from "../utils/helpers/espn/getTeam";
import { getGameWinner } from "../utils/helpers/espn/getGameWinner";
import { SectionIndicator } from "../components/SectionIndicator";
import { format } from "date-fns";
import { useLeague } from "../hooks/useLeague";

const HomePage = () => {
  const {
    currentWeekId,
    completedGames,
    currentWeekNumber,
    activeGameScheduleInDays,
    isLoading,
    currentWeeksGames,
  } = useGameSchedule();
  const { makePick, numberOfPicksMadeThisWeek, currentWeekPicks } = usePicks({
    weekId: currentWeekId,
  });
  const {
    isLoading: isLoadingLeague,
    userCurrentWeekRank,
    userCurrentWeekRecord,
  } = useLeague();

  const tabs = [
    { id: "weekly", text: `Week ${currentWeekNumber} Picks`, active: true },
  ];

  const [showFinishedGames, setShowFinishedGames] = useState(true);

  if (isLoading || isLoadingLeague) {
    return null;
  }

  const missingPicksTotal = Math.abs(
    currentWeeksGames.length - numberOfPicksMadeThisWeek
  );

  return (
    <>
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={tabs} onTabChange={() => null}></Tabs>
        </div>
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard
          wins={
            userCurrentWeekRecord ? String(userCurrentWeekRecord.wins) : "0"
          }
          loses={
            userCurrentWeekRecord ? String(userCurrentWeekRecord.losses) : "0"
          }
          rank={userCurrentWeekRank ? String(userCurrentWeekRank) : "0"}
          rankStyle="text-green-500"
        />
        <div className="flex justify-between">
          <SectionLabel label={"Games"}></SectionLabel>
          {missingPicksTotal ? (
            <SectionIndicator
              text={`${missingPicksTotal} Picks Missing`}
              backgroundColor={"#f44336"}
            />
          ) : (
            <p className="text-green-500 text-xs self-center font-medium">
              All Picks Submitted!
            </p>
          )}
        </div>
        {activeGameScheduleInDays.map(({ date, games }) => {
          const dateObject = new Date(date);
          const dateLabel =
            format(dateObject, "P") + " " + format(dateObject, "p");
          const isLive = dateObject < new Date();
          return (
            <div key={dateLabel}>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 mb-2 mt-4 text-xs font-medium">
                  {dateLabel}
                </p>
                {isLive ? (
                  <LockIcon className="fill-purple-500 h-5 w-5" />
                ) : null}
              </div>
              {games.map((game) => {
                const homeTeam = game.competitors.find(({ isHome }) => isHome);
                const awayTeam = game.competitors.find(({ isHome }) => !isHome);
                const isLive = new Date(game.date) < new Date();
                const userPick = currentWeekPicks?.[game.id] || null;

                return (
                  <Game
                    key={game.id}
                    gameId={game.id}
                    homeTeam={{
                      ...(homeTeam as Competitors),
                      isPicked: userPick === homeTeam?.abbreviation,
                    }}
                    awayTeam={{
                      ...(awayTeam as Competitors),
                      isPicked: userPick === awayTeam?.abbreviation,
                    }}
                    showScores={isLive}
                    readonly={isLive}
                    onPick={(teamPick: string) => {
                      if (isLive) {
                        return new Promise((resolve) => resolve(false));
                      }
                      return makePick(currentWeekId, game.id, teamPick);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        {completedGames.length ? (
          <>
            <div
              className="flex w-full items-center justify-center"
              onClick={() => setShowFinishedGames((prev) => !prev)}
            >
              <SectionLabel label="Finished Games" />{" "}
              {showFinishedGames ? (
                <DownArrowIcon className="fill-purple-500" />
              ) : (
                <UpArrowIcon className="fill-purple-500" />
              )}
            </div>
            <Collapse in={showFinishedGames}>
              {completedGames.map((game) => {
                const homeTeam = getHomeTeam(game) as Competitors;
                const awayTeam = getAwayTeam(game) as Competitors;

                const userPick = currentWeekPicks?.[game.id] || null;

                const gameWinner = getGameWinner(game);

                return (
                  <Game
                    showResults={true}
                    showScores={true}
                    correctPick={
                      (gameWinner && userPick === gameWinner?.abbreviation) ||
                      !gameWinner
                        ? true
                        : false
                    }
                    gameId={game.id}
                    key={game.id}
                    homeTeam={{
                      ...homeTeam,
                      isPicked: userPick === homeTeam.abbreviation,
                    }}
                    awayTeam={{
                      ...awayTeam,
                      isPicked: userPick === awayTeam.abbreviation,
                    }}
                    onPick={() => new Promise((resolve) => resolve(false))}
                    readonly={true}
                  />
                );
              })}
            </Collapse>
          </>
        ) : null}
      </PageLayout>
    </>
  );
};

export { HomePage };

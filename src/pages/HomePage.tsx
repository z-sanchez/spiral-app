import { Game } from "../components/Game/Game";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";
import { ReactComponent as UpArrowIcon } from "../assets/icons/up-arrow.svg";
import { useState } from "react";
import { Collapse } from "@mui/material";
import { useGameSchedule } from "../hooks/useGameSchedule";
import { Competitors } from "../types/Competitors";
import { GamePicker } from "../components/GamePicker/GamePicker";
import { getAwayTeam, getHomeTeam } from "../utils/helpers/espn/getTeam";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

const HomePage = () => {
  const { getCurrentScheduleData, currentWeeksGames } = useGameSchedule();

  const [showFinishedGames, setShowFinishedGames] = useState(true);
  const [gamePickerData, setGamePickerData] = useState<{
    active: boolean;
    homeTeam: Competitors | null;
    awayTeam: Competitors | null;
  }>({
    active: true,
    homeTeam: getHomeTeam(currentWeeksGames[5]),
    awayTeam: getAwayTeam(currentWeeksGames[5]),
  });

  console.log({
    schedule: getCurrentScheduleData(),
    currentWeeksGames,
    gamePickerData,
    env: import.meta.env.VITE_TEST_VARIABLE,
  });

  const activeGames = currentWeeksGames.filter(({ completed }) => !completed);

  const completedGames = currentWeeksGames.filter(({ completed }) => completed);

  return (
    <>
      {gamePickerData.active ? (
        <GamePicker
          homeTeam={gamePickerData?.homeTeam as Competitors}
          awayTeam={gamePickerData?.awayTeam as Competitors}
          handleClose={() => {
            setGamePickerData({
              active: false,
              homeTeam: null,
              awayTeam: null,
            });
          }}
        ></GamePicker>
      ) : null}
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={testTabs}></Tabs>
        </div>
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard wins="7" loses="3" roi="+723" roiStyle="text-green-500" />
        <SectionLabel label={"Games"}></SectionLabel>
        {activeGames.map((game) => {
          const homeTeam = game.competitors.find(({ isHome }) => isHome);
          const awayTeam = game.competitors.find(({ isHome }) => !isHome);
          const isLive = !game.completed && new Date(game.date) < new Date();

          return (
            <Game
              key={game.id}
              homeTeam={{ ...(homeTeam as Competitors), pick: true }}
              awayTeam={awayTeam as Competitors}
              live={isLive}
              lock={isLive}
              handleClick={() => {
                setGamePickerData({
                  active: true,
                  awayTeam: awayTeam as Competitors,
                  homeTeam: homeTeam as Competitors,
                });
              }}
            />
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
                const homeTeam = game.competitors.find(({ isHome }) => isHome);
                const awayTeam = game.competitors.find(({ isHome }) => !isHome);

                return (
                  <Game
                    key={game.id}
                    homeTeam={homeTeam as Competitors}
                    awayTeam={awayTeam as Competitors}
                    handleClick={() => null}
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

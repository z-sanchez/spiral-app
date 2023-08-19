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
// import { GamePicker } from "../components/GamePicker/GamePicker";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

// const homeTeam: Team & { score?: string; pick?: boolean } = {
//   abbreviation: "DAL",
//   id: "1",
//   name: "Cowboys",
//   color: "#2A6499",
//   alternateColor: "#2A6499",
//   location: "Dallas",
//   score: "7",
//   pick: true,
// };

// const awayTeam: Team & { score?: string; pick?: boolean } = {
//   abbreviation: "PHI",
//   id: "2",
//   name: "Eagles",
//   color: "#235703",
//   alternateColor: "#235703",
//   location: "Philedelphia",
//   score: "14",
//   pick: false,
// };

const HomePage = () => {
  const [showFinishedGames, setShowFinishedGames] = useState(true);

  const { getCurrentScheduleData, currentWeeksGames } = useGameSchedule();

  console.log({
    schedule: getCurrentScheduleData(),
    currentWeeksGames,
  });

  return (
    <>
      {/* <GamePicker></GamePicker> */}
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={testTabs}></Tabs>
        </div>
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard wins="7" loses="3" roi="+723" roiStyle="text-green-500" />
        <SectionLabel label={"Games"}></SectionLabel>
        {currentWeeksGames
          .filter(({ completed }) => !completed)
          .map((game) => {
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
              />
            );
          })}
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
          {currentWeeksGames
            .filter(({ completed }) => completed)
            .map((game) => {
              const homeTeam = game.competitors.find(({ isHome }) => isHome);
              const awayTeam = game.competitors.find(({ isHome }) => !isHome);

              return (
                <Game
                  key={game.id}
                  homeTeam={homeTeam as Competitors}
                  awayTeam={awayTeam as Competitors}
                />
              );
            })}
        </Collapse>
      </PageLayout>
    </>
  );
};

export { HomePage };

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
import { usePicks } from "../hooks/usePicks";
import { getPick } from "../utils/helpers/espn/getPick";
import { NO_PICK } from "../utils/constants";
import { useLocation } from "react-router-dom";

const testTabs = [{ id: "weekly", text: "Week 2 Picks", active: true }];

type GamePickerDataType = {
  gameId: string;
  active: boolean;
  homeTeam: (Competitors & { pick?: boolean }) | null;
  awayTeam: (Competitors & { pick?: boolean }) | null;
};

const HomePage = () => {
  const { state } = useLocation();
  const { currentWeeksGames, currentWeekId } = useGameSchedule();
  const { makePick, picks, getCurrentWeekRecord, roi } = usePicks();
  const makeContinuousPick = state?.makePicks || false;

  const [showFinishedGames, setShowFinishedGames] = useState(true);
  const [gamePickerData, setGamePickerData] = useState<GamePickerDataType>(
    () => {
      const weekPicks = picks.find((week) => week.id === currentWeekId);

      const nextGameId = weekPicks
        ? (weekPicks?.games.find((game) => game.pick === NO_PICK)?.id as string)
        : currentWeeksGames[0]?.id;

      if (!makeContinuousPick || (!nextGameId && weekPicks)) {
        return {
          gameId: "",
          active: false,
          homeTeam: null,
          awayTeam: null,
        };
      }

      const gameData = currentWeeksGames.find((game) => game.id === nextGameId);
      const homeTeam = gameData?.competitors.find(({ isHome }) => isHome);
      const awayTeam = gameData?.competitors.find(({ isHome }) => !isHome);

      return {
        gameId: nextGameId,
        active: true,
        awayTeam: {
          ...(awayTeam as Competitors),
          pick: false,
        },
        homeTeam: {
          ...(homeTeam as Competitors),
          pick: false,
        },
      };
    }
  );

  const activeGames = currentWeeksGames.filter(({ completed }) => !completed);

  const completedGames = currentWeeksGames.filter(({ completed }) => completed);

  const handleMakePick = (pick: string) => {
    const homeTeamData = {
      ...gamePickerData.homeTeam,
    } as Competitors & { pick?: boolean };
    const awayTeamData = {
      ...gamePickerData.awayTeam,
    } as Competitors & { pick?: boolean };
    makePick(gamePickerData.gameId, pick);
    setGamePickerData({
      ...gamePickerData,
      homeTeam: {
        ...homeTeamData,
        pick: pick === gamePickerData.homeTeam?.abbreviation,
      },
      awayTeam: {
        ...awayTeamData,
        pick: pick === gamePickerData.awayTeam?.abbreviation,
      },
    });
  };

  const handleContinuousPick = (pick: string) => {
    makePick(gamePickerData.gameId, pick);

    const weekPicks = picks.find((week) => week.id === currentWeekId);

    const nextGameId = weekPicks
      ? (weekPicks?.games.find(
          (game) => game.pick === NO_PICK && game.id !== gamePickerData.gameId
        )?.id as string)
      : currentWeeksGames.find(
          (weekGame) => weekGame.id !== gamePickerData.gameId
        )?.id;

    if (!nextGameId) {
      setGamePickerData({
        gameId: "",
        active: false,
        homeTeam: null,
        awayTeam: null,
      });
      return;
    }

    const gameData = currentWeeksGames.find((game) => game.id === nextGameId);
    const homeTeam = gameData?.competitors.find(({ isHome }) => isHome);
    const awayTeam = gameData?.competitors.find(({ isHome }) => !isHome);

    setGamePickerData({
      gameId: nextGameId,
      active: true,
      awayTeam: {
        ...(awayTeam as Competitors),
        pick: false,
      },
      homeTeam: {
        ...(homeTeam as Competitors),
        pick: false,
      },
    });
  };

  return (
    <>
      {gamePickerData.active ? (
        <GamePicker
          gameId={gamePickerData.gameId}
          homeTeam={gamePickerData?.homeTeam as Competitors}
          awayTeam={gamePickerData?.awayTeam as Competitors}
          handleClose={() => {
            setGamePickerData({
              gameId: "",
              active: false,
              homeTeam: null,
              awayTeam: null,
            });
          }}
          onPick={(pick) => {
            makeContinuousPick
              ? handleContinuousPick(pick)
              : handleMakePick(pick);
          }}
        ></GamePicker>
      ) : null}
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={testTabs} onTabChange={() => null}></Tabs>
        </div>
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard
          wins={String(getCurrentWeekRecord().wins)}
          loses={String(getCurrentWeekRecord().loses)}
          roi={String(roi)}
          roiStyle="text-green-500"
        />
        <SectionLabel label={"Games"}></SectionLabel>
        {activeGames.map((game) => {
          const homeTeam = game.competitors.find(({ isHome }) => isHome);
          const awayTeam = game.competitors.find(({ isHome }) => !isHome);
          const isLive = !game.completed && new Date(game.date) < new Date();
          const userPick = getPick(currentWeekId, game.id, picks);

          return (
            <Game
              key={game.id}
              gameId={game.id}
              homeTeam={{
                ...(homeTeam as Competitors),
                pick: userPick === homeTeam?.abbreviation,
              }}
              awayTeam={{
                ...(awayTeam as Competitors),
                pick: userPick === awayTeam?.abbreviation,
              }}
              live={isLive}
              lock={isLive}
              onClick={() => {
                setGamePickerData({
                  gameId: game.id,
                  active: true,
                  awayTeam: {
                    ...(awayTeam as Competitors),
                    pick: userPick === awayTeam?.abbreviation,
                  },
                  homeTeam: {
                    ...(homeTeam as Competitors),
                    pick: userPick === homeTeam?.abbreviation,
                  },
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
                    gameId={game.id}
                    key={game.id}
                    homeTeam={homeTeam as Competitors}
                    awayTeam={awayTeam as Competitors}
                    onClick={() => null}
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

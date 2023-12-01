import { Game } from "../components/Game/Game";
import { NewGame } from "../components/Game/NewGame";
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
import { getAwayTeam, getHomeTeam } from "../utils/helpers/espn/getTeam";
import { getGameWinner } from "../utils/helpers/espn/getGameWinner";
import { SectionIndicator } from "../components/SectionIndicator";

type GamePickerDataType = {
  gameId: string;
  active: boolean;
  homeTeam: (Competitors & { pick?: boolean }) | null;
  awayTeam: (Competitors & { pick?: boolean }) | null;
  makeContinuousPick: boolean;
};

const HomePage = () => {
  const { state } = useLocation();
  const {
    currentWeeksGames,
    currentWeekId,
    activeGames,
    completedGames,
    gamesNotStarted,
    currentWeekNumber,
  } = useGameSchedule();
  const {
    makePick,
    picks,
    getCurrentWeekRecord,
    currentWeekPicks,
    getUserWeekRank,
    getNumberOfPicksMissing,
  } = usePicks();

  const numberOfPicksNeeded = getNumberOfPicksMissing();

  const tabs = [
    { id: "weekly", text: `Week ${currentWeekNumber} Picks`, active: true },
  ];

  const [showFinishedGames, setShowFinishedGames] = useState(true);
  const [gamePickerData, setGamePickerData] = useState<GamePickerDataType>(
    () => {
      const nextGameId =
        gamesNotStarted.find(
          ({ id }) =>
            currentWeekPicks &&
            currentWeekPicks?.games.find(
              (currentPick) =>
                currentPick.id === id && currentPick.pick === NO_PICK
            )
        )?.id || "";

      //no flag to make continuous pick on render or no gameId found while picks array is present
      if (!state?.makePicks || (!nextGameId && currentWeekPicks)) {
        return {
          gameId: "",
          active: false,
          homeTeam: null,
          awayTeam: null,
          makeContinuousPick: state?.makePicks || false,
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
        makeContinuousPick: true,
      };
    }
  );

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
      makeContinuousPick: false,
    });
  };

  const handleContinuousPick = (pick: string) => {
    makePick(gamePickerData.gameId, pick);

    const nextGameId =
      gamesNotStarted.find(
        ({ id }) =>
          currentWeekPicks &&
          currentWeekPicks?.games.find(
            (currentPick) =>
              currentPick.id === id &&
              currentPick.pick === NO_PICK &&
              gamePickerData.gameId !== id
          )
      )?.id || "";

    if (!nextGameId) {
      setGamePickerData({
        gameId: "",
        active: false,
        homeTeam: null,
        awayTeam: null,
        makeContinuousPick: false,
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
      makeContinuousPick: true,
    });
  };

  return (
    <>
      {gamePickerData.active ? (
        <GamePicker
          makeContinuousPick={gamePickerData.makeContinuousPick}
          gameId={gamePickerData.gameId}
          homeTeam={gamePickerData?.homeTeam as Competitors}
          awayTeam={gamePickerData?.awayTeam as Competitors}
          handleClose={() => {
            setGamePickerData({
              gameId: "",
              active: false,
              homeTeam: null,
              awayTeam: null,
              makeContinuousPick: false,
            });
          }}
          onPick={(pick) => {
            gamePickerData.makeContinuousPick
              ? handleContinuousPick(pick)
              : handleMakePick(pick);
          }}
        ></GamePicker>
      ) : null}
      <PageLayout>
        <div className="flex justify-center">
          <Tabs tabs={tabs} onTabChange={() => null}></Tabs>
        </div>
        <SectionLabel label={"Your Score"}></SectionLabel>
        <Scoreboard
          wins={String(getCurrentWeekRecord().wins)}
          loses={String(getCurrentWeekRecord().loses)}
          rank={String(getUserWeekRank())}
          rankStyle="text-green-500"
        />
        <div className="flex justify-between">
          <SectionLabel label={"Games"}></SectionLabel>
          {numberOfPicksNeeded ? (
            <SectionIndicator
              text={`${numberOfPicksNeeded} Picks Missing`}
              backgroundColor={"#f44336"}
            />
          ) : (
            <p className="text-green-500 text-xs self-center font-medium">
              All Picks Submitted!
            </p>
          )}
        </div>
        {activeGames.map((game) => {
          const homeTeam = game.competitors.find(({ isHome }) => isHome);
          const awayTeam = game.competitors.find(({ isHome }) => !isHome);
          const isLive = !game.completed && new Date(game.date) < new Date();
          const userPick = getPick(currentWeekId, game.id, picks);

          return (
            <NewGame
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
              showScores={false}
              showResults={false}
              readonly={isLive}
              onPick={() => {
                if (isLive) return;
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
                  makeContinuousPick: false,
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
                const homeTeam = getHomeTeam(game) as Competitors;
                const awayTeam = getAwayTeam(game) as Competitors;

                const userPick = getPick(currentWeekId, game.id, picks);

                const gameWinner = getGameWinner(game);

                return (
                  <Game
                    showPickResult={true}
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
                      pick: userPick === homeTeam.abbreviation,
                    }}
                    awayTeam={{
                      ...awayTeam,
                      pick: userPick === awayTeam.abbreviation,
                    }}
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

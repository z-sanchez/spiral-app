import { Game } from "../../types/Game";
import { Picks } from "../../types/Picks";
import { NO_PICK } from "../constants";
import { createEmptyWeekPickObject } from "./firebase/picks";
import { getUserWeekRecord } from "./picksCalculator";
import { recordWinnerOnWeekPicks } from "./recordWinnersOnWeekPicks";

export const updatePicks = ({
  picks,
  weekGames,
  weekId,
  gameId,
  pick,
}: {
  picks: Picks;
  weekGames: Game[];
  weekId: string;
  gameId: string;
  pick: string;
}): Picks => {
  let newPicks = structuredClone(picks);

  const weekExist = picks.find((week) => week.id === weekId);

  if (weekExist) {
    newPicks = newPicks.map((week) => {
      if (week.id !== weekId) return week;

      const newWeek = structuredClone(week);

      const updatedGames = newWeek.games.map((game) => {
        if (game.id !== gameId) return game;

        return {
          ...game,
          pick,
        };
      });

      return {
        ...newWeek,
        games: updatedGames,
      };
    });
  } else {
    newPicks.push({
      id: weekId,
      record: {
        wins: 0,
        loses: 0,
        ties: 0,
      },
      games: weekGames.map((game) => {
        return {
          id: game.id,
          winner: "not completed",
          pick: gameId !== game.id ? NO_PICK : pick,
        };
      }),
      completed: false,
    });
  }

  return newPicks;
};

export const updateAndRecordWeekScoresOnPickObject = ({
  pickObject, //entire pick array
  weekGames, //week games to update
  weekId, // weekId that labels to week games
}: {
  pickObject: Picks;
  weekGames: Game[];
  weekId: string;
}): Picks => {
  let weekPicks =
    pickObject.find((weekPicks) => weekPicks.id === weekId) ||
    createEmptyWeekPickObject({ weekId, weekGames });

  weekPicks = recordWinnerOnWeekPicks({ weekPicks, weekGames });

  weekPicks.record = getUserWeekRecord(weekPicks);

  if (weekPicks.games.every(({ winner }) => winner !== "not completed")) {
    weekPicks.completed = true;
  }

  const newPicks = pickObject.filter((week) => week.id !== weekId);

  newPicks.push(weekPicks);

  return newPicks;
};

import { Game } from "../../types/Game";
import { Picks } from "../../types/Picks";
import { NO_PICK } from "../constants";

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
    });
  }

  return newPicks;
};

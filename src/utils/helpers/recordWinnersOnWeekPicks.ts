import { Game } from "../../types/Game";
import { WeekPicks } from "../../types/Picks";
import { getGameWinner } from "./espn/getGameWinner";

export const recordWinnerOnWeekPicks = ({
  weekPicks,
  weekGames,
}: {
  weekPicks: WeekPicks;
  weekGames: Game[];
}) => {
  const newWeekPicks = structuredClone(weekPicks);

  newWeekPicks.games = newWeekPicks.games.map((game) => {
    const gameData = weekGames.find((gameData) => gameData.id === game.id);

    if (!gameData || !gameData.completed) return game;

    const gameWinner = getGameWinner(gameData);

    return {
      ...game,
      winner: gameWinner ? gameWinner.abbreviation : "TIE",
    };
  });

  return newWeekPicks;
};

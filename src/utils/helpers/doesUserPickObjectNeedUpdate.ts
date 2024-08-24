import { Game } from "../../types/Game";
import { Picks } from "../../types/Picks";
import { getWeekId } from "./espn/getWeekId";

export const doesUserPickObjectNeedUpdate = ({
  latestWeekNumber,
  currentWeekGames,
  userPicks,
  currentYearNumber,
}: {
  latestWeekNumber: number;
  currentWeekGames: Game[];
  userPicks: Picks;
  currentYearNumber: number;
}) => {
  const currentWeekPicks = userPicks.find(
    ({ id }) =>
      id ===
      getWeekId({
        seasontype: 2,
        week: latestWeekNumber,
        year: currentYearNumber,
      })
  );

  if (!currentWeekPicks) {
    return true;
  }

  const currentWeeksPicksUpToDate =
    currentWeekGames.filter(({ completed }) => completed).length !==
    currentWeekPicks?.games.filter(({ winner }) => winner !== "not completed")
      .length;

  return currentWeeksPicksUpToDate;
};

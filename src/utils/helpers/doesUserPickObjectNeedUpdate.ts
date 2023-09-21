import { Game } from "../../types/Game";
import { Picks, WeekPicks } from "../../types/Picks";
import { getWeekId } from "./espn/getWeekId";

export const doesUserPickObjectNeedUpdate = ({
  latestWeekNumber,
  currentWeekGames,
  userPicks,
  currentWeekPicks,
}: {
  latestWeekNumber: number;
  currentWeekGames: Game[];
  userPicks: Picks;
  currentWeekPicks: WeekPicks;
}) => {
  let previousWeekPicksPresent = true;

  for (let i = 2; i <= latestWeekNumber; i++) {
    if (!previousWeekPicksPresent) break;
    const weekId = getWeekId({ seasontype: 2, week: i, year: 2023 });
    const weekPicks = userPicks.find(({ id }) => id === weekId);

    if (!weekPicks) previousWeekPicksPresent = false;
  }

  const currentWeeksPicksUpToDate =
    currentWeekGames.filter(({ completed }) => completed).length ===
    currentWeekPicks?.games.filter(({ winner }) => winner).length;

  return !previousWeekPicksPresent || !currentWeeksPicksUpToDate;
};
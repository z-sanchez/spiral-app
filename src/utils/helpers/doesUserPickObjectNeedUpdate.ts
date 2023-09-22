import { Game } from "../../types/Game";
import { Picks } from "../../types/Picks";
import { getWeekId } from "./espn/getWeekId";

export const doesUserPickObjectNeedUpdate = ({
  latestWeekNumber,
  currentWeekGames,
  userPicks,
}: {
  latestWeekNumber: number;
  currentWeekGames: Game[];
  userPicks: Picks;
}) => {
  let previousWeekPicksFinished = true;

  const currentWeekPicks = userPicks.find(
    ({ id }) =>
      id === getWeekId({ seasontype: 2, week: latestWeekNumber, year: 2023 })
  );

  for (let i = 2; i <= latestWeekNumber; i++) {
    if (!previousWeekPicksFinished) break;
    const weekId = getWeekId({ seasontype: 2, week: i, year: 2023 });
    const weekPicks = userPicks.find(({ id }) => id === weekId);

    if (!weekPicks || (!weekPicks.completed && i !== latestWeekNumber))
      previousWeekPicksFinished = false;
  }

  const currentWeeksPicksUpToDate =
    currentWeekGames.filter(({ completed }) => completed).length ===
    currentWeekPicks?.games.filter(({ winner }) => winner !== "not completed")
      .length;

  return !previousWeekPicksFinished || !currentWeeksPicksUpToDate;
};

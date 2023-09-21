import { getWeekData } from "./getWeekData";

export const fetchWeekData = async (weekNumber: number) => {
  const resultData = await fetch(
    `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2023&seasontype=2&week=${weekNumber}`
  ).then((result) => result.json());

  return getWeekData(resultData.content.schedule);
};

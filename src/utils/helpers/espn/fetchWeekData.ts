import { GAME_SCHEDULE_QUERY } from "../../constants";
import { getWeekData } from "./getWeekData";
import scheduleData from "../../../mock/scheduleDataWK4NotStarted.json";

export const fetchCurrentWeekData = async () => {
  if (import.meta.env.VITE_USE_MOCK_DATA) return scheduleData;

  const result = await fetch(GAME_SCHEDULE_QUERY)
    .then((result) => result.json())
    .then((schedule) => schedule.content);

  return result;
};

export const fetchWeekData = async (weekNumber: number) => {
  if (import.meta.env.VITE_USE_MOCK_DATA)
    return getWeekData(scheduleData.schedule);

  const resultData = await fetch(
    `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2023&seasontype=2&week=${weekNumber}`
  ).then((result) => result.json());

  return getWeekData(resultData.content.schedule);
};

export const fetchCurrentWeekParams = async () => {
  if (import.meta.env.VITE_USE_MOCK_DATA) scheduleData.parameters;

  const resultData = await fetch(
    `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2023&seasontype=2`
  ).then((result) => result.json());

  return resultData.content.parameters;
};

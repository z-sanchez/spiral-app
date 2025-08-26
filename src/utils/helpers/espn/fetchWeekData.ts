import { ENV_VARIABLES } from "../../constants";
import { getWeekData } from "./getWeekData";
import scheduleData from "../../../mock/scheduleData.json";
import { EspnCurrentWeekParams } from "../../../types/EspnApi";

const BASE_ESPN_QUERY = `https://cdn.espn.com/core/nfl/schedule?xhr=1`;

const getEspnQuery = (params: EspnCurrentWeekParams) => {
  return `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=${params.year}&seasontype=${params.seasontype}&week=${params.week}`;
};

export const getCurrentWeekQuery = async () => {
  const currentWeekParams = await fetchCurrentWeekParams().then(
    (params: EspnCurrentWeekParams) => {
      return params;
    }
  );

  if (currentWeekParams.seasontype !== 2) {
    return getEspnQuery({ ...currentWeekParams, week: 1, seasontype: 2 });
  }

  return getEspnQuery(currentWeekParams);
};

export const fetchCurrentWeekData = async () => {
  if (ENV_VARIABLES.useMockData) return scheduleData;

  const result = await fetch(BASE_ESPN_QUERY)
    .then((result) => result.json())
    .then((schedule) => schedule.content);

  return result;
};

export const fetchWeekData = async (weekNumber: number) => {
  if (ENV_VARIABLES.useMockData) return getWeekData(scheduleData.schedule);

  const resultData = await fetch(
    `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=2024&seasontype=2&week=${weekNumber}`
  ).then((result) => result.json());

  return getWeekData(resultData.content.schedule);
};

export const fetchCurrentWeekParams = async () => {
  if (ENV_VARIABLES.useMockData) scheduleData.parameters;

  const resultData = await fetch(
    `https://cdn.espn.com/core/nfl/schedule?xhr=1`
  ).then((result) => result.json());

  return resultData.content.parameters;
};

import { EspnCurrentWeekParams } from "../../../types/EspnApi";

const BASE_ESPN_QUERY = `https://cdn.espn.com/core/nfl/schedule?xhr=1`;

const GAME_WEEK = import.meta.env.VITE_GAME_WEEK;
const GAME_YEAR = import.meta.env.VITE_GAME_YEAR;
const SEASON_TYPE = import.meta.env.VITE_SEASON_TYPE;

const getEspnQuery = (params: EspnCurrentWeekParams) => {
  return `https://cdn.espn.com/core/nfl/schedule?xhr=1&year=${params.year}&seasontype=${params.seasontype}&week=${params.week}`;
};

export const fetchCurrentWeekData = async () => {
  let espnQuery = BASE_ESPN_QUERY;

  if (GAME_WEEK && GAME_YEAR && SEASON_TYPE) {
    espnQuery = getEspnQuery({
      year: GAME_YEAR,
      seasontype: SEASON_TYPE,
      week: GAME_WEEK,
    });
  }

  const result = await fetch(espnQuery)
    .then((result) => result.json())
    .then((schedule) => schedule.content);

  return result;
};

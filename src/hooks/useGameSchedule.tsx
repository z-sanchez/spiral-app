import { useQuery } from "react-query";
import { getWeekData } from "../utils/helpers/espn/getWeekData";
import { getWeekId } from "../utils/helpers/espn/getWeekId";
import { fetchCurrentWeekData } from "../utils/helpers/espn/fetchWeekData";
import { sortScheduleIntoDays } from "../utils/helpers/sortScheduleIntoDays";
import { GAME_SCHEDULE_POLL_TIME } from "../utils/constants";

const useGameSchedule = () => {
  const { isLoading, data } = useQuery(
    "gameScheduleData",
    () => {
      return fetchCurrentWeekData();
    },
    { refetchInterval: GAME_SCHEDULE_POLL_TIME, refetchOnWindowFocus: false }
  );

  const weekDateParams = {
    week: data?.parameters?.week ?? 0,
    year: data?.parameters?.year ?? 0,
    seasonType: data?.parameters?.seasontype ?? 0,
  };

  const currentWeeksGames = data ? getWeekData(data.schedule) : [];

  const currentWeekId = getWeekId(weekDateParams);

  const currentWeekNumber = data ? weekDateParams.week : null;

  const currentYearNumber = data ? weekDateParams.year : null;

  const activeGames = currentWeeksGames.filter(({ completed }) => !completed);

  const gamesInProgress = activeGames.filter(
    ({ date }) => new Date(date) < new Date()
  );
  const gamesNotStarted = activeGames.filter(
    ({ date }) => new Date(date) > new Date()
  );
  const completedGames = currentWeeksGames.filter(({ completed }) => completed);

  const activeGameScheduleInDays = sortScheduleIntoDays(activeGames);

  return {
    isLoading,
    activeGameScheduleInDays,
    currentWeeksGames,
    currentWeekId,
    activeGames,
    completedGames,
    gamesInProgress,
    gamesNotStarted,
    currentWeekNumber,
    currentYearNumber,
  };
};

export { useGameSchedule };

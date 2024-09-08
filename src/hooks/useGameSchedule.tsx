import { useQuery } from "react-query";
import { getWeekData } from "../utils/helpers/espn/getWeekData";
import { getWeekId } from "../utils/helpers/espn/getWeekId";
import { fetchCurrentWeekData } from "../utils/helpers/espn/fetchWeekData";
import { sortScheduleIntoDays } from "../utils/helpers/sortScheduleIntoDays";

const useGameSchedule = () => {
  const { isLoading, data } = useQuery("gameScheduleData", () =>
    fetchCurrentWeekData()
  );

  const currentWeeksGames = !isLoading ? getWeekData(data?.schedule) : [];

  const currentWeekId = !isLoading ? getWeekId(data?.parameters) : "";

  const currentWeekNumber = !isLoading ? data?.parameters.week : 0;

  const currentYearNumber = !isLoading ? data?.parameters.year : 2024;

  const activeGames = currentWeeksGames.filter(({ completed }) => !completed);
  const gamesInProgress = activeGames.filter(
    ({ date }) => new Date(date) < new Date()
  );
  const gamesNotStarted = activeGames.filter(
    ({ date }) => new Date(date) > new Date()
  );
  const completedGames = currentWeeksGames.filter(({ completed }) => completed);

  const getCurrentScheduleData = () => {
    return data;
  };

  const activeGameScheduleInDays = !isLoading
    ? sortScheduleIntoDays(activeGames)
    : [];

  return {
    getCurrentScheduleData,
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

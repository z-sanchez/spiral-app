import { useQuery } from "react-query";
import { GAME_SCHEDULE_QUERY } from "../utils/constants";
import { getWeekData } from "../utils/helpers/espn/getWeekData";
import { getWeekId } from "../utils/helpers/espn/getWeekId";
import scheduleData from "../mock/scheduleData.json";

const useMockData = false; //import.meta.env.DEV;

const useGameSchedule = () => {
  const { isLoading, data } = useQuery("gameScheduleData", () =>
    useMockData
      ? JSON.parse(JSON.stringify(scheduleData)).content
      : fetch(GAME_SCHEDULE_QUERY)
          .then((result) => result.json())
          .then((scheduleData) => scheduleData.content)
  );

  const currentWeeksGames = !isLoading ? getWeekData(data?.schedule) : [];

  const currentWeekId = !isLoading ? getWeekId(data?.parameters) : "";

  const currentWeekNumber = !isLoading ? data?.parameters.week : 2;

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

  return {
    getCurrentScheduleData,
    currentWeeksGames,
    currentWeekId,
    activeGames,
    completedGames,
    gamesInProgress,
    gamesNotStarted,
    currentWeekNumber,
  };
};

export { useGameSchedule };

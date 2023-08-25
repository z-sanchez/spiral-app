import { useQuery } from "react-query";
import { GAME_SCHEDULE_QUERY } from "../utils/constants";
import { getWeekData } from "../utils/helpers/espn/getWeekData";

const useGameSchedule = () => {
  const { isLoading, data } = useQuery("gameScheduleData", () =>
    fetch(GAME_SCHEDULE_QUERY)
      .then((result) => result.json())
      .then((scheduleData) => scheduleData.content)
  );

  const currentWeeksGames = !isLoading ? getWeekData(data?.schedule) : [];

  const getCurrentScheduleData = () => {
    return data;
  };

  return {
    getCurrentScheduleData,
    currentWeeksGames,
  };
};

export { useGameSchedule };
import { useQuery } from "react-query";
// import { GAME_SCHEDULE_QUERY } from "../utils/constants";
import { getWeekData } from "../utils/helpers/espn/getWeekData";
import { getWeekId } from "../utils/helpers/espn/getWeekId";
import scheduleData from "../mock/scheduleData.json";

const useGameSchedule = () => {
  const { isLoading, data } = useQuery(
    "gameScheduleData",
    () => JSON.parse(JSON.stringify(scheduleData)).content
    // fetch(GAME_SCHEDULE_QUERY)
    //   .then((result) => result.json())
    //   .then((scheduleData) => scheduleData.content)
  );

  const currentWeeksGames = !isLoading ? getWeekData(data?.schedule) : [];

  const currentWeekId = !isLoading ? getWeekId(data?.parameters) : "";

  const getCurrentScheduleData = () => {
    return data;
  };

  return {
    getCurrentScheduleData,
    currentWeeksGames,
    currentWeekId,
  };
};

export { useGameSchedule };

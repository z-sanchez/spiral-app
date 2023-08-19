import { useQuery } from "react-query";
import { GAME_SCHEDULE_QUERY } from "../utils/constants";

const useGameSchedule = () => {
  const { data } = useQuery("gameScheduleData", () =>
    fetch(GAME_SCHEDULE_QUERY)
      .then((result) => result.json())
      .then((scheduleData) => scheduleData.content)
  );

  const getCurrentScheduleData = () => {
    return data;
  };

  return {
    getCurrentScheduleData,
  };
};

export { useGameSchedule };

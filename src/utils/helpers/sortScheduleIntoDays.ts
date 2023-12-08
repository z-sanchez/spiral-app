import { Game } from "../../types/Game";

export const sortScheduleIntoDays = (scheduleData: Game[]) => {
  const gamesArray: { games: Game[]; date: string }[] = [];
  const uniqueDates: string[] = [];

  scheduleData.forEach(({ date }) => {
    if (!uniqueDates.includes(date)) {
      uniqueDates.push(date);
    }
  });

  uniqueDates.forEach((uniqueDate) => {
    const gamesOnDate = scheduleData.filter(({ date }) => date === uniqueDate);

    gamesArray.push({ date: uniqueDate, games: gamesOnDate });
  });

  return gamesArray;
};

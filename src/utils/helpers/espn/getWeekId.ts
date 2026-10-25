export const getWeekId = ({
  seasonType,
  week,
  year,
}: {
  seasonType: number;
  week: number;
  year: number;
}): string => {
  return `week-${week}-year-${year}-type-${seasonType}`;
};

export const getWeekDataFromWeekId = (weekId: string) => {
  const match = weekId.match(/week-(\d+)-year-(\d+)-type-(\d+)/);
  if (!match) {
    throw new Error(`Invalid weekId: ${weekId}`);
  }
  const [, week, year, seasonType] = match;
  return {
    week: parseInt(week, 10),
    year: parseInt(year, 10),
    seasonType: parseInt(seasonType, 10),
  };
};

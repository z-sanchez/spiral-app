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

export const getWeekId = ({
  seasontype,
  week,
  year,
}: {
  seasontype: number;
  week: number;
  year: number;
}): string => {
  return `week-${week}-year-${year}-type-${seasontype}`;
};

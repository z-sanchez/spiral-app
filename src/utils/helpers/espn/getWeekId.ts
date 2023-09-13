export const getWeekId = ({
  seasontype,
  week,
  year,
}: {
  seasontype: number;
  week: number;
  year: number;
}): string => {
  return `${seasontype}${week}${year}`;
};

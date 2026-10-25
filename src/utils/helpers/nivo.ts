import { League } from "../../types/Firebase";
import { getWeekDataFromWeekId } from "./espn/getWeekId";

export type BumpChartData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

// assign rank
const assignRank = (
  userWinCounts: Record<string, number>,
): { id: string; rank: number }[] => {
  // use the users amount of wins to determine rank
  return Object.entries(userWinCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id], index) => ({ id, rank: index + 1 }));
};

export const convertWeekStandingsToBumpChartData = (
  weekStandings: League["computedWeekStandings"],
  users: { id: string; name: string }[],
): BumpChartData => {
  const usersBaseWinCountMap = users.reduce(
    (acc, user) => {
      acc[user.id] = 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  const baseData: BumpChartData = users.map((user) => {
    const name = user.name;
    return {
      id: name,
      data: [],
    };
  });

  const weeksComputedSorted = Object.entries(weekStandings)
    .map(([week]) => {
      const weekData = getWeekDataFromWeekId(week);
      return { weekId: week, weekOrder: weekData.week };
    })
    .sort((a, b) => a.weekOrder - b.weekOrder);

  weeksComputedSorted.forEach(({ weekId, weekOrder }) => {
    const weekData = weekStandings[weekId];
    Object.values(weekData).forEach((user) => {
      usersBaseWinCountMap[user.id] += user.record.wins;
    });
    // find rank for users after map updated win counts
    const ranks = assignRank(usersBaseWinCountMap);
    // update baseData with the new ranks
    baseData.forEach((userData) => {
      const userRank =
        ranks.find(
          (r) => r.id === users.find((u) => u.name === userData.id)?.id,
        )?.rank || 0;
      userData.data.push({ x: String(weekOrder), y: userRank });
    });
  });

  return baseData;
};

export const convertWeekStandingsToBumpChartDataOld = (
  weekStandings: League["computedWeekStandings"],
  users: { id: string; name: string }[],
): BumpChartData => {
  console.log(users);
  const firstWeek = Object.values(weekStandings)[0];
  const userData = Object.values(firstWeek).map((user) => {
    const name = users.find((u) => u.id === user.id)?.name || "";
    return {
      id: name,
      data: Object.entries(weekStandings)
        .map(([week, users]) => {
          const foundUser = users.find((u) => u.id === user.id);
          const weekData = getWeekDataFromWeekId(week);
          return {
            x: String(weekData.week),
            y: foundUser ? foundUser.rank : 0,
          };
        })
        .sort((a, b) => Number(a.x) - Number(b.x)),
    };
  });

  return userData;
};

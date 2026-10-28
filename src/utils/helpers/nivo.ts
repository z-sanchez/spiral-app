import { League } from "../../types/Firebase";
import { getWeekDataFromWeekId } from "./espn/getWeekId";
import { Record as UserRecord } from "../../types/Record";

export type BumpChartData = {
  id: string;
  data: {
    x: string;
    y: number;
    record: UserRecord;
  }[];
}[];

// assign rank
const assignRank = (
  userWinCounts: Record<string, number>,
): { id: string; rank: number }[] => {
  // use the users amount of wins to determine rank, ties should have the same rank
  const uniqueWins = Array.from(new Set(Object.values(userWinCounts))).sort(
    (a, b) => b - a,
  );

  // use the uniqueWins array to assign ranks can have several users with the same rank
  return Object.entries(userWinCounts).map(([id, wins]) => {
    const rank = uniqueWins.indexOf(wins) + 1;
    return { id, rank };
  });
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

      const userRecord = weekData.find(
        (u) => u.id === users.find((u) => u.name === userData.id)?.id,
      )?.record || { wins: 0, losses: 0, ties: 0 };

      userData.data.push({
        x: String(weekOrder),
        y: userRank,
        record: userRecord,
      });
    });
  });

  return baseData;
};

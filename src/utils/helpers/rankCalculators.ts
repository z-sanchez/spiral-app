import { UserPicksObject } from "../../types/Firebase";
import { RankingNotifications } from "../../types/RankingNotifications";

export const getAllTimeGroupScores = (groupPicks: UserPicksObject[]) => {
  return structuredClone(groupPicks).map(({ record }) => record.wins);
};

export const getWeekGroupScores = (
  groupPicks: UserPicksObject[],
  weekId: string
) => {
  return structuredClone(groupPicks).map(({ picks }) => {
    return picks.find(({ id }) => id === weekId)?.record.wins as number;
  });
};

export const sortGroupScores = (groupScores: number[]): number[] => {
  return groupScores
    .filter((score, index) => groupScores.indexOf(score) === index)
    .sort((a, b) => b - a);
};

export const calculateUserAllTimeRank = (
  groupPicks: UserPicksObject[],
  userWins: number
): number => {
  const allTimeGroupScores = getAllTimeGroupScores(groupPicks);

  const scoresOrdered = sortGroupScores(allTimeGroupScores);

  return scoresOrdered.findIndex((score) => score === userWins) + 1;
};

export const calculateUserWeekRank = (
  groupPicks: UserPicksObject[],
  userWins: number,
  weekId: string
): number => {
  const weekGroupScores = getWeekGroupScores(groupPicks, weekId);

  const scoresOrdered = sortGroupScores(weekGroupScores);

  return scoresOrdered.findIndex((score) => score === userWins) + 1;
};

export const getRankingNotificationData = (
  previousWeekId: string,
  currentWeekId: string,
  userId: string,
  groupPicks: UserPicksObject[]
): RankingNotifications => {
  const userPicksObject = groupPicks.find(({ id }) => userId === id);
  const allTimeWins = userPicksObject?.record.wins as number;

  const currentWeekWins = userPicksObject?.picks.find(
    ({ id }) => id === currentWeekId
  )?.record.wins as number;
  const previousWeekWins = userPicksObject?.picks.find(
    ({ id }) => id === previousWeekId
  )?.record.wins as number;

  const currentWeekRank = calculateUserWeekRank(
    groupPicks,
    currentWeekWins,
    currentWeekId
  );
  const previousWeekRank = calculateUserWeekRank(
    groupPicks,
    previousWeekWins,
    previousWeekId
  );

  const allTimeRank = calculateUserAllTimeRank(groupPicks, allTimeWins);

  return {
    weekRankIncreased:
      previousWeekRank !== 0 ? currentWeekRank < previousWeekRank : false,
    weekRankDecreased:
      previousWeekRank !== 0 ? currentWeekRank > previousWeekRank : false,
    isHotWeekStreak:
      previousWeekRank !== 0
        ? currentWeekRank === 1 &&
          previousWeekRank === 1 &&
          currentWeekWins !== 0
        : false,
    silverMedal: allTimeRank === 2,
    bronzeMedal: allTimeRank === 3,
    trophy: previousWeekRank === 1,
  };
};

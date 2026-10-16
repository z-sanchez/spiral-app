import { EmblemProfile, EmblemType } from "../types/Emblems";
import { League } from "../types/Firebase";
import { useMemo } from "react";
import { getWeekId } from "../utils/helpers/espn/getWeekId";

const getAllTimeFirstPlaceAssignments = (
  allTimeStandings: League["allTimeStandings"],
): string[] => {
  const allTimeFirstPlaceAssignments: string[] = [];
  allTimeStandings.forEach((user) => {
    if (user.rank === 1) {
      allTimeFirstPlaceAssignments.push(user.id);
    }
  });
  return allTimeFirstPlaceAssignments;
};

const getAllTimeSecondPlaceAssignments = (
  allTimeStandings: League["allTimeStandings"],
): string[] => {
  const allTimeSecondPlaceAssignments: string[] = [];
  allTimeStandings.forEach((user) => {
    if (user.rank === 2) {
      allTimeSecondPlaceAssignments.push(user.id);
    }
  });
  return allTimeSecondPlaceAssignments;
};

const getAllTimeThirdPlaceAssignments = (
  allTimeStandings: League["allTimeStandings"],
): string[] => {
  const allTimeThirdPlaceAssignments: string[] = [];
  allTimeStandings.forEach((user) => {
    if (user.rank === 3) {
      allTimeThirdPlaceAssignments.push(user.id);
    }
  });
  return allTimeThirdPlaceAssignments;
};

const getAllTimeLastPlaceAssignments = (
  allTimeStandings: League["allTimeStandings"],
): string[] => {
  const allTimeLastPlaceAssignments: string[] = [];
  allTimeStandings.forEach((user) => {
    if (user.rank === allTimeStandings.length) {
      allTimeLastPlaceAssignments.push(user.id);
    }
  });
  return allTimeLastPlaceAssignments;
};

export const getFirstPlaceBackToBackAssignments = (
  computedStandings: League["computedWeekStandings"],
  week: number,
  year: number,
  seasonType: number,
): string[] => {
  if (week <= 2) return [];

  const previousWeekId = getWeekId({ week: week - 1, year, seasonType });
  const secondToLastWeekId = getWeekId({ week: week - 2, year, seasonType });

  const previousWeek = computedStandings[previousWeekId];
  const secondToLastWeek = computedStandings[secondToLastWeekId];

  if (!previousWeek || !secondToLastWeek) return [];

  return previousWeek
    .filter((user) => user.rank === 1)
    .map((user) => user.id)
    .filter((id) =>
      secondToLastWeek.some((user) => user.rank === 1 && user.id === id),
    );
};

const calculateEmblems = (
  baseUserEmblemProfile: EmblemProfile[],
  allTimeStandings: League["allTimeStandings"],
  computedWeekStandings: League["computedWeekStandings"],
  week: number,
  year: number,
  seasonType: number,
): EmblemProfile[] => {
  // userIds of all time first place leaders
  const allTimeFirstPlaceAssignments =
    getAllTimeFirstPlaceAssignments(allTimeStandings);
  const firstPlaceBackToBackAssignments = getFirstPlaceBackToBackAssignments(
    computedWeekStandings,
    week,
    year,
    seasonType,
  );

  return baseUserEmblemProfile.map((profile) => ({
    ...profile,
    emblems: [
      ...profile.emblems,
      ...(allTimeFirstPlaceAssignments.includes(profile.userId)
        ? (["allTimeLeader"] as EmblemType[])
        : []),
      ...(firstPlaceBackToBackAssignments.includes(profile.userId)
        ? (["onFire"] as EmblemType[])
        : []),
      ...(getAllTimeSecondPlaceAssignments(allTimeStandings).includes(
        profile.userId,
      )
        ? (["allTimeSecondPlace"] as EmblemType[])
        : []),
      ...(getAllTimeThirdPlaceAssignments(allTimeStandings).includes(
        profile.userId,
      )
        ? (["allTimeThirdPlace"] as EmblemType[])
        : []),
      ...(getAllTimeLastPlaceAssignments(allTimeStandings).includes(
        profile.userId,
      )
        ? (["allTimeLastPlace"] as EmblemType[])
        : []),
    ],
  }));
};

export const calculateWeekToWeekProgress = (
  computedStandings: League["computedWeekStandings"],
  week: number,
  year: number,
  seasonType: number,
): { userId: string; progress: "progressed" | "regressed" | "none" }[] => {
  const previousWeekId = getWeekId({ week: week - 1, year, seasonType });
  const currentWeekId = getWeekId({ week: week, year, seasonType });

  const previousWeek = computedStandings[previousWeekId];
  const currentWeek = computedStandings[currentWeekId];

  if (!previousWeek || !currentWeek) return [];
  return previousWeek.map((user) => {
    const previousRank = user.rank;
    const currentRank = currentWeek.find((u) => u.id === user.id)?.rank;

    let progress: "progressed" | "regressed" | "none" = "none";
    if (currentRank !== undefined) {
      if (previousRank > currentRank) {
        progress = "progressed";
      } else if (previousRank < currentRank) {
        progress = "regressed";
      }
    }

    return {
      userId: user.id,
      progress,
    };
  });
};

export const useStandings = ({
  weekStandings,
  allTimeStandings,
  computedStandings,
  week,
  year,
  seasonType,
}: {
  weekStandings: League["currentWeekStandings"];
  allTimeStandings: League["allTimeStandings"];
  computedStandings: League["computedWeekStandings"];
  week: number;
  year: number;
  seasonType: number;
}) => {
  const baseUserEmblemProfile = useMemo(() => {
    const allUsers = [...allTimeStandings];
    return allUsers.reduce((acc, user) => {
      acc.push({
        userId: user.id,
        emblems: [],
      });
      return acc;
    }, [] as EmblemProfile[]);
  }, [allTimeStandings]);

  const calculatedEmblems: EmblemProfile[] = calculateEmblems(
    baseUserEmblemProfile,
    allTimeStandings,
    computedStandings,
    week,
    year,
    seasonType,
  );

  const calculatedWeekProgress = calculateWeekToWeekProgress(
    computedStandings,
    week,
    year,
    seasonType,
  );

  return {
    weekStandings,
    allTimeStandings,
    computedStandings,
    baseUserEmblemProfile,
    calculatedEmblems,
    calculatedWeekProgress,
  };
};

import { UserPicksObject } from "../../../types/Firebase";
import { WeekPicks } from "../../../types/Picks";
import { User } from "../../../types/Firebase";

export const createUserPickObjectUser = ({
  id,
  username,
}: User): UserPicksObject => {
  return {
    id,
    username,
    picks: new Map(),
  };
};

export const createEmptyWeekPickObject = ({
  weekId,
}: {
  weekId: string;
}): WeekPicks => {
  return {
    id: weekId,
    games: [],
    status: "NOT_STARTED",
  };
};

import { UserPicksObject } from "../../../types/Firebase";
import { Game } from "../../../types/Game";
import { WeekPicks } from "../../../types/Picks";
import { User } from "../../../types/User";
import { NO_PICK } from "../../constants";
import { fetchWeekData } from "../espn/fetchWeekData";
import { getWeekId } from "../espn/getWeekId";
import { getAllTimeRecord } from "../picksCalculator";
import { updateAndRecordWeekScoresOnPickObject } from "../updatePicks";

export const createUserPickObjectUser = ({
  id,
  username,
}: User): UserPicksObject => {
  return {
    id,
    username,
    record: { wins: 0, loses: 0, ties: 0 },
    roi: 0,
    picks: [],
  };
};

export const createEmptyWeekPickObject = ({
  weekId,
  weekGames,
}: {
  weekId: string;
  weekGames: Game[];
}): WeekPicks => {
  return {
    id: weekId,
    record: {
      loses: 0,
      wins: 0,
      ties: 0,
    },
    games: weekGames.map((game) => {
      return {
        id: game.id,
        winner: "not completed",
        pick: NO_PICK,
      };
    }),
    completed: false,
  };
};

export const updateUserPickObjectForFirebase = async (
  userPickObject: UserPicksObject,
  latestWeekNumber: number,
  latestYearNumber: number
): Promise<UserPicksObject> => {
  let updatedPicks = structuredClone(userPickObject.picks);

  for (let i = 1; i <= latestWeekNumber; i++) {
    const weekId = getWeekId({
      seasontype: 2,
      week: i,
      year: latestYearNumber,
    });

    const hasWeekPicksFinished = updatedPicks.find(
      (weekPick) =>
        weekPick.id === weekId &&
        weekPick.games.every(({ winner }) => winner !== "not completed")
    );

    if (!hasWeekPicksFinished) {
      const weekGames = await fetchWeekData(i);
      updatedPicks = updateAndRecordWeekScoresOnPickObject({
        pickObject: updatedPicks,
        weekGames,
        weekId,
      });
    }
  }

  return {
    ...userPickObject,
    picks: updatedPicks,
    record: getAllTimeRecord(updatedPicks, latestYearNumber),
  };
};

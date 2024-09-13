import { Picks, WeekPicks } from "../../types/Picks";
import { Record } from "../../types/Record";
import { NO_PICK } from "../constants";

export const getUserWeekRecord = (weekPicks: WeekPicks): Record => {
  const weekRecord = {
    wins: 0,
    loses: 0,
    ties: 0,
  };

  weekPicks.games.forEach((game) => {
    if (game.winner !== "not completed") {
      if (game.pick === NO_PICK || game.pick !== game.winner)
        ++weekRecord.loses;
      else if (game.pick === game.winner) ++weekRecord.wins;
      else if (game.winner === "TIE") ++weekRecord.ties;
    }
  });

  return weekRecord;
};

export const getAllTimeRecord = (
  picks: Picks,
  latestYearNumber: number
): Record => {
  return picks.reduce(
    (record, week) => {
      const year = Number(week.id.slice(-4));
      if (year !== latestYearNumber) {
        return record;
      }
      return {
        wins: record.wins + week.record.wins,
        loses: record.loses + week.record.loses,
        ties: record.ties + week.record.ties,
      };
    },
    { wins: 0, loses: 0, ties: 0 }
  );
};

import { SeasonPicks } from "../../types/Picks";

export const updatePicks = ({
  picks,
  weekId,
  gameId,
  pick,
}: {
  picks: SeasonPicks;
  weekId: string;
  gameId: string;
  pick: string;
}): SeasonPicks => {
  const newPicks = structuredClone(picks);

  if (!newPicks.picks[weekId]) {
    newPicks.picks[weekId] = {};
  }

  newPicks.picks[weekId][gameId] = pick;

  return newPicks;
};

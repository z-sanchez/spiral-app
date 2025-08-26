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

  newPicks.picks[weekId][gameId] = pick;

  return newPicks;
};

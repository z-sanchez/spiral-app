import { SeasonPicks } from "../../../types/Picks";
import { User } from "../../../types/Firebase";

export const createDefaultPicksObject = ({
  id,
  username,
}: User): SeasonPicks => {
  return {
    id,
    username,
    picks: {},
  };
};

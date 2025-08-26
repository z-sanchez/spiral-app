import { SeasonPicks } from "../../../types/Picks";
import { User } from "../../../types/Firebase";

export const createUserPickObjectUser = ({
  id,
  username,
}: User): SeasonPicks => {
  return {
    id,
    username,
    picks: {},
  };
};

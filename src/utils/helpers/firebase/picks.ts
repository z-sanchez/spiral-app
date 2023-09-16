import { UserPicksObject } from "../../../types/Firebase";
import { User } from "../../../types/User";

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

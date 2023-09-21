import { atom } from "recoil";

import { UserPicksObject } from "../types/Firebase";

const defaultUserPicksState: UserPicksObject & {
  groupPicks: UserPicksObject[];
} = {
  picks: [],
  record: { wins: 0, loses: 0, ties: 0 },
  id: "",
  username: "",
  roi: 0,
  groupPicks: [],
};

export const userPicksState = atom({
  key: "userPicksState",
  default: defaultUserPicksState,
});

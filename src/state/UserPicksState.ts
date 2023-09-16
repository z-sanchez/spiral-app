import { atom } from "recoil";
import { Picks } from "../types/Picks";
import { Record } from "../types/Record";

const defaultUserPicksState: {
  picks: Picks;
  allTimeRecord: Record;
  roi: number;
} = {
  picks: [],
  allTimeRecord: { wins: 0, loses: 0, ties: 0 },
  roi: 0,
};

export const userPicksState = atom({
  key: "userPicksState",
  default: defaultUserPicksState,
});

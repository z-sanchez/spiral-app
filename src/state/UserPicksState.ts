import { atom } from "recoil";
import { Picks } from "../types/Picks";

const defaultUserPicksState: {
  picks: Picks;
} = {
  picks: [],
};

export const userPicksState = atom({
  key: "userPicksState",
  default: defaultUserPicksState,
});

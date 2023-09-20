import { Record } from "./Record";

export type Picks = WeekPicks[];

export type WeekPicks = {
  id: string;
  games: PickGame[];
  record: Record;
};

type PickGame = {
  id: string;
  pick: string;
  winner: string;
};

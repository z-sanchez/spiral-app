import { Record } from "./Record";

export type Picks = WeekPicks[];

export type WeekPicks = {
  id: string;
  games: PickGame[];
  record: Record;
  completed: boolean;
};

type PickGame = {
  id: string;
  pick: string;
  winner: string;
};
